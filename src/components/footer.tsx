import styled from "styled-components";

type FooterColorType = "accent" | "transparent";
type FooterProps = {
  colorType: FooterColorType;
} & React.ComponentProps<"div">;

export function Footer(props: FooterProps) {
  const { colorType, ...rest } = props;
  return (
    <styles.footer data-color-type={colorType}>
      <styles.footerContent {...rest} />
    </styles.footer>
  );
}

const styles = {
  footer: styled.footer`
    display: flex;
    justify-content: center;

    &[data-color-type="accent"] {
      background-color: var(--storage-breadcrumbs-colors-accent);
    }
    &[data-color-type="transparent"] {
      background-color: var(--storage-breadcrumbs-colors-transparent);
    }
  `,
  footerContent: styled.div`
    display: flex;
    width: 100%;

    max-width: var(--storage-breadcrumbs-spacing-max-width);
    padding-inline: var(--t2-content-horizontal);
  `,
} as const;
