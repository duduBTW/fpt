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
  return <styles.icon data-size={size} {...rest} />;
}

const styles = {
  icon: styled(DynamicIcon)`
    &[data-size="small"] {
      width: var(--icon-size-small);
      height: var(--icon-size-small);
    }
    &[data-size="base"] {
      width: var(--icon-size-base);
      height: var(--icon-size-base);
    }
  `,
};
