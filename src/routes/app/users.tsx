import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Layout } from "@components/layout";
import { Title } from "@components/title";
import { Button } from "@components/button";
import { Table } from "@components/table";
import styled from "styled-components";
import { typography } from "../../typography";
import { useQuery } from "@tanstack/react-query";
import { getLoginToken, getUsers } from "@service/user";
import { useEffect, useMemo, useState } from "react";
import { differenceInSeconds, isValid } from "date-fns";
import { ProgressBar } from "@components/progress-bar";
import { getAsset } from "@service/asset";

export const Route = createFileRoute("/app/users")({
  component: RouteComponent,
});

type User = {
  name: string;
  profilePicture: string;
};

// const users: User[] = [
//   {
//     name: "duduBTW",
//     profilePicture:
//       "https://pbs.twimg.com/profile_images/1620171210352128000/sOhJS_q8_400x400.jpg",
//   },
//   {
//     name: "saba",
//     profilePicture:
//       "https://pbs.twimg.com/profile_images/1939105308497854464/luA8qu03_400x400.jpg",
//   },
//   {
//     name: "LERUDEL",
//     profilePicture:
//       "https://pbs.twimg.com/profile_images/1937535378627731456/U80_hQE4_400x400.jpg",
//   },
// ];

function RouteComponent() {
  return (
    <Layout>
      <Layout.LeftPart />
      <Layout.Body>
        <UsertTitle />
        <UserCodeCountdown />
        <UsersTable />
      </Layout.Body>
      <Layout.RightPart />
    </Layout>
  );
}

function UsertTitle() {
  return (
    <Title>
      <Title.Navigation />
      <Title.Text>Users</Title.Text>
      <Button variant="secondary" size="small">
        <Button.Icon name="user-plus" />
      </Button>
    </Title>
  );
}

function inverseLerp(a: number, b: number, v: number) {
  return (v - a) / (b - a);
}
function UserCodeCountdown() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { data: loginToken, refetch } = useQuery({
    queryFn: getLoginToken,
    queryKey: ["login-token"],
  });

  const timeRemaining = useMemo(() => {
    if (!loginToken) {
      return "";
    }

    const tokenCreatedAt = new Date(loginToken.CreatedAt);

    if (!isValid(tokenCreatedAt)) {
      throw new Error("Invalid loginToken.CreatedAt date");
    }

    return Math.max(60 - differenceInSeconds(currentDate, tokenCreatedAt), 0);
  }, [loginToken, currentDate]);

  useEffect(() => {
    if (timeRemaining === "" || timeRemaining > 0) {
      return;
    }

    refetch();
  }, [timeRemaining, refetch]);

  useEffect(() => {
    const interval = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const randomId = useMemo(() => {
    if (!loginToken) {
      return "---- ----";
    }

    const rawId = loginToken.RandomId;
    const divider = rawId.length / 2;
    return rawId.slice(0, divider) + " " + rawId.slice(divider);
  }, [loginToken]);

  return (
    <styles.countdownContainer>
      <ProgressBar
        progress={inverseLerp(0, 60, timeRemaining || 0)}
        variant="circular"
        label={String(timeRemaining)}
      />
      <div>
        <styles.countdownTitle>Code</styles.countdownTitle>
        <styles.countdownCode>{randomId}</styles.countdownCode>
      </div>
    </styles.countdownContainer>
  );
}

function UsersTable() {
  const navigate = useNavigate();
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading || !users || users.length < 0) {
    return null;
  }

  return (
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
        {users.map(({ Name, ProfilePicture, Id }) => (
          <Table.Item
            key={Id}
            onClick={() => navigate({ to: `/app/user/${Id}` })}
          >
            <Table.ItemColumn>
              <Table.ItemColumnAvatar src={getAsset(ProfilePicture)} />
              <Table.ItemColumnText>{Name}</Table.ItemColumnText>
            </Table.ItemColumn>
            <Table.ItemColumn>01/01/2001</Table.ItemColumn>
            <Table.ItemColumn>100mb</Table.ItemColumn>
          </Table.Item>
        ))}
      </Table.Body>
    </Table>
  );
}

const styles = {
  countdownContainer: styled.div`
    display: flex;
    align-items: center;

    gap: var(--user-code-countdown-spacing-gap);
    color: var(--user-code-countdown-colors-content);
    background: var(--user-code-countdown-colors-background);
    border: 1px solid var(--user-code-countdown-colors-border);
    padding-inline: var(--user-code-countdown-spacing-horizontal);
    padding-block: var(--user-code-countdown-spacing-vertical);
    border-radius: var(--user-code-countdown-radius);
  `,
  countdownTitle: styled.h3`
    padding: 0px;
    margin: 0px;

    ${typography.sm}
  `,
  countdownCode: styled.h3`
    padding: 0px;
    margin: 0px;

    ${typography.base}
  `,
} as const;
