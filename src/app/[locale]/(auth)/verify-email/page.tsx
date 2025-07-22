import FormVerifiCation from "./_component/FormVerifiCation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Retrieve password',
}
export default function Page({
  searchParams
}: {
  searchParams: { [key: string]: string | undefined }

}) {
  const { email } = searchParams;
  console.log(email)
  if (!email) {
    throw Error("Somethings went wrong");
  }
  return (
    <FormVerifiCation
      email={
        decodeURIComponent(email ?? "")
      }
    />
  );
} 
