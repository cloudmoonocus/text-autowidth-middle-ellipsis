# text-autowidth-middle-ellipsis

A lightweight utility that automatically applies middle ellipsis to text that doesn't fit within its container width.

Rather than the standard truncation at the end (`"Long text..."`) this library truncates from the middle (`"Long...text"`), preserving both the beginning and end of your text, which is often more informative.

## Installation

```bash
npm install text-autowidth-middle-ellipsis
```

or

```bash
yarn add text-autowidth-middle-ellipsis
```

## Features

- 🔍 Automatically detects container width and applies ellipsis as needed
- 🎯 Applies ellipsis in the middle of text instead of the end
- 🔄 Dynamically adjusts to container size
- 🛡️ Comprehensive error handling and edge case management
- 🌐 Works in all modern browsers

## Usage

```javascript
import { textAutoWidthMiddleEllipsis } from 'text-autowidth-middle-ellipsis';

// Basic usage
const element = document.getElementById('my-element');
textAutoWidthMiddleEllipsis(element, 'This is a very long text that will be truncated with ellipsis in the middle');

// Inside a React component
useEffect(() => {
  if (containerRef.current) {
    textAutoWidthMiddleEllipsis(
      containerRef.current, 
      'Long file name with extension.pdf'
    );
  }
}, [containerRef]);
```

## API

```typescript
function textAutoWidthMiddleEllipsis(
  el: HTMLElement | null | undefined,
  fullText: string | null | undefined
): void
```

### Parameters

- `el`: The HTML element to apply text to. Required.
- `fullText`: The complete text to display with ellipsis if needed.

### Error Handling

The function includes comprehensive error handling:

- Throws an error when `el` is null or undefined
- Warns and uses empty string when `fullText` is null or undefined
- Handles containers with zero or negative width
- Catches and logs errors that might occur during processing
- Falls back to full text if any error occurs

## Examples

### Basic Example

```html
<div id="filename" style="width: 200px; white-space: nowrap; overflow: hidden;">
  <!-- Text will be inserted here -->
</div>

<script>
  const element = document.getElementById('filename');
  textAutoWidthMiddleEllipsis(element, 'very-long-filename-with-detailed-description.txt');
  // Result: "very-long-file...description.txt"
</script>
```

### Dynamic Width Example

```javascript
// Update text when container width changes
window.addEventListener('resize', () => {
  const element = document.getElementById('filename');
  textAutoWidthMiddleEllipsis(element, 'very-long-filename-with-detailed-description.txt');
});
```

## Browser Compatibility

Works in all modern browsers that support ES2021 features. The utility checks for browser environment availability and provides appropriate error handling.

## License

MIT
