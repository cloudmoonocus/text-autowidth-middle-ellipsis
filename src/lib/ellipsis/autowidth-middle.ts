import type { NullableHTMLElement, NullableStringOrNumber } from '@/types';
import { createTempSpan } from '@/utils';

/**
 * The middle of a single line is omitted
 * @param el Target HTML element
 * @param fullText The full text to be displayed
 */
export default function autowidthMiddle<T extends NullableHTMLElement>(el: T, fullText: NullableStringOrNumber): T {
  if (!el) {
    throw new Error('HTMLElement is required');
  }

  if (fullText === null || fullText === undefined) {
    el.textContent = '';
    return el;
  }

  const textToUse = String(fullText);
  const containerWidth = el.offsetWidth;
  if (containerWidth <= 0) {
    console.warn('textAutoWidthMiddleEllipsis: Container has zero or negative width. Text may not display correctly.');
    el.textContent = textToUse;
    return el;
  }

  let tempSpan: HTMLSpanElement;
  try {
    tempSpan = createTempSpan();
  } catch (error) {
    console.error(error);
    el.textContent = textToUse;
    return el;
  }

  try {
    let startText = textToUse;
    let endText = '';
    tempSpan.textContent = textToUse;

    if (tempSpan.offsetWidth <= containerWidth) {
      el.textContent = textToUse;
      return el;
    }

    const ellipsis = '...';
    let startIndex = Math.floor(textToUse.length / 2);
    let endIndex = Math.ceil(textToUse.length / 2);

    while (tempSpan.offsetWidth > containerWidth && startIndex >= 0) {
      startIndex--;
      endIndex++;
      startText = textToUse.slice(0, Math.max(0, startIndex));
      endText = textToUse.slice(Math.min(endIndex, textToUse.length));
      tempSpan.textContent = `${startText}${ellipsis}${endText}`;

      if (startIndex <= 0 && endIndex >= textToUse.length && tempSpan.offsetWidth > containerWidth) {
        tempSpan.textContent = ellipsis;
        break;
      }
    }

    el.textContent = tempSpan.textContent;
    return el;
  } catch (error) {
    console.error('textAutoWidthMiddleEllipsis: Error during processing', error);
    el.textContent = textToUse;
    return el;
  } finally {
    if (tempSpan?.parentNode) {
      window.document.body.removeChild(tempSpan);
    }
  }
}
