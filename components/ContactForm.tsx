'use client';

import type { FormEvent } from 'react';

const fieldClassName =
  'w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-colors hover:border-neutral-400 focus-visible:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500/30 user-invalid:border-red-500 user-invalid:focus-visible:ring-red-500/30 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:hover:border-neutral-600';

export default function ContactForm({ email }: { email: string }) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const senderEmail = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    if (!name || !senderEmail || !message) {
      const emptyField = Array.from(event.currentTarget.elements).find(
        (element): element is HTMLInputElement | HTMLTextAreaElement =>
          (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) && !element.value.trim(),
      );
      emptyField?.setCustomValidity('Please fill out this field.');
      emptyField?.reportValidity();
      return;
    }

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${senderEmail}\n\n${message}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Contact form">
      <div>
        <label
          htmlFor="contact-name"
          className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          onInput={(event) => event.currentTarget.setCustomValidity('')}
          className={fieldClassName}
        />
      </div>
      <div>
        <label
          htmlFor="contact-email"
          className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          onInput={(event) => event.currentTarget.setCustomValidity('')}
          className={fieldClassName}
        />
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          onInput={(event) => event.currentTarget.setCustomValidity('')}
          className={`${fieldClassName} resize-y`}
        />
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <button
          type="submit"
          className="rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300 dark:focus-visible:ring-offset-neutral-900">
          Send Message
        </button>
      </div>
    </form>
  );
}
