import { describe, expect, test } from '@jest/globals';
import Random from './index.js';

describe('original tests from Meteor', () => {
  test('random', () => {
    // Deterministic with a specified seed, which should generate the
    // same sequence in all environments.
    //
    // For repeatable unit test failures using deterministic random
    // number sequences it's fine if a new Meteor release changes the
    // algorithm being used and it starts generating a different
    // sequence for a seed, as long as the sequence is consistent for
    // a particular release.
    const random = Random.createWithSeeds(0);
    expect(random.id()).toBe('cp9hWvhg8GSvuZ9os');
    expect(random.id()).toBe('3f3k6Xo7rrHCifQhR');
    expect(random.id()).toBe('shxDnjWWmnKPEoLhM');
    expect(random.id()).toBe('6QTjB8C5SEqhmz4ni');
  });

  // node crypto and window.crypto.getRandomValues() don't let us specify a seed,
  // but at least test that the output is in the right format.
  test('random - format', () => {
    const idLen = 17;
    expect(Random.id()).toHaveLength(idLen);
    expect(Random.id(29)).toHaveLength(29);
    const numDigits = 9;
    const hexStr = Random.hexString(numDigits);
    expect(hexStr).toHaveLength(numDigits);
    Number.parseInt(hexStr, 16); // should not throw
    const frac = Random.fraction();
    expect(frac < 1.0).toBe(true);
    expect(frac >= 0.0).toBe(true);

    expect(Random.secret()).toHaveLength(43);
    expect(Random.secret(13)).toHaveLength(13);
  });

  test('random - createWithSeeds requires parameters', () => {
    expect(() => Random.createWithSeeds()).toThrow();
  });
});
