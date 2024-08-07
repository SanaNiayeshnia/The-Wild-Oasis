import styled from "styled-components";
import Logo from "../../ui/sidebar/Logo";
import Input from "../../ui/form/Input";
import Button from "../../ui/Button";
import useLogin from "./useLogin";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const StyledLoginForm = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;
const Form = styled.form`
  background-color: var(--color-Gray-0);
  border: 1px solid var(--color-Gray-200);
  border-radius: 0.5rem;
  padding: 2rem 1.5rem;
  min-width: 350px;
  box-shadow: 0px 0px 5px 0 var(--shadow-color);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const LoginFormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  & label {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--color-Gray-900);
  }
`;
const FormHead = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-Gray-800);
`;

function LoginForm() {
  const { register, formState, handleSubmit } = useForm();
  const { isPending, loginMutate } = useLogin();
  const { errors } = formState;
  function onSubmit(data) {
    loginMutate({ email: data.email, password: data.password });
  }
  function onError() {
    toast("Fill the form correctly and try again!", { icon: "✍️" });
  }

  return (
    <StyledLoginForm>
      <Logo minwidth="140px" />
      <FormHead>Log in To Your Account</FormHead>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <LoginFormField>
          <label htmlFor="userEmail">Email Address</label>
          <Input
            type="text"
            id="userEmail"
            disabled={isPending}
            {...register("email", {
              required: "This field can't be empty!",
              validate: (email) => {
                return (
                  String(email)
                    .toLowerCase()
                    .match(
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    ) || "This isn't a valid email address!"
                );
              },
            })}
          />
          <Error>{errors?.email?.message}</Error>
        </LoginFormField>
        <LoginFormField>
          <label htmlFor="userPass">Password</label>
          <Input
            type="password"
            id="userPass"
            disabled={isPending}
            {...register("password", {
              required: "This field can't be empty!",
            })}
          />
          <Error>{errors?.password?.message}</Error>
        </LoginFormField>
        <Button className="secondary" disabled={isPending}>
          {isPending && <Spinner type="secondary" />}
          Log in
        </Button>
      </Form>
    </StyledLoginForm>
  );
}

export default LoginForm;
