const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "https://scardigno-strapi.ndorzn.easypanel.host";

const isServer = typeof window === "undefined";
const SERVER_ENDPOINT = `${STRAPI_URL.replace(/\/$/, "")}/mynextjs`;
const CLIENT_ENDPOINT = "/api/strapi/posts";

async function fetchJson(url, init) {
  const response = await fetch(url, init);

  if (!response.ok) {
    let message = `Error ${response.status}: ${response.statusText || "Unknown error"}`;

    try {
      const errorBody = await response.json();

      if (
        typeof errorBody === "object" &&
        errorBody !== null &&
        "error" in errorBody &&
        typeof errorBody.error === "string"
      ) {
        message = errorBody.error;
      }
    } catch {
      // mantener mensaje por defecto si la respuesta no es JSON
    }

    throw new Error(message);
  }

  return response.json();
}

export async function getPosts() {
  const endpoint = isServer ? SERVER_ENDPOINT : CLIENT_ENDPOINT;

  const fetchOptions = isServer
    ? {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        next: { revalidate: 60 },
      }
    : {
        headers: {
          "Content-Type": "application/json",
        },
      };

  try {
    return await fetchJson(endpoint, fetchOptions);
  } catch (error) {
    if (!isServer && endpoint === CLIENT_ENDPOINT) {
      try {
        return await fetchJson(SERVER_ENDPOINT, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (fallbackError) {
        if (fallbackError instanceof Error) {
          throw fallbackError;
        }
      }
    }

    if (error instanceof Error && isServer) {
      console.error("Error fetching posts:", error.message);
    }

    throw error;
  }
}
