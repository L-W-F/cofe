import { isPromise } from './isPromise';

test('isPromise', () => {
  expect(isPromise({})).toBeFalsy();
  expect(isPromise(Promise.resolve(''))).toBeTruthy();
  expect(isPromise({ then: () => null })).toBeTruthy();
  expect(
    isPromise(Object.assign(() => null, { then: () => null })),
  ).toBeTruthy();
});
