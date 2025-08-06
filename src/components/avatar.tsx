import styled from "styled-components";

type AvatarSize = "large" | "default" | "extra-small";
type AvatarProps = {
  size: AvatarSize;
};

export function Avatar(props: AvatarProps & React.ComponentProps<"img">) {
  const { size, ...rest } = props;
  return <styles.avatar data-size={size} {...rest} />;
}

const styles = {
  avatar: styled.img`
    object-fit: cover;
    border-radius: var(--avatar-radius);
    &[data-size="extra-small"] {
      width: var(--avatar-size-extra-small);
      height: var(--avatar-size-extra-small);
    }
    &[data-size="large"] {
      width: var(--avatar-size-large);
      height: var(--avatar-size-large);
    }
  `,
} as const;
