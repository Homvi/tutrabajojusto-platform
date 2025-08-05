import { usePage } from '@inertiajs/react';

export function useTranslation() {
  const { locale, translations } = usePage().props;
  const t = (key: string) => (translations as Record<string, string>)[key] || key;
  return { t, locale };
}