import { atom, useAtom } from "jotai";

export const snackbarContentAtom = atom<
  { label: string; type: "info" | "error" } | undefined
>(undefined);

export function useSnackbar() {
  const [, openSnackbar] = useAtom(snackbarContentAtom);
  return { openSnackbar };
}
