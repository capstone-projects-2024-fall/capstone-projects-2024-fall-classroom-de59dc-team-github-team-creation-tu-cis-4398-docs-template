const mclass = require('./mclass');

test('returns "Current Class: CIS Capstone"', () => {
  expect(mclass()).toBe("Current Class: CIS Capstone");
});