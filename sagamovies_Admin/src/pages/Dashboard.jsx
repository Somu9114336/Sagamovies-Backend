import { useState, useEffect } from 'react';
import api from '../services/api';
import StatsCard from '../components/StatsCard';
import MovieCard from '../components/MovieCard';
import { Film, Calendar, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalMovies: 0,
    moviesToday: 0,
    popularMovies: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Assuming backend has endpoints for stats
      // For now, we'll fetch all movies and calculate stats
      const response = await api.get('/movie/get');
      const movies = response.data;

      const today = new Date().toDateString();
      const moviesToday = movies.filter(movie => {
        const movieDate = new Date(movie.createdAt || movie.releaseYear).toDateString();
        return movieDate === today;
      }).length;

      // Sort by rating for popular movies (assuming higher rating is popular)
      const popularMovies = movies
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 10);

      setStats({
        totalMovies: movies.length,
        moviesToday,
        popularMovies
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Movies"
          value={stats.totalMovies}
          icon={Film}
          color="blue"
        />
        <StatsCard
          title="Movies Added Today"
          value={stats.moviesToday}
          icon={Calendar}
          color="green"
        />
        <StatsCard
          title="Popular Movies"
          value={stats.popularMovies.length}
          icon={TrendingUp}
          color="yellow"
        />
      </div>

      {/* Popular Movies */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular Movies</h2>
        <div className="flex overflow-x-auto pb-4">
          {stats.popularMovies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 min-w-[18rem]">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;