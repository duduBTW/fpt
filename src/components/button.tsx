import styled from "styled-components";
import { DynamicIcon } from "lucide-react/dynamic";
import { createContext } from "react";
import { Icon as DsIcon } from "./icon";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "small" | "default";
type ButtonProps = {
  variant: ButtonVariant;
  size: ButtonSize;
};
export function Button(props: ButtonProps & React.ComponentProps<"button">) {
  const { variant, size, ...rest } = props;
  return (
    <ButtonContext.Provider value={{ variant, size }}>
      <styles.button data-size={size} data-variant={variant} {...rest} />
    </ButtonContext.Provider>
  );
}

function Icon(
  props: Omit<React.ComponentProps<typeof DynamicIcon>, "color" | "size">
) {
  return <DsIcon size="base" {...props} />;
}
function Text(props: React.ComponentProps<"span">) {
  return <styles.text {...props} />;
}

const ButtonContext = createContext<ButtonProps | undefined>(undefined);
// function useButton() {
//   const state = useContext(ButtonContext);
//   if (typeof state === "undefined") {
//     throw new Error(
//       "useButton must be used inside of a ButtonContext.Provider"
//     );
//   }
//   return state;
// }

const styles = {
  button: styled.button`
    display: flex;
    border: none;
    transition: background 160ms ease;

    border-radius: var(--button-radius);
    &[data-size="small"] {
      padding-inline: var(--button-size-small-spacing-horizontal);
      padding-block: var(--button-size-small-spacing-vertical);
    }
    &[data-size="default"] {
      padding-inline: var(--button-size-default-spacing-horizontal);
      padding-block: var(--button-size-default-spacing-vertical);
    }

    &[data-variant="primary"] {
      background: var(--button-variant-primary-color-background);
      color: var(--button-variant-primary-color-content);
    }
    &[data-variant="secondary"] {
      background: var(--button-variant-secondary-color-background);
      color: var(--button-variant-secondary-color-content);

      &:hover {
        background: var(--button-variant-secondary-color-background-hover);
      }
      &:active {
        background: var(--button-variant-secondary-color-background-active);
      }
    }
  `,
  text: styled.span``,
} as const;

Button.Text = Text;
Button.Icon = Icon;
