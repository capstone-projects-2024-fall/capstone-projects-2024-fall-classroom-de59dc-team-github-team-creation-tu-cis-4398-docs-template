// helloWorld.test.js
const helloWorld = require('./helloWorld');

test('returns "Hello, World!"', () => {
  expect(helloWorld()).toBe("Hello, World!");
});

test('does not return "Goodbye, World!"', () => {
  expect(helloWorld()).not.toBe("Goodbye, World!");
});

test('returns a string type', () => {
  expect(typeof helloWorld()).toBe("string");
});