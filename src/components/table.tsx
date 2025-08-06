import styled, { css } from "styled-components";
import { Icon as DsIcon } from "./icon";
import type { DynamicIcon } from "lucide-react/dynamic";
import { typography } from "../typography";
import { Avatar } from "./avatar";

export function Table(props: React.ComponentProps<"table">) {
  return <styles.table {...props} />;
}

// ---
// Header
// ---
function Header(props: React.ComponentProps<"tr">) {
  return (
    <thead>
      <styles.header {...props} />
    </thead>
  );
}
function HeaderColumn(props: React.ComponentProps<"th">) {
  return <styles.headerColumn {...props} />;
}
function HeaderColumnText(props: React.ComponentProps<"span">) {
  return <styles.headerColumnText {...props} />;
}
function HeaderColumnIcon(
  props: Omit<React.ComponentProps<typeof DynamicIcon>, "color" | "size">
) {
  return <styles.headerColumnIcon size="small" {...props} />;
}

// ---
// Body
// ---
function Body(props: React.ComponentProps<"tbody">) {
  return <styles.body {...props} />;
}
function Item(props: React.ComponentProps<"tr"> & { selected?: boolean }) {
  const { selected, ...rest } = props;
  return (
    <styles.item
      data-interactable={typeof rest.onClick !== "undefined"}
      data-selected={selected}
      {...rest}
    />
  );
}
function ItemColumn(props: React.ComponentProps<"th">) {
  return <styles.itemColumn {...props} />;
}
function ItemColumnIcon(
  props: Omit<React.ComponentProps<typeof DynamicIcon>, "color" | "size">
) {
  return (
    <styles.itemColumnDecoration>
      <DsIcon size="base" {...props} />
    </styles.itemColumnDecoration>
  );
}
function ItemColumnAvatar(
  props: Omit<React.ComponentProps<typeof Avatar>, "size">
) {
  return (
    <styles.itemColumnDecoration>
      <Avatar size="extra-small" {...props} />
    </styles.itemColumnDecoration>
  );
}
function ItemColumnText(props: React.ComponentProps<"th">) {
  return <styles.itemColumnText {...props} />;
}
function Empty(props: React.ComponentProps<"th">) {
  return <styles.empty {...props} />;
}
function ItemColumnInput(props: React.ComponentProps<"input">) {
  return <styles.itemColumnInput {...props} />;
}

Table.Header = Header;
Table.HeaderColumn = HeaderColumn;
Table.HeaderColumnText = HeaderColumnText;
Table.HeaderColumnIcon = HeaderColumnIcon;
Table.ItemColumnAvatar = ItemColumnAvatar;
Table.Body = Body;
Table.Item = Item;
Table.ItemColumn = ItemColumn;
Table.ItemColumnText = ItemColumnText;
Table.ItemColumnIcon = ItemColumnIcon;
Table.ItemColumnInput = ItemColumnInput;
Table.Empty = Empty;

const columnStyles = css`
  padding-inline: var(--table-spacing-row-horizontal);
  padding-block: var(--table-spacing-row-vertical);
`;

const styles = {
  table: styled.table`
    border: 1px solid var(--table-color-border);
    border-radius: var(--table-radius);
    text-align: start;
    border-collapse: separate;
    border-spacing: 0;
    overflow: hidden;
  `,
  header: styled.tr`
    background: var(--table-color-background);
  `,
  headerColumn: styled.th`
    text-align: start;
    position: relative;

    ${columnStyles}
    ${typography["title-sm"]}
    border-bottom: 1px solid var(--table-color-border);

    &:active {
      background: var(--table-color-hover);
    }
  `,
  headerColumnText: styled.span`
    flex: 1;
  `,
  headerColumnIcon: styled(DsIcon)`
    position: absolute;
    right: var(--table-spacing-row-horizontal);
    color: var(--table-color-icon-header);
  `,
  body: styled.tbody`
    & > tr:nth-of-type(even) {
      background: var(--table-color-background-accent);

      &[data-interactable="true"] {
        &:hover,
        &:focus-visible,
        &[data-state="open"] {
          outline: none;
          background: var(--table-color-hover);
        }

        &[data-selected="true"] {
          background: var(--table-color-active);
        }
      }
    }
  `,
  item: styled.tr`
    background: var(--table-color-background);

    &[data-interactable="true"] {
      &:hover,
      &:focus-visible,
      &[data-state="open"] {
        outline: none;
        background: var(--table-color-hover);
      }
    }

    &[data-selected="true"] {
      background: var(--table-color-active);
    }
  `,
  itemColumn: styled.td`
    ${columnStyles}
  `,
  itemColumnText: styled.span`
    margin-top: auto;
    margin-bottom: auto;

    ${typography.base}
  `,
  itemColumnInput: styled.input`
    padding: 0px;
    margin-top: auto;
    margin-bottom: auto;
    background: transparent;
    border: none;
    box-sizing: border-box;
    width: max-content;

    ${typography.base}
  `,
  itemColumnDecoration: styled.span`
    padding-right: 8px;
  `,
  empty: styled.td`
    height: 200px;
    text-align: center;

    ${columnStyles}
    background: var(--table-color-background-accent);
  `,
} as const;
