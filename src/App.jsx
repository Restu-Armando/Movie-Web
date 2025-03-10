import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import MovieList from "./Page/MovieList";
import MovieDetail from "./Page/MovieDetail";
import RegisterPage from "./Page/RegisterPage";
import LoginPage from "./Page/LoginPage";
import Profile from "./Page/Profile";
import ProtectRoutes from "./components/ProtectRoutes";

import Navigation from "./components/Navigation";

import "./index.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/profile"
            element={
              <ProtectRoutes>
                <Profile />
              </ProtectRoutes>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
