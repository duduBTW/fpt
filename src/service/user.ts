import { privateFetch } from "./service";

type LoginToken = {
  Id: number;
  RandomId: string;
  CreatedAt: string;
  UpdatedAt: string;
};

export type UserDto = {
  Id: number;
  Name: string;
  ProfilePicture: string;
  CreatedAt: string;
  UpdatedAt: string;
  Codes?: AuthCodeDto[];
};
export type AuthCodeDto = {
  Id: number;
  UserId: number;
  Code: string;
  CreatedAt: string;
};

export async function getLoginToken() {
  const res = await privateFetch("login-code");
  return (await res.json()) as LoginToken;
}

export async function getUsers() {
  const res = await privateFetch("users");
  return (await res.json()) as UserDto[];
}

export async function getUser(id: string) {
  const res = await privateFetch(`user?id=${id}`);
  return (await res.json()) as UserDto;
}

export async function deleteUserCode(id: number) {
  const res = await privateFetch(`delete-code?id=${id}`);
  return await res.text();
}

export async function addUserCode(userId: number) {
  const res = await privateFetch(`add-code?userId=${userId}`);
  return await res.text();
}

export async function updateUserStorageLocation(
  storageLocation: string,
  userId: number
) {
  const formData = new FormData();
  formData.append("storageLocation", storageLocation);
  formData.append("userId", String(userId));

  const res = await privateFetch(`user-update-storage-location`, {
    method: "formData",
    body: formData,
  });
  return await res.text();
}
