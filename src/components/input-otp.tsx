import styled from "styled-components";
import { OTPInput, OTPInputContext } from "input-otp";
import { typography } from "typography";
import { Icon } from "./icon";
import { useContext } from "react";

export function InputOTP({
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <styles.container className={containerClassName}>
      <styles.input {...props} />
    </styles.container>
  );
}

function Group(props: React.ComponentProps<"div">) {
  return <styles.group {...props} />;
}

function Slot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <styles.slot data-active={isActive} className={className} {...props}>
      {char}
      {hasFakeCaret && (
        <styles.caretContainer>
          <styles.caret />
        </styles.caretContainer>
      )}
    </styles.slot>
  );
}

function Separator(props: React.ComponentProps<"div">) {
  return (
    <styles.separator role="separator" {...props}>
      <Icon size="small" name="minus" />
    </styles.separator>
  );
}

InputOTP.Group = Group;
InputOTP.Slot = Slot;
InputOTP.Separator = Separator;

const styles = {
  container: styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:has([disabled]) {
      opacity: 0.5;
    }
  `,
  input: styled(OTPInput)`
    &[disabled] {
      cursor: not-allowed;
    }
  `,
  group: styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
  `,
  slot: styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.25rem;
    width: 2.25rem;
    border: 1px solid var(--input-color-background);

    ${typography.base}
    background-color: var(--input-color-background);
    color: var(--input-color-content);
    box-shadow: var(--input-shadow-xs);
    border-radius: var(--input-radius);

    &[data-active="true"] {
      border-color: var(--input-color-border-focus);
    }
  `,
  caretContainer: styled.div`
    pointer-events: none;
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  caret: styled.div`
    height: 1rem;
    width: 1px;
    background-color: var(--input-color-content);
    animation: caret-blink 1000ms step-start infinite;

    @keyframes caret-blink {
      50% {
        opacity: 0;
      }
    }
  `,
  separator: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-inline: 0.25rem;
    color: var(--t2-content);
  `,
} as const;
