import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Authenticate from "./components/Authenticate";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Authenticate />} />
        <Route path="/" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
