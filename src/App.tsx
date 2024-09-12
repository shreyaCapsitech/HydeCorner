import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./assets/User/Login";
import User from "./assets/User/User";
import ChangePassword from "./assets/User/ChangePassword";
import Admin from "./assets/Admin/Admin";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/changePassword" element={<ChangePassword />} />
            <Route path="/user" element={<User />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
