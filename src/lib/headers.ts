import { Got } from 'got';

const addBearerTokenHeader = (client: Got, accessToken?: string): Got => {
  if (accessToken) {
    return client.extend({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return client;
};

export { addBearerTokenHeader };
