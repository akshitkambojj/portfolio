import { useState } from "react";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Home from "./pages/Home";
import "./App.css";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Film grain noise overlay */}
      <div className="noise-overlay" />

      {/* Custom magnetic cursor */}
      <Cursor />

      {/* Cinematic preloader */}
      <Preloader onComplete={() => setLoaded(true)} />

      {/* Main content — shown after preloader finishes */}
      {loaded && <Home />}
    </>
  );
}