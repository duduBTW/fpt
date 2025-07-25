import type { IconName } from "lucide-react/dynamic";
import styled from "styled-components";
import { Button } from "./button";

export function Sidebar() {
  return (
    <styles.sidebar>
      {sidebarItems.map(({ icon, location }) => (
        <Button size="default" variant="secondary" key={location}>
          <Button.Icon name={icon} />
        </Button>
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
