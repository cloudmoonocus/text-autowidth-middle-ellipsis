import { toCamelCase } from '@/index.ts';
import { expect, test } from 'vitest';

test('should handle null and undefined inputs', () => {
  expect(toCamelCase(null)).toBe('');
  expect(toCamelCase(undefined)).toBe('');
});

test('should handle empty string', () => {
  expect(toCamelCase('')).toBe('');
  expect(toCamelCase('   ')).toBe('');
});

test('should convert kebab-case to camelCase', () => {
  expect(toCamelCase('hello-world')).toBe('helloWorld');
  expect(toCamelCase('first-second-third')).toBe('firstSecondThird');
});

test('should convert snake_case to camelCase', () => {
  expect(toCamelCase('hello_world')).toBe('helloWorld');
  expect(toCamelCase('first_second_third')).toBe('firstSecondThird');
});

test('should convert space separated text to camelCase', () => {
  expect(toCamelCase('hello world')).toBe('helloWorld');
  expect(toCamelCase('first second third')).toBe('firstSecondThird');
});

test('should handle mixed delimiters', () => {
  expect(toCamelCase('hello-world_test case')).toBe('helloWorldTestCase');
});

test('should preserve already camelCase text', () => {
  expect(toCamelCase('helloWorld')).toBe('helloWorld');
});

test('should convert PascalCase to camelCase', () => {
  expect(toCamelCase('HelloWorld')).toBe('helloWorld');
});
