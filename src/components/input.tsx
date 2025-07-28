import styled from "styled-components";
import { Icon as DsIcon } from "./icon";
import type { DynamicIcon } from "lucide-react/dynamic";
import { typography } from "../typography";

export function Input(props: React.ComponentProps<"div">) {
  return <styles.container {...props} />;
}

function Content(props: React.ComponentProps<"input">) {
  return <styles.content {...props} />;
}
function Icon(
  props: Omit<React.ComponentProps<typeof DynamicIcon>, "color" | "size">
) {
  return (
    <styles.icon>
      <DsIcon size="base" {...props} />
    </styles.icon>
  );  
}

Input.Content = Content;
Input.Icon = Icon;

const styles = {
  container: styled.div`
    display: flex;
    align-items: center;
    border: 1px solid var(--input-color-background);

    gap: var(--input-spacing-gap);
    padding-inline: var(--input-spacing-horizontal);
    border-radius: var(--input-radius);
    background-color: var(--input-color-background);
    color: var(--input-color-content);

    &::placeholder {
      color: var(--input-color-placeholder);
    }

    &:focus-within {
      border-color: var(--input-color-border-focus);
    }
  `,
  content: styled.input`
    border: none;
    width: 100%;
    outline: none;

    ${typography.base}
    padding-block: var(--input-spacing-vertical);
  `,
  icon: styled.div`
    display: flex;

    color: var(--input-color-icon);
  `,
} as const;
