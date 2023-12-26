import React, { useState, useEffect } from "react";
import MainScreen from "../../components/MainScreen";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { login, reset } from "../../features/auth/authSlice";
import "./LoginScreen.css";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      setError(message);
    }

    if (isSuccess || userInfo) {
      navigate("/mynotes");
    }
    dispatch(reset());
  }, [userInfo, isError, isLoading, isSuccess, message, navigate, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <MainScreen title="LOGIN">
      <div className="login-container">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {isLoading && <Loading />}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail" className="my-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="my-3">
            Submit
          </Button>
        </Form>
        <Row>
          <Col>
            New Customer ? <Link to="/register"> Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}

export default LoginScreen;
