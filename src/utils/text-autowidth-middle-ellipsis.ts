function createTempSpan(): HTMLSpanElement {
  if (
    typeof window === 'undefined' ||
    !window.document ||
    !window.document.body
  ) {
    throw new Error(
      'textAutoWidthMiddleEllipsis: Document or body is not available. This function can only be used in browser environments.',
    );
  }
  const tempSpan = window.document.createElement('span');
  tempSpan.style.visibility = 'hidden';
  tempSpan.style.position = 'fixed';
  tempSpan.style.top = '-999px';
  window.document.body.appendChild(tempSpan);
  return tempSpan;
}

export default function textAutoWidthMiddleEllipsis(
  el: HTMLElement | null | undefined,
  fullText: string | null | undefined,
): void {
  if (!el) {
    throw new Error('textAutoWidthMiddleEllipsis: HTMLElement is required');
  }

  if (fullText === null || fullText === undefined) {
    console.warn(
      'textAutoWidthMiddleEllipsis: Received null or undefined text, using empty string',
    );
    el.textContent = '';
    return;
  }

  const textToUse = String(fullText);
  const containerWidth = el.offsetWidth;
  if (containerWidth <= 0) {
    console.warn(
      'textAutoWidthMiddleEllipsis: Container has zero or negative width. Text may not display correctly.',
    );
    el.textContent = textToUse;
    return;
  }

  let tempSpan: HTMLSpanElement;
  try {
    tempSpan = createTempSpan();
  } catch (error) {
    console.error(error);
    el.textContent = textToUse;
    return;
  }

  try {
    let startText = textToUse;
    let endText = '';
    tempSpan.textContent = textToUse;

    if (tempSpan.offsetWidth <= containerWidth) {
      el.textContent = textToUse;
      return;
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

      if (
        startIndex <= 0 &&
        endIndex >= textToUse.length &&
        tempSpan.offsetWidth > containerWidth
      ) {
        tempSpan.textContent = ellipsis;
        break;
      }
    }

    el.textContent = tempSpan.textContent;
  } catch (error) {
    console.error(
      'textAutoWidthMiddleEllipsis: Error during processing',
      error,
    );
    el.textContent = textToUse;
  } finally {
    if (tempSpan?.parentNode) {
      window.document.body.removeChild(tempSpan);
    }
  }
}
