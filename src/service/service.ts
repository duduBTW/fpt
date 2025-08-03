function newFetch<ApiPath extends string>(baseUrl: string) {
  return (apiPath: ApiPath, options?: RequestInit) => {
    return fetch(`${baseUrl}${apiPath}`, options);
  };
}

type PublicApiPath =
  | "new-folder"
  | `list?path=${string}`
  | "upload"
  | "delete"
  | "rename"
  | "download";

export const publicFetch = newFetch<PublicApiPath>(
  "http://localhost:8080/api/"
);

type PrivateApiPath = "login-code";

export const privateFetch = newFetch<PrivateApiPath>(
  "http://localhost:9090/api/"
);
