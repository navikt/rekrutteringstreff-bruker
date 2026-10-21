import { rapporterApiFeil } from '@/app/util/apm';
import { logger } from '@navikt/next-logger';
import { ZodSchema } from 'zod';

export class ApiFeil extends Error {
  readonly status: number;
  readonly url: string;

  constructor(status: number, url: string, statusText?: string) {
    super(
      `API-kall feilet med status ${status}${statusText ? ` (${statusText})` : ''}: ${url}`,
    );
    this.name = 'ApiFeil';
    this.status = status;
    this.url = url;
  }
}

export const erForventetApiFeil = (error: unknown): error is ApiFeil =>
  error instanceof ApiFeil && (error.status === 401 || error.status === 404);

const validerSchema = <T>(schema: ZodSchema<T>, data: any) => {
  const result = schema.safeParse(data);
  if (result.success) {
    return result.data;
  } else {
    throw Error('Validation failed');
  }
};

export const getAPIwithSchema = <T>(
  schema: ZodSchema<T>,
): ((url: string) => Promise<T>) => {
  return async (url: string) => {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new ApiFeil(response.status, url, response.statusText);
    }

    let jsonData: unknown;
    try {
      jsonData = await response.json();
    } catch (e) {
      // Body var ikke gyldig JSON
      throw new Error('Non-JSON content received');
    }

    return validerSchema(schema, jsonData);
  };
};

export const putApi = async (url: string, body: any): Promise<Response> => {
  const response = await fetch(url, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body, (_key, value) =>
      value instanceof Set ? [...value] : value,
    ),
  });
  logger.info(response, 'PUT response:');
  if (!response.ok) rapporterApiFeil(response.status, response.url);
  return response;
};
