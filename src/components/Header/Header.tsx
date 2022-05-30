import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import styles from "./Header.module.scss";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  return (
    <header className={styles.root}>
      <h1>Expense Tracker</h1>
      <div>
        {isAuthenticated ? (
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
        ) : (
          <Button
            onClick={() => {
              navigate("/register");
            }}
            className={styles.button}
            variant="contained"
          >
            Register
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
