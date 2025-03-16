import type { NullableHTMLElement, NullableString } from '@/types';

/**
 * The tail of a single line is omitted
 * @param el Target HTML element
 * @param fullText The full text to be displayed
 * @param width Optional width value, defaults to 100%
 */
export default function endEllipsis<T extends NullableHTMLElement>(
  el: T,
  fullText: NullableString,
  width?: string,
): T {
  if (!el) {
    throw new Error('HTMLElement is required');
  }

  if (fullText === null || fullText === undefined) {
    el.textContent = '';
    return el;
  }

  el.textContent = String(fullText);
  el.style.display =
    el.style.display === 'inline' ? 'inline-block' : el.style.display;
  el.style.width = width ?? el.style.width ?? '100%';
  el.style.textOverflow = 'ellipsis';
  el.style.overflow = 'hidden';
  el.style.whiteSpace = 'nowrap';

  return el;
}
