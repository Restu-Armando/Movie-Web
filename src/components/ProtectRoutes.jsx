import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Spinner } from "react-bootstrap";

const ProtectRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <Spinner animation="border" />;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectRoutes;
