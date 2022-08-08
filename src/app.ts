import 'skuba-dive/register';

import { request } from 'undici';

export const handler = async () => {
  const response = await request('https://example.com/');

  if (response.statusCode !== 200) {
    throw new Error(`Unexpected status code: ${response.statusCode}`);
  }

  const body = await response.body.text();

  return body.includes('Example Domain');
};
