import React, { useContext } from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth";

const AuthRoute = ({ element, ...rest }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation(); // To pass the current location to Navigate

  // Check if the user is authenticated
  return user ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    element
  );
};

export default AuthRoute;
