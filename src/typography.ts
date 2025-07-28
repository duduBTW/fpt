import { css } from "styled-components";

export const typography = {
  sm: css`
    font-family: var(--typography-family-content);
    font-size: var(--typography-size-sm);
    line-height: var(--typography-line-height-sm);
    font-weight: var(--typography-weight-regular);
  `,
  base: css`
    font-family: var(--typography-family-content);
    font-size: var(--typography-size-base);
    line-height: var(--typography-line-height-base);
    font-weight: var(--typography-weight-regular);
  `,
  "title-sm": css`
    font-size: var(--typography-size-sm);
    font-family: var(--typography-family-content);
    line-height: var(--typography-line-height-sm);
    font-weight: var(--typography-weight-medium);
  `,
  title: css`
    font-size: var(--typography-size-lg);
    font-family: var(--typography-family-title);
    line-height: var(--typography-line-height-lg);
    font-weight: var(--typography-weight-regular);
  `,
} as const;
