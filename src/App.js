import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState, useEffect  } from "react";

function App() {
  const [alert, setAlert] = useState(null);

  const showalert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <NoteState>
      <Router>
        <Navbar showalert={showalert}/>
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route path="/home" element={<Home showalert={showalert}/>} />
            <Route path="/" element={<Login showalert={showalert}/>} />
            <Route path="/about" element={<About showalert={showalert}/>} />
            <Route path="/login" element={<Login showalert={showalert}/>} />
            <Route path="/signup" element={<Signup showalert={showalert}/>} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;


