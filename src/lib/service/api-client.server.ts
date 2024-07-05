
import { ResultAsync, err, errAsync, ok,fromPromise, fromSafePromise } from 'neverthrow';
import { problemDetailsSchema } from "../schemas/problem-detail";
export interface RequestApiOptions extends Omit<RequestInit, 'body'> {
    body?: Record<number | string, any> | any[] | FormData | Buffer;
}

export interface ApiResponse extends Response {}
function trim(input: string, char: string) {
  let start = 0;
  let end = input.length;
  while (input[start] === char) ++start;
  while (input[--end] === char);
  if (end < start) end = start - 1;
  return input.substring(start, end + 1);
}

export class ApiError extends Error {
    private constructor(private readonly details_: Zod.infer<typeof problemDetailsSchema>) {
      super();
    }
  
    public get details() {
      return this.details_;
    }
  
    public static async from(details: unknown) {
      console.log(details);
      const data = await problemDetailsSchema.parseAsync(details);
      return new ApiError(data);
    }
  }
  
  
export class ApiClient {
    private static _instance: ApiClient | undefined = undefined;
    protected static _baseUrl: String | undefined = process.env.NEXT_PUBLIC_API_BASE_URL_Client;
    
    protected constructor(private readonly _baseUrl: String){}
    public static get instance() {
        if (!ApiClient._instance) {
          if (!ApiClient._baseUrl) {
            throw new ReferenceError(
              'Failed to initialize ApiClient. An option must be provided `NEXT_PUBLIC_API_BASE_URL_Client in .env` first'
            );
          }
          ApiClient._instance = new ApiClient(ApiClient._baseUrl);
        }
        return ApiClient._instance;
      }
  
    
      protected fetch(input: string | URL, { headers, ...options }: RequestApiOptions = {}): ResultAsync<ApiResponse, Error> {
        let url = typeof input === 'string' ? input : input.pathname;
        const record: Record<string, string> = ApiClient.makeHeaders(headers);
        if (options?.body) {
          record['Content-Type'] ??=
            options.body instanceof FormData || options?.body instanceof Buffer
              ? 'multipart/form-data'
              : 'application/json';
        }
        const [path, query] = url.split('?', 2);
        url = this._baseUrl + '/' + trim(path, '/').split('/').join('/');
        if (query) {
          url += '?' + query;
        }
        return fromPromise(
          fetch(
            url,
            options
              ? {
                  ...options,
                  headers: record,
                  body:
                    options?.body instanceof FormData || options?.body instanceof Buffer
                      ? options.body
                      : JSON.stringify(options?.body),
                }
              : undefined
          ),
          (e) => (e instanceof Error ? e : new Error('Unexpected error', { cause: e }))
        ).andThen((x) =>
          x.ok
            ? ok(x)
            : fromPromise(x.json(), () =>
                fromSafePromise(
                  ApiError.from({
                    status: x.status,
                    title: x.statusText,
                    type: 'https://tools.ietf.org/html/rfc7231#section-6.5.5',
                  })
                ).andThen((x) => err(x))
              )
                .andThen((x) =>
                  fromPromise(ApiError.from(x), () =>
                    fromSafePromise(
                      ApiError.from({
                        status: x.status,
                        title: x.statusText,
                        type: 'https://tools.ietf.org/html/rfc7231#section-6.5.5',
                      })
                    ).andThen((x) => err(x))
                  ).andThen((x) => err(x))
                )
                .mapErr(async (x) =>
                  x instanceof ResultAsync
                    ? x.match(
                        (x) => x,
                        (x) => x
                      )
                    : x
                )
        );
      }



    public post(input: string | URL, option?: RequestApiOptions) {
        return this.fetch(input, {
            ...option,
            method:"POST"
        })
    }
    public get(input: string | URL, option?: RequestApiOptions) {
      return this.fetch(input, {
          ...option,
          method:"GET"
      })
  }
    private static makeHeaders(headers?: HeadersInit): Record<string, string> {
      if (!headers) return {};
      return Array.isArray(headers)
        ? Object.fromEntries(headers)
        : headers instanceof Headers
        ? Object.fromEntries(headers.entries())
        : headers;
    }
  
}


