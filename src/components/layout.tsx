import styled from "styled-components";

export function Layout(props: React.ComponentProps<"div">) {
  return <styles.layout {...props} />;
}

type LayoutBodySize = "medium" | "small";
type LayoutBodyProps = { size?: LayoutBodySize } & React.ComponentProps<"div">;
function Body(props: LayoutBodyProps) {
  const { size, ...rest } = props;
  return <styles.body data-size={size ?? "medium"} {...rest} />;
}
function LeftPart(props: React.ComponentProps<"div">) {
  return <styles.leftPart {...props} />;
}
function RightPart(props: React.ComponentProps<"div">) {
  return <styles.rightPart {...props} />;
}

Layout.Body = Body;
Layout.LeftPart = LeftPart;
Layout.RightPart = RightPart;

const styles = {
  layout: styled.div`
    flex: 1;
    display: flex;

    background-color: var(--t2-body);
    border-bottom-left-radius: var(--body-corner-radius);
  `,
  leftPart: styled.aside`
    flex: 1;
  `,
  body: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    &[data-size="medium"] {
      max-width: var(--t2-container-width-md);
    }
    &[data-size="small"] {
      max-width: var(--t2-container-width-sm);
    }
    gap: var(--spacing-4);
    padding-inline: var(--t2-content-horizontal);
    padding-block: var(--t2-content-vertical);
  `,
  rightPart: styled.aside`
    flex: 1;
  `,
} as const;
