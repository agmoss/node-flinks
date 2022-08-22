import createDebug from 'debug';
import { Got } from 'got';

import FlinksError from '../lib/flinks-error';
import { transformResponse, transformToSnakeCase } from '../lib/transform-keys';

interface FlinksTokenOptions {
  client_id: string;
  secret: string;
}

export interface TokenOptions {
  clientId: string;
  secret: string;
}

export interface FlinksTokenResponse {
  HttpStatusCode?: string;
  Message?: string;
  FlinksCode?: string;
  access_token?: string;
  expires_in?: string;
}

export interface TokenResponse {
  httpStatusCode?: string;
  message?: string;
  flinksCode?: string;
  accessToken?: string;
  expiresIn?: number;
}

const debug = createDebug('node-flinks:commands:token');

const token = async (client: Got, options: TokenOptions, testing = false): Promise<TokenResponse> => {
  const requestOptions = transformToSnakeCase<TokenOptions, FlinksTokenOptions>(options);

  debug('request options', requestOptions);

  try {
    let url = `BankingServices/Token`;

    if (testing) {
      url = `BankingServices/Token/?demoObe=true`;
    }

    const response = await client.post<FlinksTokenResponse>(url, {
      json: {
        ...requestOptions,
      },
      responseType: 'json',
    });

    debug('flinks token response', response.body);

    const data = response.body;

    return transformResponse<FlinksTokenResponse, TokenResponse>(data);
  } catch (error) {
    if (error.response?.body) {
      debug('flinks token error response', error.response.body);

      throw new FlinksError('token', { ...error.response.body });
    } else {
      debug('flinks token error', error);

      throw error;
    }
  }
};

export { token };
