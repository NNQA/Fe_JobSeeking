
import FormLogin from "./_component/FormLogin";

async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function Page() {
  await wait(2000);
  return (
    <FormLogin />
  );
}
