const Random = require('./random.js')

// node crypto and window.crypto.getRandomValues() don't let us specify a seed,
// but at least test that the output is in the right format.
test('random - format', () => {
  var idLen = 17;
  expect(Random.id().length).toBe(idLen);
  expect(Random.id(29).length).toBe(29);
  var numDigits = 9;
  var hexStr = Random.hexString(numDigits);
  expect(hexStr.length).toBe(numDigits);
  parseInt(hexStr, 16); // should not throw
  var frac = Random.fraction();
  expect(frac < 1.0).toBe(true);
  expect(frac >= 0.0).toBe(true);

  expect(Random.secret().length).toBe(43);
  expect(Random.secret(13).length).toBe(13);
});

test('random - createWithSeeds requires parameters', () => {
  expect(() => {
    Random.createWithSeeds();
  }).toThrow();
});
