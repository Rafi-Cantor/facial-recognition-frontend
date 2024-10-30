import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import NewProfileUploader from "./pages/NewProfileUploader";
import GetProfile from "./pages/GetProfile";
import "./App.css";

function App() {
  return (
    <div id="main-content">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Get Profile</Link>
            </li>
            <li>
              <Link to="/new-profile-uploader">Upload New Profile</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<GetProfile />} />
          <Route
            path="/new-profile-uploader"
            element={<NewProfileUploader />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
