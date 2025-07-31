import type { IconName } from "lucide-react/dynamic";
import styled from "styled-components";
import { Button } from "./button";
import { Link } from "@tanstack/react-router";

export type SidebarDirection = "row" | "column";
type SidebarProps = {
  direction: SidebarDirection;
};

export function Sidebar(props: SidebarProps) {
  const { direction } = props;

  return (
    <styles.sidebar data-direction={direction}>
      {sidebarItems.map(({ icon, location }) => (
        <Link to={location}>
          {({ isActive }) => (
            <Button
              size="default"
              variant={isActive ? "primary" : "secondary"}
              key={location}
            >
              <Button.Icon name={icon} />
            </Button>
          )}
        </Link>
      ))}
    </styles.sidebar>
  );
}

type SidebarItem = {
  location: string;
  icon: IconName;
};
const sidebarItems: SidebarItem[] = [
  {
    icon: "home",
    location: "/",
  },
  {
    icon: "user-round",
    location: "/users",
  },
  {
    icon: "folder",
    location: "/storage",
  },
  {
    icon: "lock",
    location: "/security",
  },
  {
    icon: "settings",
    location: "/settings",
  },
];

const styles = {
  sidebar: styled.nav`
    display: flex;

    &[data-direction="column"] {
      flex-direction: column;
    }
    &[data-direction="row"] {
      flex-direction: row;
    }

    gap: var(--sidebar-spacing-gap);
    padding-inline: var(--sidebar-spacing-horizontal);
    padding-block: var(--sidebar-spacing-vertical);
    background-color: var(--sidebar-color-background);
  `,
};
