type ApiPath = "new-folder" | `list?path=${string}` | "upload" | "delete" | "rename" | "download";

const baseUrl = "http://localhost:8080/api/" as const
export function pFetch(apiPath: ApiPath, options?: RequestInit) {
  return fetch(`${baseUrl}${apiPath}`, options);
}
