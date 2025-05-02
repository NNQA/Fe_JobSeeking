import { JobCategory } from "@/lib/models/Categories";
import { TypeResponseSuccess } from "@/lib/models/TypeResponseSuccess";
import { ApiClient } from "@/lib/service/api-client.server";

export type JobCategoryResponse = TypeResponseSuccess<JobCategory>;
export type JobCategoriesResponse = TypeResponseSuccess<JobCategory[]>;

export class CategoriesActionFetching {
  static async getCategories() {
    const api = ApiClient.instance;
    const response = await api.get("/api/clientController/list-categories-with-field", {
      next: {
        tags: ["categories"],
        revalidate: 10
      },
    });
    if (response.isOk()) {
      const data = await response.value.json() as JobCategoriesResponse;
      return data.body;
    }
    return [] as JobCategory[];
  }
}
