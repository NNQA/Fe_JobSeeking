"use client";
import { useRouter } from "next/navigation";
import { setCookie } from "./actions";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  setCookie({
    accessToken: searchParams?.accessToken! as string,
    refreshToken: searchParams?.refreshToken! as string,
  }).then((r) => {
    router.push("/");
  });
  return (
    <div className="grid place-content-center h-screen w-full">
      Handle Login.....
    </div>
  );
}
