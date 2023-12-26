import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import MainScreen from "../../components/MainScreen";
import ErrorMessage from "../../components/ErrorMessage";
import { Form, Button, Row, Col } from "react-bootstrap";
import { register, reset } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [picMessage, setPicMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

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

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
    } else {
      setError(null);
      const userData = { name, email, password };
      dispatch(register(userData));
    }
  };

  const postDetials = (picture) => {
    if (!picture) {
      return setPicMessage("Please select an image.");
    }
    setPicMessage(null);

    if (picture.type === "image/jpeg" || picture.type === "image/png") {
      const data = new FormData();
      data.append("file", picture);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "dh8ez2ujz");
      fetch("https://api.cloudinary.com/v1_1/dh8ez2ujz/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
        })
        .catch((err) => console.log(err));
    } else {
      setPicMessage("Please select an image");
    }
  };

  return (
    <MainScreen title="REGISTER">
      <div className="login-container">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {isLoading && <Loading />}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName" className="my-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

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

          <Form.Group controlId="confirmPassword" className="my-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Choose a file</Form.Label>
            <Form.Control
              onChange={(e) => postDetials(e.target.files[0])}
              type="file"
              className="form-control-file"
              style={{ display: "none" }}
            />
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Upload file"
                readonly
              />
              <label
                className="input-group-text"
                htmlFor="formFile"
                style={{ cursor: "pointer" }}
              >
                Browse
              </label>
            </div>
          </Form.Group>

          <Button variant="primary" type="submit" className="my-3">
            Submit
          </Button>
        </Form>
        <Row>
          <Col>
            Already a Customer ? <Link to="/login"> Login Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}

export default RegisterScreen;
