import { getEnvironmentVariable, getEnvironmentVariableThrowingException } from './environmentvariables';

describe('Environment Variable Utils', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset process.env before each test
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('getEnvironmentVariable', () => {
    it('should return undefined when environment variable is not set', () => {
      // Arrange
      const key = 'TEST_VAR_NOT_SET';
      delete process.env[key];

      // Act
      const result = getEnvironmentVariable(key);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should return undefined when environment variable is empty', () => {
      // Arrange
      const key = 'TEST_VAR_EMPTY';
      process.env[key] = '';

      // Act
      const result = getEnvironmentVariable(key);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should return value when environment variable is set', () => {
      // Arrange
      const key = 'TEST_VAR_SET';
      const value = 'test-value';
      process.env[key] = value;

      // Act
      const result = getEnvironmentVariable(key);

      // Assert
      expect(result).toBe(value);
    });
  });

  describe('getEnvironmentVariableThrowingException', () => {
    it('should throw error when environment variable is not set', () => {
      // Arrange
      const key = 'TEST_VAR_NOT_SET';
      delete process.env[key];

      // Act & Assert
      expect(() => {
        getEnvironmentVariableThrowingException(key);
      }).toThrow(`No environment variable found for key=[${key}]`);
    });

    it('should throw error when environment variable is empty', () => {
      // Arrange
      const key = 'TEST_VAR_EMPTY';
      process.env[key] = '';

      // Act & Assert
      expect(() => {
        getEnvironmentVariableThrowingException(key);
      }).toThrow(`Empty environment variable found for key=[${key}]`);
    });

    it('should return value when environment variable is set', () => {
      // Arrange
      const key = 'TEST_VAR_SET';
      const value = 'test-value';
      process.env[key] = value;

      // Act
      const result = getEnvironmentVariableThrowingException(key);

      // Assert
      expect(result).toBe(value);
    });
  });
});