// пример использования:
/*
            const page = await fetchApi<Page>({
              endpoint: "pages",
              locale: "en",
              query: {
                "filters[slug][$eq]": "home",
                "populate": "*",
              },
              wrappedByKey: "data",
              wrappedByList: true,
              next: {
                revalidate: 60,
                tags: ['page-home'],
              },
            });

 */

interface Props {
  endpoint: string; // путь к Strapi-эндпоинту, например: 'articles' или 'pages/home'
  locale?: string; // локаль, если нужно получить данные на конкретном языке
  query?: Record<string, string>; // параметры запроса, например: { populate: '*', filters[slug][$eq]: 'home' }
  wrappedByKey?: string; // если JSON обёрнут в ключ, например: { data: { ... } }, то можно указать 'data'
  wrappedByList?: boolean; // если в JSON приходит массив и нужно взять только первый элемент
  next?: {
    revalidate?: number | false; // для ISR или no-revalidate в Next.js
    tags?: string[]; // кеш-теги (Next.js 14+)
    cache?: "force-cache" | "no-store" | "default"; // режим кэширования fetch
  };
}

export default async function fetchApi<T>({
  endpoint,
  locale,
  query,
  wrappedByKey,
  wrappedByList,
  next,
}: Props): Promise<T> {
  // Проверяем, что передан endpoint
  if (endpoint.startsWith("/")) {
    endpoint = endpoint.slice(1);
  }

  // Создаём URL для запроса к Strapi
  const url = new URL(
    `${process.env.STRAPI_API_URL ?? "http://localhost:1337"}/api/${endpoint}`,
  );

  // Если передан параметр query, добавляем его в запрос
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  // Если передан параметр locale, добавляем его в запрос
  if (locale) {
    url.searchParams.append("locale", locale);
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_READ_TOKEN}`,
    },
    next,
  });

  // Проверяем, что ответ успешный
  if (!res.ok) throw new Error("Failed to fetch data");

  // Проверяем, что ответ содержит JSON
  let data = await res.json();

  // Если передан параметр wrappedByKey, извлекаем данные из обёртки
  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  // Если передан параметр wrappedByList, извлекаем первый элемент из массива
  if (wrappedByList) {
    data = data[0];
  }

  return data as T;
}
