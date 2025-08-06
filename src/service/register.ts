import { publicFetch } from "./service";

export type RegisterDto = {
  name: string;
  code: string;
  file?: File;
};

export async function registerUser({ code, file, name }: RegisterDto) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("code", code);
  if (file) {
    formData.append("file", file);
  }

  return publicFetch("register", {
    method: "POST",
    body: formData,
  });
}
