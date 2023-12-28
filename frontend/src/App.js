import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./screens/Landing/LandingPage";
import MyNotes from "./screens/MyNotes/MyNotes";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateNote from "./screens/CreateNote/CreateNote";
import UpdateNote from "./screens/UpdateNote/UpdateNote";

function App() {
  const [search, setSearch] = useState("");
  return (
    <Router>
      <Header setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/mynotes" element={<MyNotes search={search} />} />
        <Route path="/createnote" element={<CreateNote />} />
        <Route path="/updatenote/:noteId" element={<UpdateNote />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
