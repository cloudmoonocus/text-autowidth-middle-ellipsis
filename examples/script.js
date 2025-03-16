import {
  autowidthMiddle,
  endEllipsis,
  highlightMatches,
  toCamelCase,
  toKebabCase,
} from 'https://cdn.jsdelivr.net/npm/text-utilities-pro@latest/dist/index.js';

// 导航
document.querySelectorAll('nav a').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    document.querySelectorAll('.example-section').forEach((section) => {
      section.style.display = 'none';
    });
    document.getElementById(targetId).style.display = 'block';
  });
});
document.querySelectorAll('.example-section').forEach((section, index) => {
  section.style.display = index === 0 ? 'block' : 'none';
});

// Autowidth Middle Ellipsis Examples
const middleExample1El = document.getElementById('middle-example1');
const longText =
  "This is a long text that won't fit in the container and will be truncated in the middle";
autowidthMiddle(middleExample1El, longText);
const fileName = 'very-long-filename-with-detailed-description.txt';
autowidthMiddle(document.getElementById('middle-example2-narrow'), fileName);
autowidthMiddle(document.getElementById('middle-example2-medium'), fileName);
autowidthMiddle(document.getElementById('middle-example2-wide'), fileName);
const middleExample3El = document.getElementById('middle-example3');
const slider = document.getElementById('widthSlider');
const widthValue = document.getElementById('widthValue');
function updateMiddleExample3() {
  const width = slider.value;
  middleExample3El.style.width = `${width}px`;
  widthValue.textContent = `Width: ${width}px`;
  autowidthMiddle(
    middleExample3El,
    'This is a dynamically resizable container with some long text to demonstrate the middle ellipsis behavior',
  );
}
slider.addEventListener('input', updateMiddleExample3);
updateMiddleExample3();

// End Ellipsis Examples
const endExample1El = document.getElementById('end-example1');
const endLongText =
  "This text will be truncated at the end with an ellipsis if it doesn't fit";
endEllipsis(endExample1El, endLongText);
endEllipsis(document.getElementById('end-example2-narrow'), fileName);
endEllipsis(document.getElementById('end-example2-medium'), fileName);
endEllipsis(document.getElementById('end-example2-wide'), fileName);

// Highlight Matches Examples
const sampleText = 'The quick brown fox jumps over the lazy dog';
document.getElementById('highlight-button').addEventListener('click', () => {
  const searchTerm = document.getElementById('highlight-search').value;
  const result = highlightMatches(sampleText, searchTerm);
  document.getElementById('highlight-result').innerHTML = result;
});
document.getElementById('highlight-button').click();
document
  .getElementById('highlight-custom-button')
  .addEventListener('click', () => {
    const searchTerm = document.getElementById('highlight-custom-search').value;
    const tag = document.getElementById('highlight-tag').value;
    const cssClass = document.getElementById('highlight-class').value;
    const style = document.getElementById('highlight-style').value;

    const result = highlightMatches(sampleText, searchTerm, {
      highlightTag: tag,
      highlightClass: cssClass,
      highlightStyle: style,
    });
    document.getElementById('highlight-custom-result').innerHTML = result;
  });
document.getElementById('highlight-custom-button').click();

// To Camel Case Examples
const camelCaseExamples = [
  { input: 'hello-world', output: '' },
  { input: 'foo_bar', output: '' },
  { input: 'first second third', output: '' },
  { input: 'HelloWorld', output: '' },
  { input: 'mixed-Case_with spaces', output: '' },
];
camelCaseExamples.forEach((example) => {
  example.output = toCamelCase(example.input);
});
camelCaseExamples.forEach((example) => {
  const li = document.createElement('li');
  li.textContent = `"${example.input}" → "${example.output}"`;
  document.getElementById('camel-case-examples').appendChild(li);
});
document.getElementById('camel-case-button').addEventListener('click', () => {
  const input = document.getElementById('camel-case-input').value;
  const result = toCamelCase(input);
  document.getElementById('camel-case-result').textContent = result;
});
document.getElementById('camel-case-button').click();

// To Kebab Case Examples
const kebabCaseExamples = [
  { input: 'helloWorld', output: '' },
  { input: 'foo_bar', output: '' },
  { input: 'first second third', output: '' },
  { input: 'HelloWorld', output: '' },
  { input: 'mixedCase_with spaces', output: '' },
];
kebabCaseExamples.forEach((example) => {
  example.output = toKebabCase(example.input);
});
kebabCaseExamples.forEach((example) => {
  const li = document.createElement('li');
  li.textContent = `"${example.input}" → "${example.output}"`;
  document.getElementById('kebab-case-examples').appendChild(li);
});
document.getElementById('kebab-case-button').addEventListener('click', () => {
  const input = document.getElementById('kebab-case-input').value;
  const result = toKebabCase(input);
  document.getElementById('kebab-case-result').textContent = result;
});
document.getElementById('kebab-case-button').click();
