# Text Utilities

A lightweight collection of text manipulation utilities for web applications.

## Installation

```bash
npm install text-utilities
```

or

```bash
yarn add text-utilities
```

## Features

- 🔍 **Text Truncation**
    - Middle ellipsis (`autowidthMiddle`) - Truncates from the middle preserving start and end
    - End ellipsis (`endEllipsis`) - Traditional end truncation
- 🔠 **Text Transformation**
    - camelCase conversion (`toCamelCase`)
    - kebab-case conversion (`toKebabCase`)
- 🔍 **Text Enhancement**
    - Match highlighting (`highlightMatches`) - Highlight search terms in text
- 🛡️ Comprehensive error handling and edge case management
- 🌐 Works in all modern browsers

## Usage

```javascript
import { 
  autowidthMiddle,
  endEllipsis,
  highlightMatches,
  toCamelCase,
  toKebabCase 
} from 'text-utilities';

// Examples for each utility
const element = document.getElementById('my-element');

// Middle ellipsis
autowidthMiddle(element, 'Long file name with extension.pdf');

// End ellipsis
endEllipsis(element, 'This text will be truncated at the end if needed');

// Highlight matches
const highlightedText = highlightMatches('The quick brown fox', 'brown');

// Case conversions
const camelCased = toCamelCase('hello-world');  // "helloWorld"
const kebabCased = toKebabCase('helloWorld');   // "hello-world"
```

## API Reference

### Text Truncation

#### `autowidthMiddle(el, fullText)`
Automatically applies middle ellipsis to text that doesn't fit within its container.

```typescript
function autowidthMiddle(
  el: HTMLElement | null | undefined,
  fullText: string | null | undefined
): void
```

#### `endEllipsis(el, fullText)`
Applies standard end ellipsis to text that exceeds its container width.

```typescript
function endEllipsis(
  el: HTMLElement | null | undefined,
  fullText: string | null | undefined
): void
```

### Text Transformation

#### `toCamelCase(text)`
Converts text to camelCase format.

```typescript
function toCamelCase(text: string): string
```

#### `toKebabCase(text)`
Converts text to kebab-case format.

```typescript
function toKebabCase(text: string): string
```

### Text Enhancement

#### `highlightMatches(text, query, options?)`
Highlights matching portions of text.

```typescript
function highlightMatches(
  text: string,
  query: string,
  options?: {
    highlightTag?: string;
    highlightClass?: string;
    highlightStyle?: string;
  }
): string
```

## Examples

### Ellipsis Examples

```html
<div id="middle-ellipsis" style="width: 200px; white-space: nowrap; overflow: hidden;"></div>
<div id="end-ellipsis" style="width: 200px; white-space: nowrap; overflow: hidden;"></div>

<script>
  const midElement = document.getElementById('middle-ellipsis');
  const endElement = document.getElementById('end-ellipsis');
  const filename = 'very-long-filename-with-detailed-description.txt';
  
  autowidthMiddle(midElement, filename);  // "very-long-file...description.txt"
  endEllipsis(endElement, filename);      // "very-long-filename-with-de..."
</script>
```

### Text Transformation Examples

```javascript
// camelCase examples
toCamelCase('hello-world');      // "helloWorld"
toCamelCase('foo_bar');          // "fooBar"
toCamelCase('Hello World');      // "helloWorld"

// kebab-case examples
toKebabCase('helloWorld');       // "hello-world"
toKebabCase('foo_bar');          // "foo-bar"
toKebabCase('Hello World');      // "hello-world"
```

### Highlight Matches Example

```javascript
// Basic highlight
highlightMatches('The quick brown fox', 'brown');
// Returns: "The quick <mark>brown</mark> fox"

// Custom highlighting
highlightMatches('The quick brown fox', 'brown', {
  highlightTag: 'span',
  highlightClass: 'highlight',
  highlightStyle: 'background-color: yellow; font-weight: bold;'
});
// Returns: "The quick <span class="highlight" style="background-color: yellow; font-weight: bold;">brown</span> fox"
```

## Browser Compatibility

Works in all modern browsers that support ES2021 features. The utilities check for browser environment availability and provide appropriate error handling.

## License

MIT
