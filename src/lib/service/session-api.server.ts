import { ApiClient, ApiResponse, RequestApiOptions } from "./api-client.server";
import { ResultAsync, err } from "neverthrow";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";


export class SessionApi extends ApiClient {
    protected static _baseUrl: string | undefined = process.env.NEXT_PUBLIC_API_BASE_URL_Server;
    
    private constructor(private readonly _cookie: ReadonlyRequestCookies) {
        super(SessionApi._baseUrl!);
    }

    protected fetch(input: string | URL, options?: RequestApiOptions): ResultAsync<ApiResponse, Error> {
        return super.fetch(
            input,
            {
                ...options,
                headers : {
                    ...options?.headers,
                    Authorization :  `Bearer ${this._cookie.get('accessToken')?.value}`,
                }
            }
        ).orElse((x) => {
            return err(x);
      });
    }
    public static from(cookie: ReadonlyRequestCookies): SessionApi {
        return new SessionApi(cookie)
    }
}