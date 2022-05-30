import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import Bills from "./components/Bills/Bills";
import { apiClient } from "./utils/apiClient";
import { ApiMethods } from "./types";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { API_TOKEN_CHECK } from "./apiRoutes";
import { useAuthContext } from "./context/AuthContext";
import NoMatch from "./components/NoMatch/NoMatch";
import { toast, ToastContainer } from "react-toastify";
import Register from "./components/Register/Register";

const App = () => {
  const { setIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidation = async () => {
      if (localStorage.getItem("loginToken")) {
        apiClient(`http://localhost:3000${API_TOKEN_CHECK}`, ApiMethods.GET)
          .then(() => navigate("/dashboard"))
          .catch(() => {
            toast.error("Token expired");
          });
      } else {
        setIsAuthenticated(false);
      }
    };

    checkTokenValidation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsAuthenticated]);

  return (
    <div className="App">
      <Header />
      <div className="content">
        <Routes>
          <Route index element={<LoginScreen />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bills"
            element={
              <ProtectedRoute>
                <Bills />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
