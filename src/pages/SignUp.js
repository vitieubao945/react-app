import {
  Form,
  FormGroup,
  Button,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { register } from "../actions/auth";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useCallback } from "react";

const SignUpSchema = yup
  .object({
    firstName: yup.string().required("The first name is required."),
    lastName: yup.string().required("The last name is required."),
    email: yup
      .string()
      .email("The email is not valid.")
      .required("The email is required."),
    password: yup
      .string()
      .required("The password is required.")
      .min(6, "The password must be between 6-18 characters.")
      .max(18, "The password must be between 6-18 characters.")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*\\()])/,
        "The password must contain at least one digit, one special character, and one letter. "
      ),
  })
  .required();

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmit = useCallback(
    async (data) => {
      await dispatch(register({ ...data }));
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
            <h4>Adventure starts here</h4>
            <p>Make your app management easy and fun!</p>
          </div>
          <Form className="w-100 my-2" onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label for="firstname">
                First Name<span className="text-danger">*</span>
              </Label>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="firstname"
                    placeholder="john"
                    invalid={errors.firstName || false}
                    {...field}
                  />
                )}
              />
              <FormFeedback>{errors.firstName?.message}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="lastname">
                Last Name<span className="text-danger">*</span>
              </Label>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="lastname"
                    placeholder="doe"
                    invalid={errors.lastName || false}
                    {...field}
                  />
                )}
              />
              <FormFeedback>{errors.lastName?.message}</FormFeedback>
            </FormGroup>
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
                    invalid={errors.email || false}
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
                name="agreePrivacy"
                control={control}
                render={({ field }) => <Input type="checkbox" {...field} />}
              />{" "}
              <Label check>
                I agree to{" "}
                <span className="text-primary">privacy policy &amp; terms</span>
              </Label>
            </FormGroup>
            <Button
              className="w-100 my-2 button-primary"
              disabled={Object.keys(errors).length !== 0}
            >
              Sign Up
            </Button>
            <Label check>
              Already have an account?{" "}
              <span
                role="button"
                className="text-primary"
                onClick={() => navigate("/login")}
              >
                Sign in instead
              </span>
            </Label>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
