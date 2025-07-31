import { atom } from "jotai";
import type { File } from "../service/storage";

export const editingIdAtom = atom<File["Id"] | undefined>(undefined);
export const selectedFileAtom = atom<File["Id"] | undefined>(undefined);

export type SortOrder = "asc" | "desc";
export type SortKey = keyof Pick<File, "Name" | "CreatedAt" | "Size">;
export const DEFAULT_SORTING_ORDER: SortOrder = "desc" as const;
export const sortByAtom = atom<[SortKey, SortOrder]>([
  "CreatedAt",
  DEFAULT_SORTING_ORDER,
]);
export const sortHasInteractedAtom = atom(false);
