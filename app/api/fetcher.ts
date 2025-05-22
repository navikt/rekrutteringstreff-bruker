import { ZodSchema } from "zod";

const validerSchema = <T>(schema: ZodSchema<T>, data: any) => {
  return schema.parse(data);
};

export const getAPIwithSchema = <T>(
  schema: ZodSchema<T>,
): ((url: string) => Promise<T>) => {
  return async (url: string) => {
    const data = await fetch(url);
    return validerSchema(schema, data);
  };
};