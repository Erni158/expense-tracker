import styles from "./LoginScreen.module.scss";

import * as yup from "yup";
import { Button, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { apiClient } from "../../utils/apiClient";
import { API_LOGIN } from "../../apiRoutes";
import { ApiMethods, User } from "../../types";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface LoginFormFields {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email().required("Please enter your email"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(7, "Password is too short - should be 8 chars minimum.")
}).required();

const LoginScreen = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormFields>({
    reValidateMode: "onSubmit",
    resolver: yupResolver(schema)
  });
  const { setIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormFields> = (data) => {
    apiClient<User>(`http://localhost:3000${API_LOGIN}`, ApiMethods.POST, {
      ...data
    })
    .then((result) => {
      if (result) {
        localStorage.setItem("loginToken", result.token);
        setIsAuthenticated(true);
        navigate('/dashboard');
      }
    })
  }
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
        <Button
          className={styles.button}
          variant="contained"
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  )
}

export default LoginScreen