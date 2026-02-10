import { ZodSchema } from 'zod';
import { logger } from '@navikt/next-logger';

const validerSchema = <T>(schema: ZodSchema<T>, data: any) => {
  const result = schema.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      // result.succes === false, so we end up here
      throw Error("Validation failed");
    }
};

export const getAPIwithSchema = <T>(
  schema: ZodSchema<T>,
): ((url: string) => Promise<T>) => {
  return async (url: string) => {
    const response = await fetch(url, { method: 'GET', credentials: 'include' });

    if (response.status == 404) {
        throw new Response(`Resource not found: ${response.statusText}`, {status: response.status});
    }

    if (!response.ok &&  response.status == 401) {
      throw new Response(`Network response was not ok: ${response.statusText}`, {status: response.status});
    }
     if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
     }

    const jsonData = await response.json();
    return validerSchema(schema, jsonData);
  };
};

export const putApi = async (
    url: string,
    body: any,
) :  Promise<Response> => {
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

  logger.info("PUT response:", response);
  return response;
};
