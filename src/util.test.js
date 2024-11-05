// util.test.ts
import { stringToBoolean, isUndefinedEmptyOrNull } from './util';

describe('stringToBoolean', () => {
  it('should return true for "true"', () => {
    expect(stringToBoolean('true', false)).toBe(true);
  });

  it('should return false for "false"', () => {
    expect(stringToBoolean('false', true)).toBe(false);
  });

  it('should return the default value for an empty string', () => {
    expect(stringToBoolean('', true)).toBe(true);
    expect(stringToBoolean('', false)).toBe(false);
  });

  it('should be case-insensitive', () => {
    expect(stringToBoolean('TrUe', false)).toBe(true);
    expect(stringToBoolean('FaLsE', true)).toBe(false);
  });
});

describe('isUndefinedEmptyOrNull', () => {
  it('should return true for undefined', () => {
    expect(isUndefinedEmptyOrNull(undefined)).toBe(true);
  });

  it('should return true for null', () => {
    expect(isUndefinedEmptyOrNull(null)).toBe(true);
  });

  it('should return true for an empty string', () => {
    expect(isUndefinedEmptyOrNull('')).toBe(true);
  });

  it('should return false for a non-empty string', () => {
    expect(isUndefinedEmptyOrNull('hello')).toBe(false);
  });
});