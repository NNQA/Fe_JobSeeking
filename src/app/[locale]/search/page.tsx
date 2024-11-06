import Navigation from "@/components/Navigation";
import { User } from "@/lib/models/User";
import { SessionApi } from "@/lib/service/session-api.server";
import { cookies } from "next/headers";
import { ApiClient } from "@/lib/service/api-client.server";
import { date } from "zod";
import SectionSearch from "./_component/SectionSearch";
interface PageProp {
  searchParams: { [key: string]: string };
}
const getData = async () => {
  if (cookies().get("accessToken")) {
    console.log(cookies().get("accessToken"));
    const api = SessionApi.from(cookies());

    const response = await api.get("/api/user/getCurrentUser");

    if (response.isOk()) {
      const user = (await response.value.json()) as User;
      return user;
    }
  }
  return null;
};
const getCateAndAddress = async () => {
  try {
    const [cate, provinceName] = await Promise.all([
      fetch("http://172.23.192.1:8080/api/clientController/getCategoryName", {
        method: "GET",
      }),
      fetch("http://172.23.192.1:8080/api/clientController/getAddressClient", {
        method: "GET",
      }),
    ]);
    if (!cate && !provinceName)
      return {
        cate: [],
        provineName: [],
      };
    return {
      cate: (await cate.json()) as string[],
      provinceName: (await provinceName.json()) as string[],
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      cate: [],
      provineName: [],
    };
  }
};

async function Home({ searchParams }: PageProp) {
  const user = await getData();
  const data = await getCateAndAddress();

  return (
    <div>
      <Navigation user={user ?? undefined}></Navigation>
      <SectionSearch cate={data.cate} provinceName={data.provinceName!} />
    </div>
  );
}

export default Home;
