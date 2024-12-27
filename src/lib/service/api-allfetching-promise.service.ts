import { Work } from "../models/Work";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL_Server || "http://172.23.192.1:8080";

export class ApiServicePromiseFetching {
  static async fetchingHomePageData(): Promise<HomePageData> {
    try {
      const endPoints = [
        "api/clientController/getCategoryName",
        "api/clientController/getAddressClient",
        "api/clientController/getListJobHomePage",
      ].map((endPoint) => `${API_BASE_URL}/${endPoint}`);

      const [cateRes, provinceRes, jobListRes] = await Promise.all(
        endPoints.map((url) =>
          fetch(url, { method: "GET" }).then((res) => {
            if (!res.ok) throw new Error(`Failed to fetch ${url}`);
            return res;
          })
        )
      );

      return {
        cate: (await cateRes.json()) as string[],
        provinceName: (await provinceRes.json()) as string[],
        jobList: (await jobListRes.json()) as Work[],
      };
    } catch (error) {
      console.error("Error fetching homepage data:", error);
      return { cate: [], provinceName: [], jobList: [] };
    }
  }

  static async fetchingSearchingPage(): Promise<SearchPage> {
    try {
      const endPoints = [
        "api/clientController/getCategoryName",
        "api/clientController/getAddressClient",
        "api/clientController/getPositionName",
      ].map((endPoint) => `${API_BASE_URL}/${endPoint}`);
      const [cateRes, provinceRes, positionRes] = await Promise.all(
        endPoints.map((url) =>
          fetch(url, {
            method: "GET",
            next: { tags: ["job"], revalidate: 3600 },
          }).then((res) => {
            if (!res.ok) throw new Error(`Failed to fetch ${url}`);
            return res;
          })
        )
      );
      return {
        cate: (await cateRes.json()) as string[],
        provinceName: (await provinceRes.json()) as string[],
        position: (await positionRes.json()) as string[],
      };
    } catch (error) {
      console.error("Error fetching searching page data:", error);
      return { cate: [], provinceName: [], position: [] };
    }
  }
}
