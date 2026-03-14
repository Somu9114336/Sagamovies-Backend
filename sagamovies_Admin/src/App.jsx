import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import AddMovie from './pages/AddMovie';
import ShowAllMovies from './pages/ShowAllMovies';
import EditMovie from './pages/EditMovie';
import DeleteMovie from './pages/DeleteMovie';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-movie" element={<AddMovie />} />
          <Route path="show-movies" element={<ShowAllMovies />} />
          <Route path="edit-movie" element={<EditMovie />} />
          <Route path="delete-movie" element={<DeleteMovie />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;