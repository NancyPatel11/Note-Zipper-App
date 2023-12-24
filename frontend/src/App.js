import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./screens/Landing/LandingPage";

function App() {
  return (
    <>
      <Header />
      <main style={{ minHeight: "93vh" }}>
        <LandingPage />
      </main>
      <Footer />
    </>
  );
}

export default App;
