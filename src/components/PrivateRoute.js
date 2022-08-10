import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, ...rest }) => {
  const { user: currentUser } = useSelector((state) => {
    return state.authReducer;
  });

  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
