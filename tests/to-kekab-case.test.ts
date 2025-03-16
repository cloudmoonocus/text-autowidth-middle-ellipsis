import { toKebabCase } from '@/index.ts';
import { expect, test } from 'vitest';

test('should handle null and undefined inputs', () => {
  expect(toKebabCase(null)).toBe('');
  expect(toKebabCase(undefined)).toBe('');
});

test('should handle empty string', () => {
  expect(toKebabCase('')).toBe('');
  expect(toKebabCase('   ')).toBe('');
});

test('should convert camelCase to kebab-case', () => {
  expect(toKebabCase('helloWorld')).toBe('hello-world');
  expect(toKebabCase('firstSecondThird')).toBe('first-second-third');
});

test('should convert PascalCase to kebab-case', () => {
  expect(toKebabCase('HelloWorld')).toBe('hello-world');
  expect(toKebabCase('FirstSecondThird')).toBe('first-second-third');
});

test('should convert snake_case to kebab-case', () => {
  expect(toKebabCase('hello_world')).toBe('hello-world');
  expect(toKebabCase('first_second_third')).toBe('first-second-third');
});

test('should convert space separated text to kebab-case', () => {
  expect(toKebabCase('hello world')).toBe('hello-world');
  expect(toKebabCase('first second third')).toBe('first-second-third');
});

test('should handle mixed delimiters', () => {
  expect(toKebabCase('hello_world test Case')).toBe('hello-world-test-case');
});

test('should preserve already kebab-case text', () => {
  expect(toKebabCase('hello-world')).toBe('hello-world');
});
