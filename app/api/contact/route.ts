import { siteConfig } from '@/lib/site';

export const runtime = 'nodejs';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let input: unknown;

  try {
    input = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (!input || typeof input !== 'object') {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const fields = input as Record<string, unknown>;
  const name = typeof fields.name === 'string' ? fields.name.trim() : '';
  const email = typeof fields.email === 'string' ? fields.email.trim() : '';
  const message = typeof fields.message === 'string' ? fields.message.trim() : '';

  if (!name || name.length > 120 || !emailPattern.test(email) || email.length > 254 || !message || message.length > 10000) {
    return Response.json({ error: 'Please check the contact form fields.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !fromEmail || !emailPattern.test(fromEmail)) {
    return Response.json({ error: 'Contact form is not configured.' }, { status: 503 });
  }

  try {
    const result = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Louis Chan Portfolio <${fromEmail}>`,
        to: [siteConfig.email],
        reply_to: email,
        subject: `Portfolio message from ${name.replace(/[\r\n]/g, ' ')}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });

    if (!result.ok) {
      return Response.json({ error: 'Message could not be sent. Please try again later.' }, { status: 502 });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Message could not be sent. Please try again later.' }, { status: 502 });
  }
}
