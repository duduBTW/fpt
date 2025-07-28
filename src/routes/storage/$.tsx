import styled from "styled-components";
import * as RadixContextMenu from "@radix-ui/react-context-menu";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Table } from "../../components/table";
import { Layout } from "../../components/layout";
import { Breadcrumbs } from "../../components/breadcrumbs";
import React, { useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatSize, useFormatDate } from "../../hooks/format";
import {
  createFileRoute,
  useCanGoBack,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { ContextMenu } from "../../components/context-menu";
import { useAtom } from "jotai";
import { Icon } from "../../components/icon";
import { typography } from "../../typography";
import { HOME_LABEL, useStorageLocation } from "../../hooks/storage";
import {
  deleteFile,
  downloadFile,
  getFiles,
  renameFile,
  uploadFile,
  useNewFolder,
  type File,
} from "../../service/storage";
import { editingIdAtom, selectedFileAtom } from "../../state/storage";

export const Route = createFileRoute("/storage/$")({
  component: RouteComponent,
});

function RouteComponent() {
  const newFolder = useNewFolder();

  return (
    <RadixContextMenu.Root>
      <styles.contextMenuGlobalTrigger>
        <Body />
        <Footer />
      </styles.contextMenuGlobalTrigger>

      <ContextMenu>
        <ContextMenu.Item onClick={newFolder}>New folder</ContextMenu.Item>
      </ContextMenu>
    </RadixContextMenu.Root>
  );
}

function Body() {
  const { path } = useStorageLocation();

  return (
    <Layout>
      <Layout.LeftPart />
      <Layout.Body>
        <Title />
        <Table>
          <Table.Header>
            <Table.HeaderColumn>
              <Table.HeaderColumnText>Name</Table.HeaderColumnText>
              <Icon name="chevron-down" size="small" />
            </Table.HeaderColumn>
            <styles.tableLastChanged>Last changed</styles.tableLastChanged>
            <styles.tableLastSize>Size</styles.tableLastSize>
          </Table.Header>
          <Table.Body>
            <TableBodyContent key={path} />
          </Table.Body>
        </Table>
      </Layout.Body>
      <Layout.RightPart>
        <Input>
          <Input.Icon name="search" />
          <Input.Content placeholder="Search..." />
        </Input>
      </Layout.RightPart>
    </Layout>
  );
}

function TableBodyContent() {
  const { path } = useStorageLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: files,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["files", path],
    queryFn: () => getFiles(path),
  });

  const [editingId] = useAtom(editingIdAtom);
  const [selectedFile, setSelectedFile] = useAtom(selectedFileAtom);
  const formatDate = useFormatDate();

  if (isLoading) {
    return null;
  }

  if (error) {
    return (
      <Table.Item>
        <Table.Empty colSpan={3}>Something went wrong.</Table.Empty>
      </Table.Item>
    );
  }

  if (files === null || typeof files === "undefined" || files.length === 0) {
    return (
      <Table.Item>
        <Table.Empty colSpan={3}>EMPTY FOLDER</Table.Empty>
      </Table.Item>
    );
  }

  const deleteClickHandler = async (deletePath: string, deleteName: string) => {
    await deleteFile(deletePath, deleteName);
    queryClient.refetchQueries({ queryKey: ["files", path] });
  };

  const downloadClickHandler = async (
    downloadPath: string,
    downloadName: string
  ) => {
    await downloadFile(downloadPath, downloadName);
  };

  const rowClickHandler = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    file: File
  ) => {
    const { Name, Id, IsFolder, Path } = file;

    if (e.detail === 1) {
      setSelectedFile(Id);
      return;
    }

    if (IsFolder) {
      navigate({
        to: "./" + Name,
      });
      return;
    }

    downloadClickHandler(Path, Name);
  };

  return (
    <>
      {files.map((file) => {
        const { Name, Size, CreatedAt, Id, IsFolder } = file;

        return (
          <RadixContextMenu.Root key={Id}>
            <RadixContextMenu.Trigger asChild>
              <Table.Item
                selected={selectedFile === Id}
                onClick={(e) => rowClickHandler(e, file)}
                tabIndex={0}
              >
                <styles.nameItemColumn>
                  <Table.ItemColumnIcon name={IsFolder ? "folder" : "file"} />
                  {Id === editingId ? (
                    <NameItemColumnInput Name={Name} file={file} />
                  ) : (
                    <Table.ItemColumnText>{Name}</Table.ItemColumnText>
                  )}
                </styles.nameItemColumn>
                <Table.ItemColumn>
                  <Table.ItemColumnText>
                    {formatDate(CreatedAt)}
                  </Table.ItemColumnText>
                </Table.ItemColumn>
                <Table.ItemColumn>
                  <Table.ItemColumnText>
                    {formatSize(Size)}
                  </Table.ItemColumnText>
                </Table.ItemColumn>
              </Table.Item>
            </RadixContextMenu.Trigger>

            <TableRowContextMenu
              file={file}
              onDownloadClick={downloadClickHandler}
              onDeleteClick={deleteClickHandler}
            />
          </RadixContextMenu.Root>
        );
      })}
    </>
  );
}

