import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { ThemeRippleProvider } from '@/components/ThemeRippleProvider';
import Navbar from '@/components/navbar/Navbar';
import SmoothScroll from '@/components/SmoothScroll';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: '%s | Louis Chan',
  },
  description: siteConfig.description,
  keywords: [
    'Louis Chan',
    'Full Stack Developer',
    'Software Engineer',
    'Next.js',
    'React',
    'TypeScript',
    'AI Engineering',
  ],
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
        width: 500,
        height: 300,
        alt: 'Louis Chan portfolio logo',
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
          </ThemeRippleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
