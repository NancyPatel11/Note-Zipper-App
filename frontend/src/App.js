import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./screens/Landing/LandingPage";
import MyNotes from "./screens/MyNotes/MyNotes";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mynotes" element={<MyNotes />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
