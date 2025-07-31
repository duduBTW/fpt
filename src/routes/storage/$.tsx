import styled from "styled-components";
import * as RadixContextMenu from "@radix-ui/react-context-menu";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Table } from "../../components/table";
import { Layout } from "../../components/layout";
import { Breadcrumbs } from "../../components/breadcrumbs";
import React, { useEffect, useMemo, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatSize, useFormatDate } from "../../hooks/format";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ContextMenu } from "../../components/context-menu";
import { useAtom } from "jotai";
import { Icon } from "../../components/icon";
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
import {
  DEFAULT_SORTING_ORDER,
  editingIdAtom,
  selectedFileAtom,
  sortByAtom,
  sortHasInteractedAtom,
  type SortKey,
} from "../../state/storage";
import { useBreakpoint, useViewPort } from "../../hooks/viewport";
import { useIsRootWebDesign } from "../../hooks/root";
import { Title } from "../../components/title";

export const Route = createFileRoute("/storage/$")({
  component: RouteComponent,
});

function useShowInput() {
  const viewPort = useViewPort();
  const breakpoint = useBreakpoint();
  return viewPort === "web" && breakpoint.is(["lg"]);
}

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
  const showInput = useShowInput();
  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const [sortHasInteracted, setSortHasInteracted] = useAtom(
    sortHasInteractedAtom
  );

  const getNewOrder = (field: SortKey) => {
    const [selectedField, order] = sortBy;
    if (selectedField === field) {
      return order === "asc" ? "desc" : "asc";
    }

    return DEFAULT_SORTING_ORDER;
  };

  const handleHeaderClick = (field: SortKey) => () => {
    setSortHasInteracted(true);
    setSortBy([field, getNewOrder(field)]);
  };

  const getChevron = (field: SortKey) => {
    const [selectedField, order] = sortBy;
    if (!sortHasInteracted || selectedField !== field) {
      return null;
    }

    return (
      <Table.HeaderColumnIcon
        name={order === "asc" ? "chevron-down" : "chevron-up"}
      />
    );
  };

  return (
    <Layout>
      <Layout.LeftPart />
      <Layout.Body>
        <StorageTitle />
        <Table>
          <Table.Header>
            <Table.HeaderColumn onClick={handleHeaderClick("Name")}>
              <Table.HeaderColumnText>Name</Table.HeaderColumnText>
              {getChevron("Name")}
            </Table.HeaderColumn>
            <styles.tableLastChanged onClick={handleHeaderClick("CreatedAt")}>
              <Table.HeaderColumnText>Last changed</Table.HeaderColumnText>
              {getChevron("CreatedAt")}
            </styles.tableLastChanged>
            <styles.tableLastSize onClick={handleHeaderClick("Size")}>
              <Table.HeaderColumnText>Size</Table.HeaderColumnText>
              {getChevron("Size")}
            </styles.tableLastSize>
          </Table.Header>
          <Table.Body>
            <TableBodyContent key={path} />
          </Table.Body>
        </Table>
      </Layout.Body>
      <Layout.RightPart>
        {showInput ? (
          <styles.searchInputContainer>
            <styles.searchInput>
              <Input.Icon name="search" />
              <Input.Content placeholder="Search..." />
            </styles.searchInput>
          </styles.searchInputContainer>
        ) : null}
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
  const [sortBy] = useAtom(sortByAtom);

  const sortedFiles = useMemo(() => {
    const [selectedField, order] = sortBy;
    if (typeof files === "undefined" || files === null) {
      return [];
    }

    const sortFile = (a: File, b: File) => {
      switch (selectedField) {
        case "CreatedAt":
          return (
            new Date(a.CreatedAt).getTime() - new Date(b.CreatedAt).getTime()
          );
        case "Name":
          return a.Name.localeCompare(b.Name, undefined, {
            sensitivity: "base",
          });
        case "Size":
          return a.Size - b.Size;
        default:
          throw new Error("");
      }
    };

    return files.sort((a, b) => {
      switch (order) {
        case "asc":
          return sortFile(a, b);
        case "desc":
          return sortFile(b, a);
        default:
          throw new Error("");
      }
    });
  }, [sortBy, files]);

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
      {sortedFiles.map((file) => {
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
    if (file.Name === value) {
      // nothign changed
      setEditingId(undefined);
      return;
    }

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

function StorageTitle() {
  const showInput = useShowInput();
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
    <Title>
      <Title.Navigation />
      <Title.Text>{label}</Title.Text>
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
      {!showInput ? (
        <Button variant="secondary" size="small">
          <Button.Icon name="search" />
        </Button>
      ) : null}
    </Title>
  );
}

function Footer() {
  const { divided } = useStorageLocation();
  const navigate = useNavigate();
  const isRootWebDesign = useIsRootWebDesign();

  let accPath = "/";
  return (
    <styles.footer data-color-type={isRootWebDesign ? "accent" : "transparent"}>
      <styles.footerContent>
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
      </styles.footerContent>
    </styles.footer>
  );
}

const styles = {
  contextMenuGlobalTrigger: styled(RadixContextMenu.Trigger)`
    flex: 1;
    display: flex;
    flex-direction: column;
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
    justify-content: center;

    &[data-color-type="accent"] {
      background-color: var(--storage-breadcrumbs-colors-accent);
    }
    &[data-color-type="transparent"] {
      background-color: var(--storage-breadcrumbs-colors-transparent);
    }
  `,
  footerContent: styled.div`
    display: flex;
    width: 100%;

    max-width: var(--storage-breadcrumbs-spacing-max-width);
    padding-inline: var(--t2-content-horizontal);
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
  searchInputContainer: styled.div`
    padding-inline: var(--storage-search-input-spacing-horizontal);
    padding-block: var(--storage-search-input-spacing-vertical);
  `,
  searchInput: styled(Input)`
    max-width: var(--storage-search-input-spacing-max-width);
  `,
} as const;
