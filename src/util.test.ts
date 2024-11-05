// util.test.ts
import { stringToBoolean, isUndefinedEmptyOrNull } from './util';

describe('Utility Functions', () => {
  describe('stringToBoolean', () => {
    it('should return default value for empty string', () => {
      expect(stringToBoolean('', true)).toBe(true);
      expect(stringToBoolean('', false)).toBe(false);
    });

    it('should return true for "true" regardless of case', () => {
      expect(stringToBoolean('true', false)).toBe(true);
      expect(stringToBoolean('TRUE', false)).toBe(true);
      expect(stringToBoolean('True', false)).toBe(true);
    });

    it('should return false for any other string', () => {
      expect(stringToBoolean('false', true)).toBe(false);
      expect(stringToBoolean('random', true)).toBe(false);
      expect(stringToBoolean('1', true)).toBe(false);
    });
  });

  describe('isUndefinedEmptyOrNull', () => {
    it('should return true for undefined, null, or empty string', () => {
      expect(isUndefinedEmptyOrNull(undefined as unknown as string)).toBe(true);
      expect(isUndefinedEmptyOrNull(null as unknown as string)).toBe(true);
      expect(isUndefinedEmptyOrNull('')).toBe(true);
    });

    it('should return false for non-empty strings', () => {
      expect(isUndefinedEmptyOrNull('test')).toBe(false);
      expect(isUndefinedEmptyOrNull(' ')).toBe(false);
      expect(isUndefinedEmptyOrNull('0')).toBe(false);
    });
  });
});
