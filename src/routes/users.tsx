import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "../components/layout";
import { Title } from "../components/title";
import { Button } from "../components/button";
import { Table } from "../components/table";

export const Route = createFileRoute("/users")({
  component: RouteComponent,
});

type User = {
  name: string;
  profilePicture: string;
};

const users: User[] = [
  {
    name: "duduBTW",
    profilePicture:
      "https://pbs.twimg.com/profile_images/1620171210352128000/sOhJS_q8_400x400.jpg",
  },
  {
    name: "saba",
    profilePicture:
      "https://pbs.twimg.com/profile_images/1939105308497854464/luA8qu03_400x400.jpg",
  },
  {
    name: "LERUDEL",
    profilePicture:
      "https://pbs.twimg.com/profile_images/1937535378627731456/U80_hQE4_400x400.jpg",
  },
];

function RouteComponent() {
  return (
    <Layout>
      <Layout.LeftPart />
      <Layout.Body>
        <Title>
          <Title.Navigation />
          <Title.Text>Users</Title.Text>
          <Button variant="secondary" size="small">
            <Button.Icon name="user-plus" />
          </Button>
        </Title>

        <Table>
          <Table.Header>
            <Table.HeaderColumn>
              <Table.HeaderColumnText>Name</Table.HeaderColumnText>
            </Table.HeaderColumn>
            <Table.HeaderColumn>
              <Table.HeaderColumnText>Last online</Table.HeaderColumnText>
            </Table.HeaderColumn>
            <Table.HeaderColumn>
              <Table.HeaderColumnText>Space</Table.HeaderColumnText>
            </Table.HeaderColumn>
          </Table.Header>
          <Table.Body>
            {users.map(({ name, profilePicture }) => (
              <Table.Item>
                <Table.ItemColumn>
                  <Table.ItemColumnAvatar src={profilePicture} />
                  <Table.ItemColumnText>{name}</Table.ItemColumnText>
                </Table.ItemColumn>
                <Table.ItemColumn>01/01/2001</Table.ItemColumn>
                <Table.ItemColumn>100mb</Table.ItemColumn>
              </Table.Item>
            ))}
          </Table.Body>
        </Table>
      </Layout.Body>
      <Layout.RightPart />
    </Layout>
  );
}
