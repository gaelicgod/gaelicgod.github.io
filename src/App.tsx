import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Swap from "./miden/Swap";
import P2ID from "./miden/P2ID";
import P2IDE from "./miden/P2IDE";
import MINT from "./miden/MINT";

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
        <Route path="/miden/p2ide" element={<P2IDE />} />
        <Route path="/miden/mint" element={<MINT />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
