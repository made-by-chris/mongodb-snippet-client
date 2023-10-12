import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Auth from "./components/Auth";
import Navbar from "./components/Navbar";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/auth/web" element={<Auth />} />
          <Route path="/:snippet_id?" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
