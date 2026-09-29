'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check } from 'lucide-react';

export default function CopyBtn({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      return;
    }

    setCopied(true);

    // reset after 2s
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      onClick={!copied ? handleCopy : () => {}}
      aria-label={copied ? 'Copied!' : 'Copy email address'}
      whileTap={{ scale: 0.85 }}
      animate={{
        scale: copied ? [1, 1.2, 1] : 1, // bounce
      }}
      transition={{ duration: 0.3 }}
      className="relative flex h-7 w-7 items-center justify-center rounded-lg
        text-neutral-400 hover:bg-neutral-200 hover:text-neutral-700
        dark:hover:bg-neutral-800 dark:hover:text-neutral-300
        transition-colors">
      {/* Glow on success */}
      {copied && (
        <motion.span
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 rounded-lg bg-emerald-400/40"
        />
      )}

      {/* Icon switch */}
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}>
            <Check className="h-3.5 w-3.5 text-emerald-500" />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}>
            <Copy className="h-3.5 w-3.5" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
