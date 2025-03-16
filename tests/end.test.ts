import { endEllipsis } from '@/index.ts';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';

beforeEach(() => {
  // @ts-ignore
  global.document = {
    createElement: vi.fn(),
    body: {},
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } as any;

  // @ts-ignore
  global.window = {
    document: global.document,
    getComputedStyle: vi.fn().mockReturnValue({ display: 'block' }),
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } as any;
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('should throw error when element is null', () => {
  expect(() => endEllipsis(null, 'test text')).toThrow(
    'HTMLElement is required',
  );
});

test('should handle null or undefined text', () => {
  const el = { textContent: '', style: {} } as HTMLElement;

  endEllipsis(el, null);
  expect(el.textContent).toBe('');

  endEllipsis(el, undefined);
  expect(el.textContent).toBe('');
});

test('should apply text and ellipsis styles', () => {
  const el = {
    textContent: '',
    style: {},
  } as HTMLElement;

  endEllipsis(el, 'Sample text');

  expect(el.textContent).toBe('Sample text');
  expect(el.style.textOverflow).toBe('ellipsis');
  expect(el.style.overflow).toBe('hidden');
  expect(el.style.whiteSpace).toBe('nowrap');
  expect(el.style.width).toBe('100%');
});

test('should set custom width when provided', () => {
  const el = {
    textContent: '',
    style: {},
  } as HTMLElement;

  endEllipsis(el, 'Sample text', '200px');

  expect(el.style.width).toBe('200px');
});

test('should change display from inline to inline-block', () => {
  const el = {
    textContent: '',
    style: { display: 'inline' },
  } as HTMLElement;

  endEllipsis(el, 'Sample text');

  expect(el.style.display).toBe('inline-block');
});

test('should not change other display values', () => {
  const el = {
    textContent: '',
    style: { display: 'flex' },
  } as HTMLElement;

  endEllipsis(el, 'Sample text');

  expect(el.style.display).toBe('flex');
});

test('should return the element for chaining', () => {
  const el = {
    textContent: '',
    style: {},
  } as HTMLElement;

  const result = endEllipsis(el, 'Sample text');

  expect(result).toBe(el);
});
