import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { textAutoWidthMiddleEllipsis } from '../src/index';

beforeEach(() => {
  // @ts-ignore
  global.document = {
    createElement: vi.fn().mockImplementation(() => ({
      style: {},
      textContent: '',
      get offsetWidth() {
        // Calculate width based on text length
        return this.textContent?.length * 8 || 0;
      },
    })),
    body: {
      appendChild: vi.fn(),
      removeChild: vi.fn(),
    },
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } as any;

  // @ts-ignore
  global.window = {
    document: global.document,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } as any;
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('should throw error when element is null', () => {
  expect(() => textAutoWidthMiddleEllipsis(null, 'test text')).toThrow(
    'HTMLElement is required',
  );
});

test('should handle null or undefined text', () => {
  const el = { textContent: '', offsetWidth: 100 } as HTMLElement;

  textAutoWidthMiddleEllipsis(el, null);
  expect(el.textContent).toBe('');

  textAutoWidthMiddleEllipsis(el, undefined);
  expect(el.textContent).toBe('');
});

test('should use full text when it fits within container', () => {
  const mockElement = {
    textContent: '',
    offsetWidth: 200,
  } as HTMLElement;

  textAutoWidthMiddleEllipsis(mockElement, 'Short text');
  expect(mockElement.textContent).toBe('Short text');
});

test('should apply middle ellipsis when text does not fit', () => {
  const mockElement = {
    textContent: '',
    offsetWidth: 100,
  } as HTMLElement;

  const mockTempSpan = {
    style: {},
    textContent: '',
    get offsetWidth() {
      return this.textContent ===
        'Very long text that should not fit in the container'
        ? 300
        : this.textContent.length * 5;
    },
    parentNode: true,
  };

  document.createElement = vi.fn().mockReturnValue(mockTempSpan);

  textAutoWidthMiddleEllipsis(
    mockElement,
    'Very long text that should not fit in the container',
  );

  expect(mockElement.textContent).toContain('...');
  expect(mockElement.textContent?.length).toBeLessThan(
    'Very long text that should not fit in the container'.length,
  );
});

test('should handle container with zero width', () => {
  const mockElement = {
    textContent: '',
    offsetWidth: 0,
  } as HTMLElement;

  const consoleSpy = vi.spyOn(console, 'warn');
  textAutoWidthMiddleEllipsis(mockElement, 'Test text');

  expect(consoleSpy).toHaveBeenCalledWith(
    expect.stringContaining('zero or negative width'),
  );
  expect(mockElement.textContent).toBe('Test text');
});

test('should handle edge case where even ellipsis alone is too wide', () => {
  const mockElement = {
    textContent: '',
    offsetWidth: 5,
  } as HTMLElement;

  const mockTempSpan = {
    style: {},
    textContent: '',
    offsetWidth: 100,
    parentNode: true,
  };

  document.createElement = vi.fn().mockReturnValue(mockTempSpan);

  textAutoWidthMiddleEllipsis(mockElement, 'Test text');

  expect(mockElement.textContent).toBe('...');
});
