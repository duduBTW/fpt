import { Button } from "@components/button";
import { Form } from "@components/form";
import { Input } from "@components/input";
import { Layout } from "@components/layout";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import styled from "styled-components";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

const loginCodeId = "login-code" as const;

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <styles.layout>
      <Layout.LeftPart />
      <styles.body size="small">
        <styles.form>
          <Form.Input>
            <Form.Label htmlFor={loginCodeId}>Login code</Form.Label>
            <Input>
              <Input.Icon name="lock" />
              <Input.Content
                id={loginCodeId}
                placeholder="**************"
                type="password"
              />
            </Input>
          </Form.Input>
        </styles.form>

        <div>OR</div>

        <styles.registerButton
          onClick={() => navigate({ to: "/register" })}
          variant="primary"
          size="default"
        >
          <Button.Icon name="door-open" />
          <Button.Text>Register</Button.Text>
        </styles.registerButton>
      </styles.body>
      <Layout.RightPart />
    </styles.layout>
  );
}

const styles = {
  layout: styled(Layout)`
    height: 100vh;
    align-items: center;
    justify-content: center;
  `,
  body: styled(Layout.Body)`
    align-items: center;
    justify-content: center;
  `,
  form: styled(Form)`
    align-self: stretch;
  `,
  registerButton: styled(Button)`
    width: fit-content;
  `,
} as const;
