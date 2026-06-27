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
    formId: '1FAIpQLSd8ldWqJ3TWgVsw4yvego1T1_FSrWcEGuTMll_qUjDN_Z_Y0g',
    entries: {
      name: 'entry.136832847',
      phone: 'entry.338783156',
      address: 'entry.1818185010',
      city: 'entry.1926930666',
      products: 'entry.1032204383',
      landCents: 'entry.1540200311',
      crops: 'entry.1182763448',
    },
  },
  buyer: {
    formId: '1FAIpQLScRgt-8xdtDUY9zET5XVeIw1Y76j-2HJ6p9_Aw4om66qlYgYQ',
    entries: {
      name: 'entry.210713356',
      address: 'entry.496588672',
      phone: 'entry.125984025',
      email: 'entry.506085501',
      products: 'entry.822988067',
      minQty: 'entry.1604935352',
    },
  },
  contact: {
    formId: '1FAIpQLSczaGXyjHEYMd4khl1x6xzBj2bs1UtXtGKKKehPwHf2U0uIjw',
    entries: {
      name: 'entry.1825031473',
      phone: 'entry.916747599',
      queries: 'entry.1282967673',
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
