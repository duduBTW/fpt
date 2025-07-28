import { useQueryClient } from "@tanstack/react-query";
import { useStorageLocation } from "../hooks/storage";
import { useAtom } from "jotai";
import { editingIdAtom } from "../state/storage";
import { pFetch } from "./service";

export type File = {
  Id: number;
  Name: string;
  Path: string;
  IsFolder: boolean;
  Size: number;
  CreatedAt: string;
  UpdatedAt: string;
};

export function useNewFolder() {
  const { path } = useStorageLocation();
  const queryClient = useQueryClient();
  const [, setEditingId] = useAtom(editingIdAtom);

  return async () => {
    const formData = new FormData();
    formData.append("path", path);

    const res = await pFetch("new-folder", {
      method: "POST",
      body: formData,
    });

    queryClient.refetchQueries({ queryKey: ["files", path] });
    setEditingId(((await res.json()) as File).Id);
  };
}

export async function getFiles(path: string) {
  const res = await pFetch(`list?path=${path}`);
  return (await res.json()) as File[];
}

export async function uploadFile(path: string, file: globalThis.File) {
  const formData = new FormData();
  formData.append("path", path);
  formData.append("file", file);

  return pFetch("upload", {
    method: "POST",
    body: formData,
  });
}

export async function deleteFile(path: string, name: string) {
  const formData = new FormData();
  formData.append("path", path);
  formData.append("name", name);

  await pFetch("delete", {
    method: "POST",
    body: formData,
  });
}

export async function downloadFile(path: string, name: string) {
  const formData = new FormData();
  formData.append("path", path);
  formData.append("name", name);

  return pFetch("download", {
    method: "POST",
    body: formData,
  });
}

export async function renameFile(
  id: string,
  path: string,
  oldName: string,
  newName: string
) {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("path", path);
  formData.append("oldName", oldName);
  formData.append("newName", newName);

  return pFetch("rename", {
    method: "POST",
    body: formData,
  });
}
