import type { DynamicIcon } from "lucide-react/dynamic";
import styled from "styled-components";
import { Icon as DsIcon } from "./icon";
import { typography } from "../typography";

export function Breadcrumbs(props: React.ComponentProps<"div">) {
  return <styles.breadcrumbs {...props} />
}

function Divider(
  props: Omit<React.ComponentProps<typeof DynamicIcon>, "color" | "size" | "name">
) {
  return <DsIcon name="chevron-right" size="small" color="var(--breadcrumbs-color-icon)" {...props} />
}

function Item(props: React.ComponentProps<"div">) {
  return <styles.breadcrumbItem {...props} />
}
function ItemIcon(
  props: Omit<React.ComponentProps<typeof DynamicIcon>, "color" | "size">
) {
  return <DsIcon size="small" {...props} />
}
function ItemText(props: React.ComponentProps<"span">) {
  return <styles.breadcrumbItemText {...props} />
}

Breadcrumbs.Divider = Divider
Breadcrumbs.Item = Item
Breadcrumbs.ItemIcon = ItemIcon
Breadcrumbs.ItemText = ItemText

const styles = {
  breadcrumbs: styled.div`
    display: flex;

    gap: var(--breadcrumbs-spacing-container-gap);
    padding-inline: var(--breadcrumbs-spacing-container-horizontal);
    padding-block: var(--breadcrumbs-spacing-container-vertical);
  `,
  breadcrumbItem: styled.div`
    display: flex;
    text-decoration: none;

    ${typography.sm}
    gap: var(--breadcrumbs-spacing-item-gap);
    color: var(--breadcrumbs-color-content);
    &:active {
      color: var(--breadcrumbs-color-content-active);
    }
  `,
  breadcrumbItemIcon: styled.div`
    display: flex;
  `,
  breadcrumbItemText: styled.span`
    display: flex;
  `,
} as const;
