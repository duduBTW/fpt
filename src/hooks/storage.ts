import { Route } from "../routes/app/storage/$";

export const HOME_LABEL = "Home";
export function useStorageLocation() {
  const { _splat } = Route.useParams();
  const isHome = typeof _splat === "undefined" || _splat === "";
  const divided = isHome ? [] : _splat.split("/");
  const label = isHome ? HOME_LABEL : divided[divided.length - 1];
  const path = isHome ? "/" : _splat;

  return {
    path,
    divided,
    label,
  };
}
