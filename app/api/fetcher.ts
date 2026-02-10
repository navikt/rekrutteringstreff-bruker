import { ZodSchema } from 'zod';
import { logger } from '@navikt/next-logger';

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
    const response = await fetch(url, { method: 'GET', credentials: 'include' });
    logger.info("getAPIwithSchema response.status: " + response.status);

    if (response.status === 404) {
      logger.info("404 Not Found for URL: " + url);
      // Ikke forsøk å lese body; la kalleren håndtere 404 basert på status
      throw new Response( JSON.stringify({ message: 'Rekrutteringstreff ikke funnet'}), {
        status: 404,
      });
    }
    if (!response.ok && response.status === 401) {
      throw new Response(`Network response was not ok: ${response.statusText}`, {
        status: response.status,
      });
    }

    if (!response.ok) {
      // Andre ikke-OK statuskoder
      throw new Error(`Network response was not ok: ${response.statusText}`);
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

export const putApi = async (
  url: string,
  body: any,
): Promise<Response> => {
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

  logger.info('PUT response:', response);
  return response;
};
