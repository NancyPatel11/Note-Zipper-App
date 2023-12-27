const Note = require("../models/noteModel");
const asyncHandler = require("express-async-handler");

const getNotes = asyncHandler(async (req, res) => {
  // getting the notes for that specific user
  const notes = await Note.find({ user: req.user._id });

  res.status(200).json(notes);
});

const createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const note = await Note.create({
      user: req.user._id,
      title,
      content,
      category,
    });

    if (!note) {
      res.status(500);
      throw new Error("Server Error Occured!");
    } else {
      res.status(201).json(note);
    }
  }
});

const getNotebyId = asyncHandler(async (req, res) => {
  const noteId = req.params.id;

  const note = await Note.findById(noteId);

  if (!note) {
    res.status(404);
    throw new Error("No note found for this id");
  } else {
    res.status(200).json(note);
  }
});

const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot perform this action!");
  }

  if (!note) {
    res.status(404);
    throw new Error("No note found for this id");
  } else {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedNote);
  }
});

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot perform this action!");
  }

  if (!note) {
    res.status(404);
    throw new Error("No note found for this id");
  } else {
    await Note.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Note removed" });
  }
});

module.exports = { getNotes, createNote, getNotebyId, updateNote, deleteNote };
