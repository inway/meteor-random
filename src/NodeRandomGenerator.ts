import { randomBytes } from 'node:crypto';
import RandomGenerator from './AbstractRandomGenerator.js';

export default class NodeRandomGenerator extends RandomGenerator {
  /**
   * @name Random.fraction
   * @summary Return a number between 0 and 1, like `Math.random`.
   * @locus Anywhere
   */
  fraction() {
    const numerator = Number.parseInt(this.hexString(8), 16);
    return numerator * 2.3283064365386963e-10; // 2^-3;
  }

  /**
   * @name Random.hexString
   * @summary Return a random string of `n` hexadecimal digits.
   * @locus Anywhere
   * @param {Number} digits Length of the string
   */
  hexString(digits: number) {
    const numBytes = Math.ceil(digits / 2);
    let bytes: Buffer;
    // Try to get cryptographically strong randomness. Fall back to
    // non-cryptographically strong if not available.
    try {
      bytes = randomBytes(numBytes);
    } catch (e) {
      // As `pseudoRandomBytes` was deprecated in DEP0115, there should be no
      // fallback and just rethrow the error received
      throw e;
    }
    const result = bytes.toString('hex');
    // If the number of digits is odd, we'll have generated an extra 4 bits
    // of randomness, so we need to trim the last digit.
    return result.substring(0, digits);
  }
}
