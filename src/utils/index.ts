function createTempSpan(): HTMLSpanElement {
  if (typeof window === 'undefined' || !window.document || !window.document.body) {
    throw new Error('Document or body is not available. This function can only be used in browser environments.');
  }
  const tempSpan = window.document.createElement('span');
  tempSpan.style.visibility = 'hidden';
  tempSpan.style.position = 'fixed';
  tempSpan.style.top = '-999px';
  window.document.body.appendChild(tempSpan);
  return tempSpan;
}

export { createTempSpan };
