import styled from "styled-components";
import { Icon as DsIcon, type IconSize } from "./icon";
import type { DynamicIcon } from "lucide-react/dynamic";

export function Input(props: React.ComponentProps<"div">) {
  return <styles.container {...props} />;
}

function Content(props: React.ComponentProps<"input">) {
  return <styles.content {...props} />;
}
function Icon(
  props: Omit<React.ComponentProps<typeof DynamicIcon>, "color" | "size">
) {
  return <DsIcon size="base" {...props} />;
}

Input.Content = Content;
Input.Icon = Icon;

const styles = {
  container: styled.div`
    display: flex;
    align-items: center;

    padding-inline: var(--input-spacing-horizontal);
    border-radius: var(--input-radius);
    background-color: var(--input-color-background);
    color: var(--input-color-content);

    &::placeholder {
      color: var(--input-color-placeholder);
    }
  `,
  content: styled.input`
    border: none;
    width: 100%;

    padding-block: var(--input-spacing-vertical);
  `,
  icon: styled.div`
    color: var(--input-spacing-vertical);
  `,
} as const;
