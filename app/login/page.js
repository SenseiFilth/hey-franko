'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const [mode, setMode] = useState('signup'); // 'signup' | 'login'

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Image
              src="/logo/hey-franko-logo.png"
              alt="Hey Frank-O"
              width={140}
              height={60}
              className="object-contain"
            />
          </Link>
        </div>

        <div className="bg-brand-card border border-white/5 rounded-2xl p-8">
          {/* Toggle */}
          <div className="flex bg-[#1a1a1a] rounded-xl p-1 mb-8">
            {['signup', 'login'].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
                  mode === m
                    ? 'bg-brand-green text-black'
                    : 'text-white/40 hover:text-white'
                }`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {m === 'signup' ? 'Sign Up' : 'Log In'}
              </button>
            ))}
          </div>

          <h2 className="text-white font-black uppercase text-2xl mb-6 text-center"
            style={{ fontFamily: 'var(--font-display)' }}>
            {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
          </h2>

          {/* OAuth Buttons */}
          <div className="flex flex-col gap-3 mb-6">
            <button className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors text-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {mode === 'signup' ? 'Sign up' : 'Continue'} with Google
            </button>

            <button className="w-full flex items-center justify-center gap-3 bg-[#1877F2] text-white font-semibold py-3 rounded-lg hover:bg-[#166fe5] transition-colors text-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              {mode === 'signup' ? 'Sign up' : 'Continue'} with Facebook
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Email form */}
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            {mode === 'signup' && (
              <input type="text" placeholder="Full Name" className="form-input" required />
            )}
            <input type="email" placeholder="Email address" className="form-input" required />
            <input type="password" placeholder="Password" className="form-input" required />
            <button type="submit" className="btn-primary w-full mt-2">
              {mode === 'signup' ? 'Sign up with Email' : 'Log In'}
            </button>
          </form>

          <p className="text-center text-white/30 text-xs mt-6">
            {mode === 'signup' ? 'Already a member? ' : 'New here? '}
            <button
              onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
              className="text-brand-green hover:text-white transition-colors"
            >
              {mode === 'signup' ? 'Log In' : 'Sign Up'}
            </button>
          </p>
        </div>

        <p className="text-center mt-6">
          <Link href="/" className="text-white/30 text-xs hover:text-brand-green transition-colors">
            ← Back to Hey Frank-O
          </Link>
        </p>
      </div>
    </div>
  );
}
