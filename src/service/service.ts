function getHeaders(options?: RequestInit) {
  const headers = options?.headers ?? {};
  const userToken = localStorage.getItem("userToken");
  if (!userToken) {
    return headers;
  }

  return {
    ...headers,
    Authorization: `Bearer ${userToken}`,
  };
}

function newFetch<ApiPath extends string>(baseUrl: string) {
  return (apiPath: ApiPath, options?: RequestInit) => {
    return fetch(`${baseUrl}${apiPath}`, {
      ...options,
      headers: getHeaders(options),
    });
  };
}

type PublicApiPath =
  | "register"
  | "new-folder"
  | `list?path=${string}`
  | "upload"
  | "delete"
  | "rename"
  | "download";

export const PUBLIC_BASE_URL = "http://localhost:8080/" as const;
export const publicFetch = newFetch<PublicApiPath>(`${PUBLIC_BASE_URL}api/`);

type PrivateApiPath =
  | "login-code"
  | "users"
  | `user?id=${string}`
  | `delete-code?id=${string}`
  | `add-code?userId=${string}`
  | `user-update-storage-location`;

export const privateFetch = newFetch<PrivateApiPath>(
  "http://localhost:9090/api/"
);
