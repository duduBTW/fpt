import * as RadixContextMenu from "@radix-ui/react-context-menu";
import styled from "styled-components";
import { typography } from "../typography";

export function ContextMenu(props: RadixContextMenu.ContextMenuContentProps) {
  return <styles.content {...props} />;
}

function Item(props: RadixContextMenu.ContextMenuItemProps) {
  return <styles.item {...props} />;
}

ContextMenu.Item = Item;

const styles = {
  content: styled(RadixContextMenu.Content)`
    display: flex;
    flex-direction: column;
    min-width: 200px;
    overflow: hidden;
    box-shadow:
      0px 6px 34px -8px rgba(22, 23, 24, 0.3),
      0px 6px 16px -13px rgba(22, 23, 24, 0.12);

    gap: var(--context-menu-spacing-gap);
    color: var(--context-menu-color-content);
    background-color: var(--context-menu-color-background);
    border-radius: var(--context-menu-radius-container);
    padding-inline: var(--context-menu-spacing-horizontal);
    padding-block: var(--context-menu-spacing-vertical);
  `,
  item: styled(RadixContextMenu.Item)`
    display: flex;
    align-items: center;
    position: relative;
    user-select: none;
    outline: none;

    ${typography.base}
    color: var(--context-menu-content);
    gap: var(--context-menu-spacing-item-gap);
    padding-inline: var(--context-menu-spacing-item-horizontal);
    padding-block: var(--context-menu-spacing-item-vertical);
    border-radius: var(--context-menu-radius-item);
    &[data-highlighted] {
      background-color: var(--context-menu-color-hover);
    }
  `,
} as const;
