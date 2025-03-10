import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <Container className="py-5 text-center d-grid justify-content-center align-content-center vh-100">
      <h2>Profile</h2>
      <p>Welcome, {user?.email}!</p>
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
      <Button variant="primary my-2" onClick={handleHome}>
        Home
      </Button>
    </Container>
  );
};

export default Profile;
