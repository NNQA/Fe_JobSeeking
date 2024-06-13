import Navigation from "@/components/Navigation";
import { toActionErrorsAsync } from "@/lib/error.server";
import { User } from "@/lib/models/User";
import { SessionApi } from "@/lib/service/session-api.server";
import { cookies } from "next/headers";

const getData = async () => {
  if (cookies().get("accessToken")) {
    console.log(cookies().get("accessToken"));
    const api = SessionApi.from(cookies());

    const response = await api.get("/api/user/getCurrentUser");

    if (response.isOk()) {
      const user = (await response.value.json()) as User;
      console.log(user);
      return user;
    }
  }
  return null;
};
async function Home() {
  const user = await getData();
  return (
    <div>
      <Navigation user={user ?? undefined}></Navigation>
    </div>
  );
}

export default Home;
