import styles from "./LoginScreen.module.scss";

import * as yup from "yup";
import { CircularProgress, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiClient } from "../../utils/apiClient";
import { API_LOGIN } from "../../apiRoutes";
import { ApiMethods, User } from "../../types";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { toast } from "react-toastify";

interface LoginFormFields {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().email().required("Please enter your email"),
    password: yup
      .string()
      .required("Please enter your password")
      .min(7, "Password is too short - should be 8 chars minimum."),
  })
  .required();

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormFields>({
    reValidateMode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const { setIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormFields> = (data) => {
    setLoading(true);
    apiClient<User>(`http://localhost:3000${API_LOGIN}`, ApiMethods.POST, {
      ...data,
    })
      .then((result) => {
        if (result) {
          toast.success("You're logged in!");
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
      <h2>Login</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.login}>
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
          Login
        </LoadingButton>
        {loading && (
          <CircularProgress
            className={styles.progress}
            color="success"
            size={50}
            thickness={4.5}
            sx={{
              color: "#fff"
            }}
          />
        )}
      </form>
    </div>
  );
};

export default LoginScreen;
