import { Navigate, useLocation } from "react-router-dom";

const NoMatch = () => {
  const location = useLocation();
  return <Navigate to="/" replace state={{ from: location }} />
}

export default NoMatch;