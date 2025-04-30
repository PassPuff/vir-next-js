import { authToken, BASE_URL } from "../../config";

type NextFetchRequestConfig = {
  revalidate?: number | false;
  tags?: string[];
};

interface FetchAPIOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  // authToken?: string;
  body?: Record<string, unknown>;
  next?: NextFetchRequestConfig;
}

export async function fetchAPI(endpoint: string, options: FetchAPIOptions) {
  const { method, body, next } = options;

  const baseUrl = BASE_URL;
  const url = baseUrl ? new URL(endpoint, baseUrl).href : endpoint; // Используем baseUrl, если он задан

  const headers: RequestInit & { next?: NextFetchRequestConfig } = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
    ...(next && { next }),
  };

  try {
    const response = await fetch(url, headers);
    const contentType = response.headers.get("content-type");
    if (
      contentType &&
      contentType.includes("application/json") &&
      response.ok
    ) {
      return await response.json();
    } else {
      return { status: response.status, statusText: response.statusText };
    }
  } catch (error) {
    console.error(`Error ${method} data:`, error);
    // return {
    //   error: true,
    //   status: (error.response && error.response.status) || 500, // Try to get status from the response if available
    //   message: error.message || "Network error", //  Provide a default error message if none exists
    // };
  }
}
