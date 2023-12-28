import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../features/auth/authSlice";
import Loading from "../../components/Loading";
import "./ProfileScreen.css";

function ProfileScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();

  const { userInfo, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      console.log(userInfo);
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password === confirmPassword)
      dispatch(updateProfile({ name, email, password, pic }));
  };

  const postDetails = (picture) => {
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
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data && data.url) {
            setPic(data.url.toString()); // Update the pic state with the new URL
            console.log(data.url);
          } else {
            console.error("Invalid response from Cloudinary:", data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  return (
    <MainScreen title="Edit Profile">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {isLoading && <Loading />}
              {isSuccess && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              {isError && (
                <ErrorMessage variant="danger">{message}</ErrorMessage>
              )}
              <Form.Group controlId="name" className="mt-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email" className="mt-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword" className="mt-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>{" "}
              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}
              <Form.Group controlId="formFile" className="mt-3">
                <Form.Label>Choose a file</Form.Label>
                <Form.Control
                  onChange={(e) => postDetails(e.target.files[0])}
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
              <Button type="submit" varient="primary" className="mt-3">
                Update
              </Button>
            </Form>
          </Col>
          <Col className="d-flex align-items-center justify-content-center">
            <img src={pic} alt={userInfo.name} className="profilePic" />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}

export default ProfileScreen;
