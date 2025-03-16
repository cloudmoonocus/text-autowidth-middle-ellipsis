import { highlightMatches } from '@/index.ts';
import { expect, test } from 'vitest';

test('should throw error when text is null or undefined', () => {
  expect(highlightMatches(null, 'test')).toBe('');
  expect(highlightMatches(undefined, 'test')).toBe('');
});

test('should return original text when search term is null, undefined or empty', () => {
  expect(highlightMatches('test text', null)).toBe('test text');
  expect(highlightMatches('test text', undefined)).toBe('test text');
  expect(highlightMatches('test text', '')).toBe('test text');
});

test('should highlight exact matches', () => {
  expect(highlightMatches('test text', 'test')).toBe('<mark>test</mark> text');
});

test('should highlight all occurrences of search term', () => {
  expect(highlightMatches('test test', 'test')).toBe(
    '<mark>test</mark> <mark>test</mark>',
  );
});

test('should be case insensitive', () => {
  expect(highlightMatches('Test TEST', 'test')).toBe(
    '<mark>Test</mark> <mark>TEST</mark>',
  );
});

test('should escape special regex characters in search term', () => {
  expect(highlightMatches('test.com', '.')).toBe('test<mark>.</mark>com');
  expect(highlightMatches('test*com', '*')).toBe('test<mark>*</mark>com');
});

test('should return original text when no matches found', () => {
  expect(highlightMatches('test text', 'xyz')).toBe('test text');
});

test('should use custom highlight tag when provided', () => {
  expect(highlightMatches('test text', 'test', { highlightTag: 'span' })).toBe(
    '<span>test</span> text',
  );
});

test('should add class attribute when highlightClass provided', () => {
  expect(
    highlightMatches('test text', 'test', { highlightClass: 'highlight' }),
  ).toBe('<mark class="highlight">test</mark> text');
});

test('should add style attribute when highlightStyle provided', () => {
  expect(
    highlightMatches('test text', 'test', {
      highlightStyle: 'background-color: yellow',
    }),
  ).toBe('<mark style="background-color: yellow">test</mark> text');
});

test('should combine all custom options correctly', () => {
  expect(
    highlightMatches('test text', 'test', {
      highlightTag: 'span',
      highlightClass: 'highlight',
      highlightStyle: 'color: red',
    }),
  ).toBe('<span class="highlight" style="color: red">test</span> text');
});
