import { createSafeFilename } from '../pages/api/generate-image.js';

describe('createSafeFilename', () => {
  test('normalizes to lowercase and hyphenates spaces', () => {
    expect(createSafeFilename('Hello WORLD')).toBe('hello-world');
  });

  test('removes illegal characters', () => {
    expect(createSafeFilename('Some @File* Name!')).toBe('some-file-name');
  });

  test('trims leading and trailing hyphens', () => {
    expect(createSafeFilename('-Hello--World-')).toBe('hello-world');
  });
});
