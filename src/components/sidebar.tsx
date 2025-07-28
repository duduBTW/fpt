import type { IconName } from "lucide-react/dynamic";
import styled from "styled-components";
import { Button } from "./button";
import { Link } from "@tanstack/react-router";

export function Sidebar() {
  return (
    <styles.sidebar>
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
    flex-direction: column;

    gap: var(--sidebar-spacing-gap);
    padding-inline: var(--sidebar-spacing-horizontal);
    padding-block: var(--sidebar-spacing-vertical);
    background-color: var(--sidebar-color-background);
  `,
};
