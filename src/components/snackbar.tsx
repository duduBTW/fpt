import { snackbarContentAtom } from "@state/snackbar";
import { useAtom } from "jotai";
import { useEffect } from "react";
import styled from "styled-components";
import { Icon } from "./icon";
import { typography } from "typography";

export function Snackbar() {
  const [snackbarContent, setSnackbarContent] = useAtom(snackbarContentAtom);
  useEffect(() => {
    if (!snackbarContent) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setSnackbarContent(undefined);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [setSnackbarContent, snackbarContent]);

  if (typeof snackbarContent === "undefined") {
    return null;
  }

  return (
    <styles.snackbar>
      <styles.icon
        size="base"
        name={snackbarContent.type === "info" ? "info" : "alert-triangle"}
      />
      <styles.text>{snackbarContent.label}</styles.text>
    </styles.snackbar>
  );
}

const styles = {
  snackbar: styled.div`
    display: flex;
    align-items: center;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    box-shadow:
      4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);

    bottom: var(--snackbar-spacing-bottom);
    background: var(--snackbar-color-background);
    border-radius: var(--snackbar-color-border);
    padding-inline: var(--snackbar-spacing-horizontal);
    padding-block: var(--snackbar-spacing-vertical);
    border: 1px solid var(--snackbar-color-border);
    border-radius: var(--snackbar-radius);
    gap: var(--snackbar-spacing-gap);
    max-width: var(--snackbar-color-max-width);
  `,
  text: styled.div`
    ${typography.base}

    color: var(--snackbar-color-content);
  `,
  icon: styled(Icon)`
    color: var(--snackbar-spacing-icon);
  `,
} as const;
