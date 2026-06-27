import React, { createContext, useCallback, useContext, useState } from 'react';
import { FormModal } from './FormModal';
import { FormType } from './fields';
import { trackEvent } from '../analytics/analytics';

type Ctx = { openForm: (type: FormType) => void; closeForm: () => void };

const FormModalContext = createContext<Ctx>({ openForm: () => {}, closeForm: () => {} });

/** Wrap the app so any button can open the Farmer/Buyer enquiry forms. */
export function FormModalProvider({ children }: { children: React.ReactNode }) {
  const [which, setWhich] = useState<FormType | null>(null);
  const openForm = useCallback((type: FormType) => {
    trackEvent('form_open', { form: type });
    setWhich(type);
  }, []);
  const closeForm = useCallback(() => setWhich(null), []);

  return (
    <FormModalContext.Provider value={{ openForm, closeForm }}>
      {children}
      {/* key remounts the modal on each open so form state starts fresh */}
      <FormModal key={which ?? 'closed'} which={which} onClose={closeForm} />
    </FormModalContext.Provider>
  );
}

export function useFormModal() {
  return useContext(FormModalContext);
}
