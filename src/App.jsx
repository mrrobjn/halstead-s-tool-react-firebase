import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import FilePage from "./pages/FilePage";
import ReportPage from "./pages/ReportPage";
import LoginPage from "./pages/LoginPage";
const App = () => {
  return (
    <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="file" element={<FilePage />} />
            <Route path="report" element={<ReportPage />} />
          </Routes>
    </Router>
  );
};

export default App;
