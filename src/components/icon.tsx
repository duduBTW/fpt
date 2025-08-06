import { DynamicIcon } from "lucide-react/dynamic";
import styled from "styled-components";

export type IconSize = "small" | "base";
type IconProps = {
  size: IconSize;
};
export function Icon(
  props: IconProps & Omit<React.ComponentProps<typeof DynamicIcon>, "size">
) {
  const { size, ...rest } = props;
  return (
    <styles.container
      data-size={size}
      data-interactable={typeof rest.onClick !== "undefined"}
    >
      <styles.icon {...rest} />
    </styles.container>
  );
}

const styles = {
  container: styled.div`
    isolation: isolate;
    display: inline-block;
    position: relative;

    &[data-size="small"] {
      width: var(--icon-spacing-size-small);
      height: var(--icon-spacing-size-small);
    }
    &[data-size="base"] {
      width: var(--icon-spacing-size-base);
      height: var(--icon-spacing-size-base);
    }

    &[data-interactable="true"] {
      &::after {
        content: "";
        position: absolute;
        z-index: -1;

        width: calc((var(--icon-spacing-interaction-padding) * 2) + 100%);
        height: calc((var(--icon-spacing-interaction-padding) * 2) + 100%);
        inset: calc(var(--icon-spacing-interaction-padding) * -1);
        border-radius: var(--icon-radius-interaction);
      }

      &:hover {
        &::after {
          background: var(--icon-color-interaction-hover);
        }
      }

      &:active {
        &::after {
          background: var(--icon-color-interaction-active);
        }
      }
    }
  `,
  icon: styled(DynamicIcon)`
    width: 100%;
    height: 100%;
  `,
};
