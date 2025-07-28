import { atom } from "jotai";
import type { File } from "../service/storage";

export const editingIdAtom = atom<File["Id"] | undefined>(undefined);
export const selectedFileAtom = atom<File["Id"] | undefined>(undefined);
