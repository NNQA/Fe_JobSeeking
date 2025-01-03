import { ReadonlyURLSearchParams } from "next/navigation";
import { useMemo } from "react";

export const formatParamsWithUseSearchParamsForSearching = (
  searchParams: ReadonlyURLSearchParams
) =>
  useMemo(() => {
    const params = Object.fromEntries(searchParams.entries());
    return Object.keys(params).length
      ? Object.entries(params)
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join("&")
      : "";
  }, [searchParams]);

export function formateParams(searchParams: { [key: string]: string }) {
  const params = Object.entries(searchParams)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
  return params;
}
