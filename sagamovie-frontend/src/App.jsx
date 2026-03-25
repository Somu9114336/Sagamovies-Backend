import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import { AuthProvider } from "./context/AuthContext";
import { MoviesProvider } from "./context/MoviesContext";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <AuthProvider>
      <MoviesProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
            <Route path="/movies/:movieId" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MoviesProvider>
    </AuthProvider>
  );
}

export default App;
