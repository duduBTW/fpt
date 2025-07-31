import styled from "styled-components";

type AvatarSize = "default" | "extra-small";
type AvatarProps = {
  size: AvatarSize;
};

export function Avatar(props: AvatarProps & React.ComponentProps<"img">) {
  const { size, ...rest } = props;
  return <styles.avatar data-size={size} {...rest} />;
}

const styles = {
  avatar: styled.img`
    border-radius: var(--avatar-radius);
    &[data-size="extra-small"] {
      width: var(--avatar-size-extra-small);
      height: var(--avatar-size-extra-small);
    }
  `,
} as const;
