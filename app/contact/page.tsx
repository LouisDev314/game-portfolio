import ContactCard from '@/components/ContactCard';
import React from 'react';
import Footer from '@/components/Footer';
import PageHeaderTitle from '@/components/PageHeaderTitle';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <main className="mx-auto max-w-6xl px-6 pt-28 md:pb-16">
        <PageHeaderTitle title="Contact" />
        <ContactCard />
      </main>
      <Footer />
    </div>
  );
}
