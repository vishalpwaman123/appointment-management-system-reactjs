import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./components/authentication/SignIn";
import UserDashboard from "./components/user/UserDashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/UserDashboard" element={<UserDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
