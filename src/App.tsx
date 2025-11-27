import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Swap from "./miden/Swap";
import P2ID from "./miden/P2ID";

function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <nav></nav>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/miden/swap" element={<Swap />} />
        <Route path="/miden/p2id" element={<P2ID />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
