import type { NullableString } from '@/types';

export default function toKebabCase(text: NullableString): string {
  if (!text) {
    return '';
  }

  const textToUse = String(text);

  if (textToUse.trim() === '') {
    return '';
  }

  try {
    return textToUse
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  } catch (error) {
    console.error('toKebabCase: Error during processing', error);
    return textToUse;
  }
}
