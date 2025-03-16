import type { NullableString } from '@/types';

export default function highlightMatches(
  text: NullableString,
  searchTerm: NullableString,
  options: {
    highlightTag?: string;
    highlightClass?: string;
    highlightStyle?: string;
  } = {},
): string {
  if (!text) return '';

  const textToUse = String(text);

  if (!searchTerm) {
    return textToUse;
  }

  try {
    const searchTermStr = String(searchTerm);
    const escapedSearchTerm = searchTermStr.replace(
      /[.*+?^${}()|[\]\\]/g,
      '\\$&',
    );
    const regex = new RegExp(escapedSearchTerm, 'gi');
    const highlightTag = options.highlightTag || 'mark';
    const highlightClass = options.highlightClass
      ? ` class="${options.highlightClass}"`
      : '';
    const highlightStyle = options.highlightStyle
      ? ` style="${options.highlightStyle}"`
      : '';
    const replacement = `<${highlightTag}${highlightClass}${highlightStyle}>$&</${highlightTag}>`;
    return textToUse.replace(regex, replacement);
  } catch (error) {
    console.error('highlightMatches: Error during processing', error);
    return textToUse;
  }
}
