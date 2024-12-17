interface Props {
  endpoint: string;
  locale?: string;
  query?: Record<string, string>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
}

export default async function fetchApi<T>({
  endpoint,
  query,
  locale,
  wrappedByKey,
  wrappedByList,
}: Props): Promise<T> {
  if (endpoint.startsWith("/")) {
    endpoint = endpoint.slice(1);
  }

  const url = new URL(
    `${process.env.STRAPI_API_URL ?? "http://localhost:1337"}/api/${endpoint}`,
  );

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
  });

  if (!res.ok) throw new Error("Failed to fetch data");

  let data = await res.json();

  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  if (wrappedByList) {
    data = data[0];
  }

  return data as T;
}
