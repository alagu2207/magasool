export type FieldType = 'text' | 'phone' | 'email' | 'number' | 'multiline';

export type Field = {
  key: string;
  label: string;
  placeholder: string;
  type: FieldType;
  required?: boolean;
};

export type FormType = 'farmer' | 'buyer';

export const FARMER_FIELDS: Field[] = [
  { key: 'name', label: 'Name', placeholder: 'Your full name', type: 'text', required: true },
  { key: 'phone', label: 'Phone Number', placeholder: 'e.g. 98765 43210', type: 'phone', required: true },
  { key: 'address', label: 'Address', placeholder: 'Door no, street, village', type: 'multiline', required: true },
  { key: 'city', label: 'City', placeholder: 'City / town', type: 'text', required: true },
  { key: 'products', label: 'Products you sell', placeholder: 'e.g. Banana, Onion, Tomato', type: 'text', required: true },
  { key: 'landCents', label: 'Farming land (in cents)', placeholder: 'e.g. 150', type: 'number', required: true },
  { key: 'crops', label: 'What you grow on your land', placeholder: 'Crops grown across the year', type: 'multiline', required: true },
];

export const BUYER_FIELDS: Field[] = [
  { key: 'name', label: 'Name', placeholder: 'Your full name', type: 'text', required: true },
  { key: 'address', label: 'Address', placeholder: 'Door no, street, area', type: 'multiline', required: true },
  { key: 'phone', label: 'Phone Number', placeholder: 'e.g. 98765 43210', type: 'phone', required: true },
  { key: 'email', label: 'Email ID', placeholder: 'you@example.com', type: 'email', required: true },
  { key: 'products', label: 'Products needed', placeholder: 'e.g. Banana, Mango', type: 'text', required: true },
  { key: 'minQty', label: 'Minimum quantity needed', placeholder: 'e.g. 500 kg / 2 ton', type: 'text', required: true },
];

export const FORM_META: Record<FormType, { title: string; subtitle: string; fields: Field[]; submitLabel: string }> = {
  farmer: {
    title: "I'm a Farmer",
    subtitle: 'Tell us about your produce — our team will connect with you.',
    fields: FARMER_FIELDS,
    submitLabel: 'Submit as Farmer',
  },
  buyer: {
    title: "I'm a Buyer",
    subtitle: 'Tell us what you need — we will source it at the best price.',
    fields: BUYER_FIELDS,
    submitLabel: 'Submit as Buyer',
  },
};
