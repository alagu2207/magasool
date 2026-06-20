import React, { useEffect, useState } from 'react';
import {
  Modal, View, Text, StyleSheet, TextInput, Pressable, ScrollView, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadow } from '../theme';
import { Button } from '../ui/Button';
import { sound } from '../ui/sound';
import { FORM_META, FormType, Field } from './fields';
import { GOOGLE_FORMS, isFormConfigured, formResponseUrl, buildFormBody } from './googleForms';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const KEYBOARD: Record<Field['type'], 'default' | 'phone-pad' | 'email-address' | 'numeric'> = {
  text: 'default',
  multiline: 'default',
  phone: 'phone-pad',
  email: 'email-address',
  number: 'numeric',
};

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function FormModal({ which, onClose }: { which: FormType | null; onClose: () => void }) {
  const meta = which ? FORM_META[which] : null;
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState('');

  // Whoosh when the form opens (the component is remounted per-open via `key`).
  useEffect(() => {
    if (which) sound.open();
  }, [which]);

  // Celebratory arpeggio once the submission succeeds.
  useEffect(() => {
    if (status === 'success') sound.success();
  }, [status]);

  // State is reset on open via a `key` on this component from FormModalProvider.
  if (!which || !meta) return null;

  const set = (k: string, v: string) => {
    setValues((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: '' }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    for (const f of meta.fields) {
      const v = (values[f.key] ?? '').trim();
      if (f.required && !v) next[f.key] = 'Required';
      else if (f.type === 'email' && v && !isEmail(v)) next[f.key] = 'Enter a valid email';
      else if (f.type === 'phone' && v && v.replace(/\D/g, '').length < 7) next[f.key] = 'Enter a valid phone';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;

    const cfg = GOOGLE_FORMS[which];
    if (!isFormConfigured(cfg)) {
      setStatus('error');
      setServerError(
        'Google Form is not configured yet. Add the form id + entry ids in src/forms/googleForms.ts.',
      );
      return;
    }

    setStatus('submitting');
    setServerError('');
    try {
      // Google Forms has no CORS headers, so we fire-and-forget with mode:'no-cors'.
      // The response is opaque (unreadable) but the row is still saved to the form.
      await fetch(formResponseUrl(cfg.formId), {
        method: 'POST',
        mode: 'no-cors',
        body: buildFormBody(cfg, values),
      });
      setStatus('success');
    } catch (e: any) {
      setStatus('error');
      setServerError(
        e?.message?.includes('Failed to fetch')
          ? 'Could not reach Google. Check your internet connection and try again.'
          : e?.message || 'Something went wrong. Please try again.',
      );
    }
  };

  const isFarmer = which === 'farmer';
  const accent = isFarmer ? colors.green : colors.yellow;
  // Text/icons sitting on top of the accent: white on green, dark on yellow.
  const onAccent = isFarmer ? colors.white : colors.greenDark;
  const onAccentSub = isFarmer ? 'rgba(255,255,255,0.9)' : 'rgba(17,51,31,0.72)';

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.card}>
          {/* Header */}
          <View style={[styles.header, { backgroundColor: accent }]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.title, { color: onAccent }]}>{meta.title}</Text>
              <Text style={[styles.subtitle, { color: onAccentSub }]}>{meta.subtitle}</Text>
            </View>
            <Pressable onPress={onClose} style={styles.close} hitSlop={8}>
              <Ionicons name="close" size={22} color={onAccent} />
            </Pressable>
          </View>

          {status === 'success' ? (
            <View style={styles.successWrap}>
              <View style={[styles.successIcon, { backgroundColor: accent }]}>
                <Ionicons name="checkmark" size={34} color={onAccent} />
              </View>
              <Text style={styles.successTitle}>You're all set!</Text>
              <Text style={styles.successText}>
                We've received your details. Our team will reach out to you shortly to take the next step.
              </Text>
              <Button label="Done" variant={isFarmer ? 'green' : 'yellow'} full onPress={onClose} style={{ marginTop: 18 }} />
            </View>
          ) : (
            <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent} keyboardShouldPersistTaps="handled">
              {meta.fields.map((f) => (
                <View key={f.key} style={styles.fieldWrap}>
                  <Text style={styles.label}>
                    {f.label}
                    {f.required ? <Text style={styles.req}> *</Text> : null}
                  </Text>
                  <TextInput
                    value={values[f.key] ?? ''}
                    onChangeText={(t) => set(f.key, t)}
                    placeholder={f.placeholder}
                    placeholderTextColor={colors.faint}
                    keyboardType={KEYBOARD[f.type]}
                    multiline={f.type === 'multiline'}
                    autoCapitalize={f.type === 'email' ? 'none' : 'sentences'}
                    style={[
                      styles.input,
                      f.type === 'multiline' && styles.textarea,
                      errors[f.key] && styles.inputError,
                    ]}
                  />
                  {errors[f.key] ? <Text style={styles.errorText}>{errors[f.key]}</Text> : null}
                </View>
              ))}

              {status === 'error' && serverError ? (
                <View style={styles.banner}>
                  <Ionicons name="alert-circle" size={16} color="#B42318" />
                  <Text style={styles.bannerText}>{serverError}</Text>
                </View>
              ) : null}

              <Button
                label={status === 'submitting' ? 'Submitting…' : meta.submitLabel}
                variant={isFarmer ? 'green' : 'yellow'}
                icon="paper-plane-outline"
                full
                onPress={submit}
                style={{ marginTop: 6, opacity: status === 'submitting' ? 0.7 : 1 }}
              />
              {status === 'submitting' ? <ActivityIndicator color={accent} style={{ marginTop: 10 }} /> : null}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(17,40,28,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 460,
    maxHeight: '88%',
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    overflow: 'hidden',
    ...shadow.card,
  },
  header: { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 22, paddingVertical: 20 },
  title: { color: colors.white, fontSize: 20, fontWeight: '800' },
  subtitle: { color: 'rgba(255,255,255,0.9)', fontSize: 12.5, marginTop: 4, lineHeight: 18, paddingRight: 8 },
  close: { padding: 2 },

  body: { flexGrow: 0 },
  bodyContent: { padding: 22 },
  fieldWrap: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: '700', color: colors.ink, marginBottom: 6 },
  req: { color: colors.yellowDark },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 14,
    color: colors.ink,
    // @ts-ignore web-only focus ring color
    outlineColor: colors.greenAccent,
  },
  textarea: { height: 74, textAlignVertical: 'top' },
  inputError: { borderColor: '#E5483D' },
  errorText: { color: '#B42318', fontSize: 11.5, marginTop: 4 },

  banner: {
    flexDirection: 'row', alignItems: 'center', gap: 8 as unknown as number,
    backgroundColor: '#FEF3F2', borderRadius: radius.sm, padding: 10, marginBottom: 12,
  },
  bannerText: { color: '#B42318', fontSize: 12.5, flex: 1 },

  successWrap: { padding: 30, alignItems: 'center' },
  successIcon: {
    width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  successTitle: { fontSize: 20, fontWeight: '800', color: colors.ink, marginBottom: 8 },
  successText: { fontSize: 13.5, color: colors.body, textAlign: 'center', lineHeight: 20 },
});
