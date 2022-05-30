import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_PROFILE } from "../../apiRoutes";
import { useAuthContext } from "../../context/AuthContext";
import { ApiMethods, User } from "../../types";
import { apiClient } from "../../utils/apiClient";
import styles from "./Header.module.scss";

const Header = () => {
  const [user, setUser] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await apiClient<User>(
        `http://localhost:3000${API_PROFILE}`,
        ApiMethods.POST
      );

      if (data) {
        setUser(data.name);
      }
    };
    isAuthenticated && fetchProfile();
  }, [isAuthenticated]);

  const handleClick = () => {
    if (location.pathname === "/") navigate("/register");

    if (location.pathname === "/register") navigate("/");
  };

  return (
    <header className={styles.root}>
      <h1>Expense Tracker</h1>
      <div className={styles.info}>
        {isAuthenticated ? (
          <>
            <div>
              <h2>Hello {user}</h2>
            </div>
            <Button
              onClick={() => {
                localStorage.removeItem("loginToken");
                setIsAuthenticated(false);
                navigate("/");
              }}
              className={styles.button}
              variant="contained"
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            onClick={handleClick}
            className={styles.button}
            variant="contained"
          >
            {location.pathname === "/" ? "Register" : "Login"}
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
