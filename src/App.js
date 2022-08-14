import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IntroBoard from "./components/IntroBoard";
import PlayerBoard from "./components/PlayerBoard";
import GamePlay from "./components/GamePlay";
export default function App() {
  return (
    <Router basename={window.location.pathname || ""}>
      <Routes>
        <Route path="/" element={<IntroBoard />} />
        <Route path="/players" element={<PlayerBoard />} />
        <Route path="/gameplay" element={<GamePlay />} />
      </Routes>
    </Router>
  );
}
