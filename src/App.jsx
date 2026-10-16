import "./App.css";
import { Button } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