function TableRowContextMenu(props: {
  file: File;
  onDownloadClick: (path: File["Path"], name: File["Name"]) => void;
  onDeleteClick: (path: File["Path"], name: File["Name"]) => void;
}) {
  const {
    file: { Name, Id, Path },
    onDownloadClick,
    onDeleteClick,
  } = props;
  const [, setEditingId] = useAtom(editingIdAtom);

  return (
    <ContextMenu>
      <ContextMenu.Item
        onClick={() => {
          onDownloadClick(Path, Name);
        }}
      >
        <Icon name="download" size="base" />
        Download
      </ContextMenu.Item>
      <ContextMenu.Item
        onClick={() => {
          setEditingId(Id);
        }}
      >
        <Icon name="edit" size="base" />
        Rename
      </ContextMenu.Item>
      <ContextMenu.Item onClick={() => onDeleteClick(Path, Name)}>
        <Icon name="trash-2" size="base" />
        Delete
      </ContextMenu.Item>
    </ContextMenu>
  );
}

function NameItemColumnInput(props: { Name: string; file: File }) {
  const { Name, file } = props;
  const { path } = useStorageLocation();
  const queryClient = useQueryClient();
  const editingInputRef = useRef<HTMLInputElement>(null);
  const [, setEditingId] = useAtom(editingIdAtom);

  useEffect(() => {
    setTimeout(() => {
      editingInputRef.current?.focus();
      editingInputRef.current?.select();
    }, 10);
  }, []);

  const rename = async (value: string, file: File) => {
    await renameFile(String(file.Id), file.Path, file.Name, value);
    await queryClient.refetchQueries({ queryKey: ["files", path] });
    setEditingId(undefined);
  };

  return (
    <styles.nameItemColumnInput
      onClick={(e) => e.stopPropagation()}
      defaultValue={Name}
      ref={editingInputRef}
      onKeyDown={(e) => {
        if (e.key !== "Enter") {
          return;
        }

        rename((e.target as HTMLInputElement).value, file);
      }}
      onBlur={(e) => rename(e.target.value, file)}
    />
  );
}

function Title() {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const { label, path } = useStorageLocation();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileUpClickHandler = () => {
    fileInputRef.current?.click();
  };

  const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    await uploadFile(path, file);
    queryClient.refetchQueries({ queryKey: ["files", path] });
  };

  const newFolderClickHandler = useNewFolder();

  return (
    <styles.title>
      <Button
        disabled={!canGoBack}
        onClick={() => router.history.back()}
        variant="secondary"
        size="small"
      >
        <Button.Icon name="chevron-left" />
      </Button>
      <Button
        onClick={() => router.history.forward()}
        variant="secondary"
        size="small"
      >
        <Button.Icon name="chevron-right" />
      </Button>
      <styles.titleText>{label}</styles.titleText>
      <input
        onChange={fileChangeHandler}
        ref={fileInputRef}
        type="file"
        hidden
      />
      <Button onClick={fileUpClickHandler} variant="secondary" size="small">
        <Button.Icon name="file-up" />
      </Button>
      <Button onClick={newFolderClickHandler} variant="secondary" size="small">
        <Button.Icon name="folder-plus" />
      </Button>
    </styles.title>
  );
}

function Footer() {
  const { divided } = useStorageLocation();
  const navigate = useNavigate();

  let accPath = "/";
  return (
    <styles.footer>
      <Breadcrumbs>
        <Breadcrumbs.Item onClick={() => navigate({ to: ".." })}>
          <Breadcrumbs.ItemIcon name="home" />
          <Breadcrumbs.ItemText>{HOME_LABEL}</Breadcrumbs.ItemText>
        </Breadcrumbs.Item>

        {divided?.map((location) => {
          accPath += `/${location}`;

          return (
            <React.Fragment key={location}>
              <Breadcrumbs.Divider />
              <Breadcrumbs.Item
                onClick={() => {
                  navigate({ to: `..${accPath}` });
                }}
              >
                <Breadcrumbs.ItemIcon name="folder" />
                <Breadcrumbs.ItemText>{location}</Breadcrumbs.ItemText>
              </Breadcrumbs.Item>
            </React.Fragment>
          );
        })}
      </Breadcrumbs>
    </styles.footer>
  );
}

const styles = {
  contextMenuGlobalTrigger: styled(RadixContextMenu.Trigger)`
    flex: 1;
    display: flex;
    flex-direction: column;
  `,

  // Title
  title: styled.div`
    display: flex;

    gap: var(--spacing-2);
  `,
  titleText: styled.h1`
    flex: 1;
    padding: 0px;
    margin: 0px;
    text-align: center;

    ${typography.title};
  `,

  // Table
  tableLastChanged: styled(Table.HeaderColumn)`
    width: var(--storage-table-last-changed-width);
  `,
  tableLastSize: styled(Table.HeaderColumn)`
    width: var(--storage-table-size-width);
  `,
  nameItemColumn: styled(Table.ItemColumn)`
    display: flex;
  `,
  nameItemColumnInput: styled(Table.ItemColumnInput)`
    flex: 1;
  `,

  // Footer
  footer: styled.footer`
    display: flex;
    margin-left: auto;
    margin-right: auto;

    width: var(--t2-container-width-md);
    background-color: var(--colors-light);
  `,

  // Layout Wrappers
  app: styled.div`
    height: 100vh;
    display: flex;
  `,
  container: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
  `,
} as const;
