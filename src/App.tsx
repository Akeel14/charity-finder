import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CharityDetail from "./components/CharityDetail";
import Favorites from "./components/Favorites";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/charity/:id" element={<CharityDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
