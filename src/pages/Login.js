import { useCallback } from "react";
import {
  Form,
  FormGroup,
  Button,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "../actions/auth";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const LoginSchema = yup
  .object({
    email: yup
      .string()
      .email("The email is not valid.")
      .required("The email is required."),
    password: yup.string().required("The password is required."),
  })
  .required();

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = useCallback(
    async (data) => {
      await dispatch(login({ ...data }));
      reset();
      navigate("/");
    },
    [dispatch, navigate, reset]
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col col-md-8 vh-100 sign-image"></div>
        <div className="col col-md-4 vh-100 m-auto text-start d-flex flex-column justify-content-center align-items-center">
          <div className="w-100">
            <h4>Welcome to Entrance Test Interview!</h4>
            <p>Please sign-in to your account and start the adventure</p>
          </div>
          <Form className="w-100 my-2" onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label for="email">
                Email<span className="text-danger">*</span>
              </Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    id="email"
                    placeholder="johndoe@gmail.com"
                    invalid={errors.email}
                    {...field}
                  />
                )}
              />
              <FormFeedback>{errors.email?.message}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="password">
                Password<span className="text-danger">*</span>
              </Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    id="password"
                    placeholder="⚉ ⚉ ⚉ ⚉ ⚉ ⚉ ⚉ ⚉"
                    type="password"
                    invalid={errors.password}
                    {...field}
                  />
                )}
              />
              <FormFeedback>{errors.password?.message}</FormFeedback>
            </FormGroup>
            <FormGroup check>
              <Controller
                name="rememberMe"
                control={control}
                render={({ field }) => <Input type="checkbox" {...field} />}
              />{" "}
              <Label check>Remember me</Label>
            </FormGroup>
            <Button
              className="w-100 my-2 button-primary"
              disabled={Object.keys(errors).length !== 0}
            >
              Login
            </Button>
            <Label check>
              New on our platform?{" "}
              <span
                role="button"
                className="text-primary"
                onClick={() => navigate("/signup")}
              >
                Create an account
              </span>
            </Label>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
