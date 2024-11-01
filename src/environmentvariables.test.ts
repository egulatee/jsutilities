import { getEnvironmentVariable, getEnvironmentVariableThrowingException } from './environment';
import { Logger } from 'tslog';

// Mock tslog
jest.mock('tslog');

describe('Environment Variable Utils', () => {
  // Store original process.env
  const originalEnv = process.env;
  
  // Mock logger instance
  let mockLogger: jest.Mocked<Logger>;
  
  beforeEach(() => {
    // Reset process.env before each test
    process.env = { ...originalEnv };
    
    // Clear all mocks
    jest.clearAllMocks();
    
    // Setup logger mock
    mockLogger = {
      warn: jest.fn(),
      debug: jest.fn(),
    } as unknown as jest.Mocked<Logger>;
    
    // Mock Logger constructor
    (Logger as jest.Mock).mockImplementation(() => mockLogger);
  });
  
  afterEach(() => {
    // Restore process.env
    process.env = originalEnv;
  });
  
  describe('getEnvironmentVariable', () => {
    it('should return undefined when environment variable is not set', () => {
      // Arrange
      const key = 'NON_EXISTENT_VAR';
      delete process.env[key];
      
      // Act
      const result = getEnvironmentVariable(key);
      
      // Assert
      expect(result).toBeUndefined();
      expect(mockLogger.warn).toHaveBeenCalledWith(
        `No environment variable found for key=[${key}]`
      );
    });
    
    it('should return undefined when environment variable is empty', () => {
      // Arrange
      const key = 'EMPTY_VAR';
      process.env[key] = '';
      
      // Act
      const result = getEnvironmentVariable(key);
      
      // Assert
      expect(result).toBeUndefined();
      expect(mockLogger.warn).toHaveBeenCalledWith(
        `Empty environment variable found for key=[${key}]`
      );
    });
    
    it('should return value when environment variable is set', () => {
      // Arrange
      const key = 'VALID_VAR';
      const value = 'test-value';
      process.env[key] = value;
      
      // Act
      const result = getEnvironmentVariable(key);
      
      // Assert
      expect(result).toBe(value);
      expect(mockLogger.debug).toHaveBeenCalledWith(
        `Environment Variable key[${key}] has value=[${value}]`
      );
    });
  });
  
  describe('getEnvironmentVariableThrowingException', () => {
    it('should throw error when environment variable is not set', () => {
      // Arrange
      const key = 'NON_EXISTENT_VAR';
      delete process.env[key];
      
      // Act & Assert
      expect(() => getEnvironmentVariableThrowingException(key)).toThrow(
        `No environment variable found for key=[${key}]`
      );
      expect(mockLogger.warn).toHaveBeenCalledWith(
        `No environment variable found for key=[${key}]`
      );
    });
    
    it('should throw error when environment variable is empty', () => {
      // Arrange
      const key = 'EMPTY_VAR';
      process.env[key] = '';
      
      // Act & Assert
      expect(() => getEnvironmentVariableThrowingException(key)).toThrow(
        `Empty environment variable found for key=[${key}]`
      );
      expect(mockLogger.warn).toHaveBeenCalledWith(
        `Empty environment variable found for key=[${key}]`
      );
    });
    
    it('should return value when environment variable is set', () => {
      // Arrange
      const key = 'VALID_VAR';
      const value = 'test-value';
      process.env[key] = value;
      
      // Act
      const result = getEnvironmentVariableThrowingException(key);
      
      // Assert
      expect(result).toBe(value);
      expect(mockLogger.debug).toHaveBeenCalledWith(
        `Environment Variable key[${key}] has value=[${value}]`
      );
    });
  });
});