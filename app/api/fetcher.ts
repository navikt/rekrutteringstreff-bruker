import { ZodSchema } from 'zod';

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
    const data = await fetch(url, { method: 'GET', credentials: 'include' });
    if (!data.ok) {
      throw new Error(`Network response was not ok: ${data.statusText}`, {cause: data.status});
    }
    const jsonData = await data.json();
    return validerSchema(schema, jsonData);
  };
};
