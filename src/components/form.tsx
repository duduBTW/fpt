import styled from "styled-components";
import { typography } from "typography";

export function Form(props: React.ComponentProps<"form">) {
  return <styles.form {...props} />;
}

function Input(props: React.ComponentProps<"div">) {
  return <styles.input {...props} />;
}
function Label(props: React.ComponentProps<"label">) {
  return <styles.label {...props} />;
}
function Divider(props: React.ComponentProps<"div">) {
  return <styles.divider {...props} />;
}

Form.Input = Input;
Form.Label = Label;
Form.Divider = Divider;

const styles = {
  form: styled.form`
    display: flex;
    flex-direction: column;

    gap: var(--form-spacing-gap);
    background: var(--form-color-background);
    border: 1px solid var(--form-color-border);
    padding-inline: var(--form-spacing-horizontal);
    padding-block: var(--form-spacing-vertical);
    border-radius: var(--form-radius);
  `,
  input: styled.div`
    display: flex;
    flex-direction: column;

    gap: var(--form-spacing-input-gap);
  `,
  label: styled.label`
    ${typography["title-sm"]}
  `,
  divider: styled.div`
    width: 100%;
    height: var(--form-spacing-divider-height);
    background: var(--form-color-divider);
  `,
} as const;
