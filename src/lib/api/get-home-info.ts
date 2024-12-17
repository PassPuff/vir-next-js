import type Main from "@/interfaces/main";
import fetchApi from "@/lib/api/strapi";

export async function getHomeInfo(locale: string) {
  return await fetchApi<Main>({
    endpoint: "main",
    query: {
      "fields[0]": "title",
      "fields[1]": "description",
      "fields[2]": "locale",
      "populate[image][fields][0]": "url",
    },
    locale,
    wrappedByKey: "data",
  });
}
