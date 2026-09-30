import { siteConfig } from '@/lib/site';

export const runtime = 'nodejs';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function resendErrorResponse(status: number) {
  if (status === 401 || status === 403 || status === 422) {
    return Response.json({ error: 'Contact form is temporarily unavailable. Please email me directly.' }, { status: 503 });
  }

  if (status === 429) {
    return Response.json({ error: 'Too many messages right now. Please try again later.' }, { status: 429 });
  }

  return Response.json({ error: 'Message could not be sent. Please try again later.' }, { status: 502 });
}

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
      // The response body may contain account information, so log only the status.
      console.error('Resend rejected a contact message', { status: result.status });
      return resendErrorResponse(result.status);
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Contact message delivery failed', error);
    return Response.json({ error: 'Message could not be sent. Please try again later.' }, { status: 502 });
  }
}
