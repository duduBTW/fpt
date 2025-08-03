import { privateFetch } from "./service";

type LoginToken = {
  Id: number;
  RandomId: string;
  CreatedAt: string;
  UpdatedAt: string;
};

export async function getLoginToken() {
  const res = await privateFetch("login-code");
  return (await res.json()) as LoginToken;
}
