import type { NullableString } from '@/types';

export default function toCamelCase(text: NullableString): string {
  if (!text) {
    return '';
  }

  const textToUse = String(text);

  if (textToUse.trim() === '') {
    return '';
  }

  try {
    return textToUse.replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : '')).replace(/^[A-Z]/, (match) => match.toLowerCase());
  } catch (error) {
    console.error('toCamelCase: Error during processing', error);
    return textToUse;
  }
}
