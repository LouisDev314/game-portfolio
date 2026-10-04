import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { ThemeRippleProvider } from '@/components/ThemeRippleProvider';
import Navbar from '@/components/navbar/Navbar';
import SmoothScroll from '@/components/SmoothScroll';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { siteConfig } from '@/lib/site';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: '%s | Louis Chan',
  },
  description: siteConfig.description,
  keywords: ['Louis Chan', 'Game Designer', 'Game Design', 'Unreal Engine', 'Unity'],
  authors: [{ name: 'Louis Chan' }],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Louis Chan — Game Designer. Original atmospheric architectural artwork.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SmoothScroll />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ThemeRippleProvider>
            <Navbar />
            {children}
            <Analytics />
            <SpeedInsights />
            <Toaster
              position="top-center"
              theme="system"
              toastOptions={{
                classNames: {
                  toast: 'portfolio-toast',
                  error: 'portfolio-toast-error',
                  success: 'portfolio-toast-success',
                  actionButton: 'portfolio-toast-action',
                },
              }}
            />
          </ThemeRippleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
