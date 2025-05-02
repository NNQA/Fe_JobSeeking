export interface TypeResponseSuccess<T> {
    body: T;
    message?: string;
    status?: number;
}