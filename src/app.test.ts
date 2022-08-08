import { handler } from './app';
import { mockClient } from './mocks/undici';

it('recognises a match in response body', () => {
  mockClient
    .intercept({
      method: 'GET',
      path: '/',
    })
    .reply(() => ({
      data: '-> Example Domain <-',
      statusCode: 200,
    }));

  return expect(handler()).resolves.toBe(true);
});

it('recognises a non-match in response body', () => {
  mockClient
    .intercept({
      method: 'GET',
      path: '/',
    })
    .reply(() => ({
      data: '-> Why This? <-',
      statusCode: 200,
    }));

  return expect(handler()).resolves.toBe(false);
});

it('throws on unexpected response status', () => {
  mockClient
    .intercept({
      method: 'GET',
      path: '/',
    })
    .reply(() => ({
      statusCode: 418,
    }));

  return expect(handler()).rejects.toThrowErrorMatchingInlineSnapshot(
    `"Unexpected status code: 418"`,
  );
});
