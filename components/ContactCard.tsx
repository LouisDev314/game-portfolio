import RegularCard from '@/components/RegularCard';
import CopyBtn from '@/components/CopyBtn';
import SocialBtns from '@/components/SocialBtns';

const EMAIL = 'louiscch314@gmail.com';

export default function ContactCard({ className }: { className?: string }) {
  const content = (
    <div className={className}>
      <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-2">
        Let&apos;s connect and build
      </h2>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">to change the world.</p>
      {/* Divider */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 mb-4" />

      {/* Email row */}
      <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950 mb-6">
        <span className="flex-1 text-sm font-mono text-neutral-700 dark:text-neutral-300 select-all">{EMAIL}</span>
        <CopyBtn email={EMAIL} />
      </div>

      {/* Social links */}
      <SocialBtns />
    </div>
  );

  return <RegularCard content={content} className="p-6 mx-4" />;
}
