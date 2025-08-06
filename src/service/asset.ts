import { PUBLIC_BASE_URL } from "./service";

export function getAsset(name: string) {
  return `${PUBLIC_BASE_URL}assets/${name}`;
}
