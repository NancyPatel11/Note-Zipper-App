import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset, getNotes, deleteNote } from "..//../features/note/noteSlice";
import { Button, Card, Badge, Accordion } from "react-bootstrap";

function MyNotes({ search }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { allNotes, isLoading, isError, message } = useSelector(
    (state) => state.notes
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!userInfo) {
      navigate("/login");
    }

    dispatch(getNotes());

    return () => {
      dispatch(reset());
    };
  }, [userInfo, navigate, dispatch, isError, message]);

  return (
    <MainScreen title={`Welcome back ${userInfo.name}`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>
      {allNotes && allNotes.length > 0 ? (
        allNotes
          .filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((note) => (
            <Accordion defaultActiveKey={["0"]} key={note._id}>
              <Accordion.Item eventkey="0">
                <Card style={{ margin: 10 }}>
                  <Card.Header style={{ display: "flex" }}>
                    <span
                      style={{
                        color: "black",
                        textDecoration: "none",
                        flex: 1,
                        cursor: "pointer",
                        alignSelf: "center",
                        fontSize: 18,
                      }}
                    >
                      <Accordion.Button as={Card.Text} variant="link">
                        {note.title}
                      </Accordion.Button>
                    </span>
                    <div>
                      <Link to={`/updatenote/${note._id}`}>
                        <Button>Edit</Button>
                      </Link>
                      <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => {
                          if (window.confirm("Are you sure?")) {
                            dispatch(deleteNote(note._id));
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse>
                    <Card.Body>
                      <h4>
                        <Badge bg="success" text="light">
                          Category - {note.category}{" "}
                        </Badge>
                      </h4>

                      <blockquote className="blockquote mb-0">
                        <p className="mb-0">{note.content}</p>
                        <footer className="blockquote-footer">
                          <p
                            className="mb-0 mx-3"
                            style={{ display: "inline" }}
                          >
                            Created on - {note.createdAt.substring(0, 10)}
                          </p>
                          <p
                            className="mb-0 mx-3"
                            style={{ display: "inline" }}
                          >
                            Updated on - {note.updatedAt.substring(0, 10)}
                          </p>
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion.Item>
            </Accordion>
          ))
      ) : (
        <h1 className="display-5 mt-5">No notes found!</h1>
      )}
    </MainScreen>
  );
}

export default MyNotes;
