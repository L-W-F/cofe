import { makeId } from './makeId';

test('makeId', () => {
  expect(makeId()[0]).toBe('_');
  expect(makeId('-')[0]).toBe('-');
});
