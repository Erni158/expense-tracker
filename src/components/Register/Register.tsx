import styles from "./Register.module.scss";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { CircularProgress, TextField } from "@mui/material";

import { apiClient } from "../../utils/apiClient";
import { API_REGISTER } from "../../apiRoutes";
import { useAuthContext } from "../../context/AuthContext";
import { ApiMethods, User } from "../../types";
import { toast } from "react-toastify";

interface RegisterFormFields {
  name: string;
  email: string;
  password: string;
}

const schema = yup
  .object({
    name: yup.string().required("Plese enter your name"),
    email: yup.string().email().required("Please enter your email"),
    password: yup
      .string()
      .required("Please enter your password")
      .min(7, "Password is too short - should be 8 chars minimum."),
  })
  .required();

const Register = () => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormFields>({
    reValidateMode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const { setIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterFormFields> = (data) => {
    setLoading(true);
    apiClient<User>(`http://localhost:3000${API_REGISTER}`, ApiMethods.POST, {
      ...data,
    })
      .then((result) => {
        console.log(result);
        if (result) {
          console.log(result);
          toast.success("You're registered successfuly!");
          setLoading(false);
          localStorage.setItem("loginToken", result.token);
          setIsAuthenticated(true);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        setLoading(false);
        setError("email", { message: error.message });
        toast.error(error.message);
      });
  };

  return (
    <div className={styles.root}>
      <h2>Register</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.register}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                className={styles.input}
                label="Name"
                placeholder="Name"
                margin="normal"
                error={"name" in errors}
                helperText={errors.name?.message}
                fullWidth
                {...field}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                className={styles.input}
                label="E-mail"
                placeholder="E-mail"
                margin="normal"
                error={"email" in errors}
                helperText={errors.email?.message}
                fullWidth
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                className={styles.input}
                type="password"
                label="Password"
                placeholder="Password"
                margin="normal"
                error={"password" in errors}
                helperText={errors.password?.message}
                fullWidth
                {...field}
              />
            )}
          />
        </div>
        <LoadingButton
          className={styles.button}
          variant="contained"
          type="submit"
        >
          Register
        </LoadingButton>
        {loading && <CircularProgress className={styles.progress} />}
      </form>
    </div>
  );
};

export default Register;
