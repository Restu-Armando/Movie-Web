import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";

const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("⚠️ Email dan Password wajib diisi!");
      return;
    }

    if (register(email, password)) {
      navigate("/profile"); // Redirect to Login after registration is successful
    }
  };

  return (
    <Container className="py-5 d-grid justify-content-center align-content-center vh-100">
      <h2 className="mb-4 text-center fw-bold fs-1">Register</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button className="w-100" type="submit" variant="primary">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterPage;
