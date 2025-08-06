import { Avatar } from "@components/avatar";
import { Button } from "@components/button";
import { Form } from "@components/form";
import { Input } from "@components/input";
import { InputOTP } from "@components/input-otp";
import { Layout } from "@components/layout";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import styled from "styled-components";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { registerUser, type RegisterDto } from "@service/register";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "@state/snackbar";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

const nameId = "name" as const;

function RouteComponent() {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm<RegisterDto>();

  const { openSnackbar } = useSnackbar();

  const { mutate: registerUserMutate } = useMutation({
    mutationFn: registerUser,
    onError: () => {
      openSnackbar({
        label: "Failed to register.",
        type: "error",
      });
    },
    onSuccess: (userToken) => {
      localStorage.setItem("userToken", userToken);
      navigate({ to: "/app/storage/$" });
    },
  });

  const navigate = useNavigate();
  const pfpFileInputRef = useRef<HTMLInputElement>(null);
  const profilePictureFile = useRef<File | undefined>(undefined);
  const [avatarSrc, setAvatarSrc] = useState(
    "https://pbs.twimg.com/profile_images/1943053327811452929/4mQlA50h_400x400.jpg"
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    if (typeof profilePictureFile.current !== "undefined") {
      URL.revokeObjectURL(avatarSrc);
    }

    profilePictureFile.current = file;
    const imageUrl = URL.createObjectURL(file);
    setAvatarSrc(imageUrl);
  };

  const onSubmit: SubmitHandler<RegisterDto> = (formData) => {
    registerUserMutate({
      ...formData,
      file: profilePictureFile.current,
    });
  };

  return (
    <styles.layout>
      <Layout.LeftPart />
      <styles.body size="small">
        <styles.backButton
          onClick={() => navigate({ to: "/login" })}
          variant="secondary"
          size="small"
        >
          <Button.Icon name="chevron-left" />
          <Button.Text>Login</Button.Text>
        </styles.backButton>

        <styles.form onSubmit={handleSubmit(onSubmit)}>
          <styles.profilePicture>
            <input
              type="file"
              hidden
              ref={pfpFileInputRef}
              onChange={handleFileChange}
              accept="image/*"
            />
            <Avatar size="large" src={avatarSrc} />
            <styles.changePfpImage
              type="button"
              onClick={() => {
                pfpFileInputRef.current?.click();
              }}
              variant="secondary"
              size="small"
            >
              <Button.Text>Change pfp</Button.Text>
              <Button.Icon name="image-up" />
            </styles.changePfpImage>
          </styles.profilePicture>
          <Form.Divider />

          <Form.Input>
            <Form.Label htmlFor={nameId}>Name</Form.Label>
            <Input>
              <Input.Content
                id={nameId}
                placeholder="Jonh ftp server.."
                {...register("name")}
              />
            </Input>
          </Form.Input>
          <Form.Input>
            <Form.Label htmlFor={nameId}>Code</Form.Label>
            <Controller
              control={control}
              name="code"
              render={({ field }) => (
                <InputOTP
                  maxLength={8}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                >
                  <InputOTP.Group>
                    <InputOTP.Slot index={0} />
                    <InputOTP.Slot index={1} />
                    <InputOTP.Slot index={2} />
                    <InputOTP.Slot index={3} />
                    <InputOTP.Separator />
                    <InputOTP.Slot index={4} />
                    <InputOTP.Slot index={5} />
                    <InputOTP.Slot index={6} />
                    <InputOTP.Slot index={7} />
                  </InputOTP.Group>
                </InputOTP>
              )}
            />
          </Form.Input>

          <styles.createAccountButton variant="primary" size="default">
            <Button.Text>Create account</Button.Text>
            <Button.Icon name="chevron-right" />
          </styles.createAccountButton>
        </styles.form>
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
  profilePicture: styled.div`
    display: flex;
    align-items: flex-end;
    gap: 4;
  `,
  body: styled(Layout.Body)``,
  form: styled(Form)`
    align-self: stretch;
  `,
  backButton: styled(Button)`
    width: fit-content;
  `,
  createAccountButton: styled(Button)`
    justify-content: space-between;
  `,
  changePfpImage: styled(Button)`
    flex: 1;
    justify-content: space-between;
  `,
} as const;
