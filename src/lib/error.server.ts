import { ZodError } from 'zod';
import { ApiError } from './service/api-client.server';
import { problemDetailsSchema } from './schemas/problem-detail';

export async function toActionErrorsAsync<T>(body: ZodError<T>): Promise<Record<string, string[]>>;
export async function toActionErrorsAsync(body: ApiError): Promise<Record<string, string[]>>;
export async function toActionErrorsAsync(body: Error): Promise<Record<string, string[]>>;
export async function toActionErrorsAsync(body: unknown): Promise<Record<string, string[]>>;
export async function toActionErrorsAsync(body: unknown): Promise<Record<string, string[]>> {
  if (body instanceof ApiError) {
    return body.details.errors
      ? body.details.errors.reduce((acc, cur) => {
          if (Array.isArray(acc[cur.name])) {
            acc[cur.name].push(cur.code ?? cur.message);
          } else {
            acc[cur.name] = [cur.code ?? cur.message];
          }
          return acc;
        }, {} as Record<string, string[]> )
      : { form: [body.details.detail ?? body.details.title, body.details.instance!] };
  }

  if (body instanceof ZodError) {
    return body.flatten().fieldErrors as Record<string, string[]>;
  }

  if (body instanceof Error) {
    return { form: [`${body.name}: ${body.message}`] };
  }

  const parse = await problemDetailsSchema.safeParseAsync(body);
  if (parse.success) {
    return parse.data.errors == null
      ? { form: [parse.data.detail ?? parse.data.title] }
      : parse.data.errors.reduce((acc, cur) => {
          if (Array.isArray(acc[cur.name])) {
            acc[cur.name].push(cur.code ?? cur.message);
          } else {
            acc[cur.name] = [cur.code ?? cur.message];
          }
          return acc;
        }, {} as Record<string, string[]>);
  }
  return { form: ['Unable to process request'] };
}