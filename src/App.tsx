import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Swap from "./miden/Swap";

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
      </Routes>
    </HashRouter>
  );
}

export default App;
