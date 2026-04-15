-- ============================================================
-- Hey Frank-O — Supabase Database Schema + RLS Policies
-- ============================================================
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- Supabase uses PostgreSQL 15 — all standard PG syntax works.
--
-- Tables:
--   profiles          — user accounts (linked to Supabase auth.users)
--   quote_requests    — quote form submissions
--   consultations     — site visit / consultation requests
--   email_subscribers — newsletter opt-ins with consent audit trail
--   bookings          — confirmed bookings (future Bookable sync)
-- ============================================================


-- ── Enable UUID extension (already enabled by default in Supabase) ────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ════════════════════════════════════════════════════════════
-- 1. PROFILES
--    Auto-created for every new auth.users row via trigger.
--    Stores public-facing display info. PII is minimal.
-- ════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name  TEXT,
  email         TEXT,                        -- cached from auth.users for easy queries
  avatar_url    TEXT,
  role          TEXT NOT NULL DEFAULT 'customer'
                  CHECK (role IN ('customer', 'admin', 'staff')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.email
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- ════════════════════════════════════════════════════════════
-- 2. QUOTE REQUESTS
-- ════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.quote_requests (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID REFERENCES public.profiles(id) ON DELETE SET NULL,  -- null = guest
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  email         TEXT,
  phone         TEXT NOT NULL,
  location      TEXT NOT NULL,
  event_type    TEXT,
  event_date    DATE,
  start_time    TIME,
  end_time      TIME,
  services      TEXT[] DEFAULT '{}',            -- validated array of service names
  budget        TEXT,
  message       TEXT,
  status        TEXT NOT NULL DEFAULT 'new'
                  CHECK (status IN ('new', 'reviewed', 'quoted', 'closed')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS quote_requests_status_idx ON public.quote_requests(status);
CREATE INDEX IF NOT EXISTS quote_requests_created_idx ON public.quote_requests(created_at DESC);


-- ════════════════════════════════════════════════════════════
-- 3. CONSULTATION REQUESTS
-- ════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.consultations (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  full_name       TEXT NOT NULL,
  org_name        TEXT NOT NULL,
  email           TEXT,
  phone           TEXT NOT NULL,
  location        TEXT NOT NULL,
  services        TEXT[] DEFAULT '{}',
  owns_system     TEXT CHECK (owns_system IN ('yes', 'no', 'na')),
  preferred_slots JSONB DEFAULT '[]',          -- array of {date, startTime, endTime}
  budget          TEXT,
  description     TEXT,
  status          TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ════════════════════════════════════════════════════════════
-- 4. EMAIL SUBSCRIBERS
--    Stores opt-in consent with full audit trail for GDPR.
-- ════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.email_subscribers (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email               TEXT NOT NULL UNIQUE,
  consent             BOOLEAN NOT NULL DEFAULT FALSE,
  consent_timestamp   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  source              TEXT DEFAULT 'website_footer',
  ip_hash             TEXT,                    -- SHA-256 of IP, NOT raw IP (GDPR)
  unsubscribed_at     TIMESTAMPTZ,            -- NULL = still subscribed
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS email_subscribers_email_idx ON public.email_subscribers(email);


-- ════════════════════════════════════════════════════════════
-- 5. BOOKINGS (future Bookable sync)
--    Placeholder table for when you sync Bookable data here.
-- ════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.bookings (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  bookable_id       TEXT UNIQUE,              -- external ID from Bookable
  service_type      TEXT NOT NULL,
  status            TEXT NOT NULL DEFAULT 'pending'
                      CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  scheduled_at      TIMESTAMPTZ,
  location          TEXT,
  amount_cents      INTEGER,                  -- store in cents, never floats
  currency          TEXT DEFAULT 'USD',
  notes             TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- ════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY POLICIES
-- Enable RLS on every table — default-deny.
-- ════════════════════════════════════════════════════════════

ALTER TABLE public.profiles          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings          ENABLE ROW LEVEL SECURITY;


-- ── profiles ─────────────────────────────────────────────────────────────
-- Users can read and update only their own profile.
-- Admins can read all profiles.

CREATE POLICY "users: read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "users: update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND role = 'customer'     -- users cannot self-promote to admin
  );

CREATE POLICY "admins: read all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );


-- ── quote_requests ────────────────────────────────────────────────────────
-- Anyone (including anon) can INSERT (guest submissions).
-- Only admins/staff can SELECT or UPDATE.
-- Users can see their own linked submissions.

CREATE POLICY "anyone: submit quote"
  ON public.quote_requests FOR INSERT
  WITH CHECK (true);           -- API route validates + rate-limits before insert

CREATE POLICY "users: view own quotes"
  ON public.quote_requests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "staff: manage quotes"
  ON public.quote_requests FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('admin', 'staff')
    )
  );


-- ── consultations ─────────────────────────────────────────────────────────
CREATE POLICY "anyone: submit consultation"
  ON public.consultations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "users: view own consultations"
  ON public.consultations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "staff: manage consultations"
  ON public.consultations FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('admin', 'staff')
    )
  );


-- ── email_subscribers ─────────────────────────────────────────────────────
-- No direct client access — all writes go through the service-role API route.
-- Admins can read for marketing.

CREATE POLICY "admins: manage subscribers"
  ON public.email_subscribers FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );


-- ── bookings ──────────────────────────────────────────────────────────────
CREATE POLICY "users: view own bookings"
  ON public.bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "staff: manage bookings"
  ON public.bookings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('admin', 'staff')
    )
  );


-- ════════════════════════════════════════════════════════════
-- GDPR: User Deletion Function
-- Called when a user requests account deletion ("right to be forgotten").
-- Deletes PII while preserving anonymized booking records for accounting.
-- ════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION public.delete_user_data(target_user_id UUID)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  -- Verify caller is either the user themselves or an admin
  IF auth.uid() != target_user_id THEN
    IF NOT EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    ) THEN
      RAISE EXCEPTION 'Unauthorized';
    END IF;
  END IF;

  -- Anonymize (don't hard-delete bookings — needed for accounting records)
  UPDATE public.bookings
  SET user_id = NULL, notes = '[DELETED]'
  WHERE user_id = target_user_id;

  -- Hard delete submissions (no business need to retain)
  DELETE FROM public.quote_requests  WHERE user_id = target_user_id;
  DELETE FROM public.consultations   WHERE user_id = target_user_id;

  -- Remove from auth (cascades to profiles via ON DELETE CASCADE)
  DELETE FROM auth.users WHERE id = target_user_id;
END;
$$;
