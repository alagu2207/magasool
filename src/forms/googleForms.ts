/**
 * Google Forms integration — submissions are saved directly into your Google Form
 * (and its linked "Responses" Google Sheet). No backend/email required.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * HOW TO FILL THIS IN (one Form for Farmers, one for Buyers):
 *
 * 1. Create a Google Form. Add a question for each field below, in any order.
 *      Farmer: Name, Phone, Address, City, Products sold, Farming land (cents), What you grow
 *      Buyer : Name, Address, Phone, Email, Products needed, Minimum quantity
 *    In the Form's Settings, turn OFF "Collect email addresses" / "Limit to 1 response"
 *    and "Require sign in" so anyone can submit.
 *
 * 2. In the Form, click ⋮ (top-right) → "Get pre-filled link".
 *    Type a UNIQUE dummy value into each box (e.g. "NAME", "PHONE", "CITY"…),
 *    click "Get link" → "Copy link". It looks like:
 *      https://docs.google.com/forms/d/e/1FAIpQLSxxxx/viewform?usp=pp_url&entry.12345=NAME&entry.67890=PHONE...
 *
 * 3. From that link:
 *      • formId   = the "1FAIpQLSxxxx" part (between /d/e/ and /viewform)
 *      • each entry.NNNNN = a field id — match it to our key by the dummy value you typed.
 *
 *    …or just send the two pre-filled links to me and I'll fill this in for you.
 * ──────────────────────────────────────────────────────────────────────────
 */
import { FormType } from './fields';

export type GoogleFormConfig = {
  formId: string; // the "1FAIpQL..." id between /d/e/ and /formResponse
  entries: Record<string, string>; // our field key -> "entry.NNNNN"
};

export const GOOGLE_FORMS: Record<FormType, GoogleFormConfig> = {
  farmer: {
    formId: '1FAIpQLSc_nLLmsfdLBTT8xW_gpFRqFALe0yHjmTLETivuPw2AlUU-6A',
    entries: {
      name: 'entry.1121097073',
      phone: 'entry.1935914499',
      address: 'entry.1232655838',
      city: 'entry.1807828819',
      products: 'entry.1428403698',
      landCents: 'entry.700531819',
      crops: 'entry.663087225',
    },
  },
  buyer: {
    formId: '',
    entries: {
      name: '',
      address: '',
      phone: '',
      email: '',
      products: '',
      minQty: '',
    },
  },
};

/** True once a form's id and every entry id has been filled in above. */
export function isFormConfigured(cfg: GoogleFormConfig): boolean {
  return Boolean(cfg.formId) && Object.values(cfg.entries).every(Boolean);
}

export function formResponseUrl(formId: string): string {
  return `https://docs.google.com/forms/d/e/${formId}/formResponse`;
}

/** Build the application/x-www-form-urlencoded body Google Forms expects. */
export function buildFormBody(cfg: GoogleFormConfig, values: Record<string, string>): URLSearchParams {
  const body = new URLSearchParams();
  for (const [key, entry] of Object.entries(cfg.entries)) {
    if (entry) body.append(entry, values[key] ?? '');
  }
  return body;
}
