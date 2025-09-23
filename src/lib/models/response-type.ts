export interface TypeResponseSuccess<T> {
  body: T;
  message?: string;
  status?: number;
  success?: boolean;
}
export interface TypeResponseError {
  success: false;
  error: string;
  status?: number;
}
export type TypeServerReponse<T> = TypeResponseSuccess<T> | TypeResponseError;



