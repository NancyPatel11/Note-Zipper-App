import React, { useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import { createNote } from "../../features/note/noteSlice";
import ErrorMessage from "../../components/ErrorMessage";

function CreateNote() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const { isLoading, isError, isMessage, userInfo } = useSelector(
    (state) => state.notes
  );

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category) {
      setError("Please fill all the fields");
    } else {
      const noteData = {
        title,
        content,
        category,
      };
      dispatch(createNote(noteData));
      resetHadler();
      navigate("/mynotes");
    }
  };

  const resetHadler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  return (
    <MainScreen title="Create a Note">
      <Card>
        <Card.Header>Create a new Note</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content" className="mt-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content" className="mt-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {isLoading && <Loading size={50} />}
            <Button type="submit" variant="primary" className="mt-3">
              Create Note
            </Button>
            <Button
              className="mx-2 mt-3"
              variant="danger"
              onClick={resetHadler}
            >
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateNote;
