import './globals.css';
import Navbar from '@/components/Navbar';
import ContactWidget from '@/components/ContactWidget';

export const metadata = {
  title: 'Hey Frank-O | Events, Rentals & Services',
  description:
    'Expert equipment rentals, DJ services, A/V & lighting, audio engineering, and beauty services for events of all sizes. Charlotte, NC.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <ContactWidget />
      </body>
    </html>
  );
}
