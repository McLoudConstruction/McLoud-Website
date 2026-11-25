// Contact details the chat assistant gives out. Kept here, separate from
// lib/siteConfig.js, so turning the chat on does not change the phone number
// shown in the header, footer and structured data (that stays blank until
// PHONE is set in siteConfig). Change a value here and the chat uses it.

export const CHAT_PHONE = '(816) 434-0517';
export const CHAT_PHONE_HREF = 'tel:+18164340517';
export const CHAT_EMAIL = 'info@mcloudconstruction.com';

// The jobs platform that stores leads, bookings and chat transcripts.
export const JOBS_API_URL = process.env.JOBS_API_URL || 'https://jobs.mcloudconstruction.com';

// Used when the assistant cannot answer, so the visitor is never stuck.
export const CHAT_FALLBACK_REPLY = `I can't chat right now. Please call ${CHAT_PHONE}, email ${CHAT_EMAIL}, or request a free estimate at mcloudconstruction.com/consultation.`;

export const CHAT_NAME = 'Magic';

export const CHAT_GREETING =
  "Hi, I'm Magic, McLoud Construction's AI assistant, named after our unofficial foreman (a very good dog). Ask me about our work or book a free consultation.";

export const CHAT_STARTERS = [
  'What services do you offer?',
  'I want to book a free consultation',
  'Do you work with property managers?',
];
