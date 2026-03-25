import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import AddMoviePage from './pages/AddMoviePage';
import DashboardPage from './pages/DashboardPage';
import EditMoviePage from './pages/EditMoviePage';
import LoginPage from './pages/LoginPage';
import MoviesPage from './pages/MoviesPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="movies" element={<MoviesPage />} />
        <Route path="movies/add" element={<AddMoviePage />} />
        <Route path="movies/:id/edit" element={<EditMoviePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
