import styled from "styled-components";
import { typography } from "../typography";
import { useCanGoBack, useRouter } from "@tanstack/react-router";
import { Button } from "./button";

export function Title(props: React.ComponentProps<"div">) {
  return <styles.title {...props} />;
}
function Text(props: React.ComponentProps<"h1">) {
  return <styles.titleText {...props} />;
}
function Navigation() {
  const router = useRouter();
  const canGoBack = useCanGoBack();

  return (
    <>
      <Button
        disabled={!canGoBack}
        onClick={() => router.history.back()}
        variant="secondary"
        size="small"
      >
        <Button.Icon name="chevron-left" />
      </Button>
      <Button
        onClick={() => router.history.forward()}
        variant="secondary"
        size="small"
      >
        <Button.Icon name="chevron-right" />
      </Button>
    </>
  );
}

Title.Text = Text;
Title.Navigation = Navigation;

const styles = {
  title: styled.div`
    display: flex;

    gap: var(--spacing-2);
  `,
  titleText: styled.h1`
    flex: 1;
    padding: 0px;
    margin: 0px;

    ${typography.title};
  `,
} as const;
