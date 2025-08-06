import { Layout } from "@components/layout";
import { Table } from "@components/table";
import { Title } from "@components/title";
import { useFormatDate } from "@hooks/format";
import {
  addUserCode,
  deleteUserCode,
  getUser,
  type AuthCodeDto,
} from "@service/user";
import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useState } from "react";
import * as RadixContextMenu from "@radix-ui/react-context-menu";
import { ContextMenu } from "@components/context-menu";
import { Icon } from "@components/icon";
import { Button } from "@components/button";
import { useMutation } from "@tanstack/react-query";
import { Footer } from "@components/footer";
import { useIsRootWebDesign } from "@hooks/root";
import { Breadcrumbs } from "@components/breadcrumbs";
import { Avatar } from "@components/avatar";
import { getAsset } from "@service/asset";

export const Route = createFileRoute("/app/user/$userId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return getUser(params.userId);
  },
});

function RouteComponent() {
  const user = Route.useLoaderData();
  const router = useRouter();
  const { mutate: onAddUserCode, isPending: isAddingUserCode } = useMutation({
    mutationFn: () => addUserCode(user.Id),
    onSuccess: () => {
      router.invalidate();
    },
  });
  // const { mutate } = useMutation({
  //   mutationFn: (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files?.[0];
  //     if (!file) {
  //       return;
  //     }

  //     updateUserStorageLocation(file.name);
  //   },
  // });

  return (
    <>
      <button
        onClick={async () => {
          const folderHandle = await window.showDirectoryPicker();
          console.log(folderHandle.name); // ✅ This gives you the folder name!
        }}
      >
        aa
      </button>
      <Layout>
        <Layout.LeftPart />
        <Layout.Body>
          <Title>
            <Title.Navigation />
            <Title.Text>{user.Name}</Title.Text>
            <Button
              size="small"
              variant="secondary"
              onClick={() => onAddUserCode()}
              disabled={isAddingUserCode}
            >
              <Button.Icon name="plus" />
            </Button>
          </Title>
          <CodeTable />
        </Layout.Body>
        <Layout.RightPart />
      </Layout>
      <UserFooter />
    </>
  );
}

function CodeTable() {
  const { Codes } = Route.useLoaderData();
  const formatDate = useFormatDate();
  const [showCodeMap, setShowCodeMap] = useState<
    Record<AuthCodeDto["Id"], boolean>
  >({});

  if (!Codes) {
    return null;
  }

  const censorCode = (code: string) => {
    return Array.from({ length: code.length })
      .map(() => "*")
      .join("");
  };

  return (
    <Table>
      <Table.Header>
        <Table.HeaderColumn>
          <Table.HeaderColumnText>Code</Table.HeaderColumnText>
        </Table.HeaderColumn>
        <Table.HeaderColumn>
          <Table.HeaderColumnText>Created At</Table.HeaderColumnText>
        </Table.HeaderColumn>
      </Table.Header>
      <Table.Body>
        {Codes.map((code) => {
          const { Id, Code, CreatedAt } = code;
          const showCode = showCodeMap[Id];
          return (
            <RadixContextMenu.Root key={Id}>
              <RadixContextMenu.Trigger asChild>
                <Table.Item>
                  <Table.ItemColumn>
                    <Table.ItemColumnIcon
                      name={showCode ? "eye" : "eye-closed"}
                      onClick={() =>
                        setShowCodeMap((s) => ({
                          ...s,
                          [Id]: !showCode,
                        }))
                      }
                    />
                    <Table.ItemColumnText>
                      {showCode ? Code : censorCode(Code)}
                    </Table.ItemColumnText>
                  </Table.ItemColumn>
                  <Table.ItemColumn>{formatDate(CreatedAt)}</Table.ItemColumn>
                </Table.Item>
              </RadixContextMenu.Trigger>

              <TableRowContextMenu code={code} />
            </RadixContextMenu.Root>
          );
        })}
      </Table.Body>
    </Table>
  );
}

function TableRowContextMenu(props: { code: AuthCodeDto }) {
  const {
    code: { Code, Id },
  } = props;
  const { mutate: onDeleteClick, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteUserCode(Id),
    onSuccess: () => {
      router.invalidate();
    },
  });
  const router = useRouter();

  const handleCopy = () => {
    navigator.clipboard.writeText(Code);
  };

  return (
    <ContextMenu>
      <ContextMenu.Item onClick={handleCopy}>
        <Icon name="copy" size="base" />
        Copy
      </ContextMenu.Item>
      <ContextMenu.Item
        onClick={() => {
          if (isDeleting) {
            return;
          }

          onDeleteClick();
        }}
      >
        <Icon name="trash-2" size="base" />
        Delete
      </ContextMenu.Item>
    </ContextMenu>
  );
}

function UserFooter() {
  const { Name, ProfilePicture } = Route.useLoaderData();
  const navigate = useNavigate();
  const isRootWebDesign = useIsRootWebDesign();

  return (
    <Footer colorType={isRootWebDesign ? "accent" : "transparent"}>
      <Breadcrumbs>
        <Breadcrumbs.Item onClick={() => navigate({ to: "/app/users" })}>
          <Breadcrumbs.ItemIcon name="user" />
          <Breadcrumbs.ItemText>Users</Breadcrumbs.ItemText>
        </Breadcrumbs.Item>
        <Breadcrumbs.Divider />
        <Breadcrumbs.Item>
          <Avatar size="extra-small" src={getAsset(ProfilePicture)} />
          <Breadcrumbs.ItemText>{Name}</Breadcrumbs.ItemText>
        </Breadcrumbs.Item>
      </Breadcrumbs>
    </Footer>
  );
}
