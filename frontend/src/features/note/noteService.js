import axios from "axios";

const API_URL = "/api/notes/";

const getNotes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(API_URL, config);

  return data;
};

const createNote = async (noteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "create", noteData, config);

  return response.data;
};

const updateNote = async (noteData, noteId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log("noteservice");
  const response = await axios.put(API_URL + noteId, noteData, config);

  console.log("noteservice", response.data);

  return response.data;
};

const deleteNote = async (noteId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log("noteId:", noteId);
  const response = await axios.delete(API_URL + noteId, config);

  console.log(response.data);
  return response.data;
};

const noteService = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};

export default noteService;
