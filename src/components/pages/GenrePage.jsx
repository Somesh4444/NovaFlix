import { useEffect, useState, useMemo } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { Star, Play, ChevronRight, Home, Film, SlidersHorizontal, Grid, Plus } from "lucide-react";

export default function GenrePage() {
  // Reads the dynamic numeric ID from /genre/:genreId
  const { genreId } = useParams();
  // Reads the human-readable text name parameter passed via the search query (?name=Action)
  const [searchParams] = useSearchParams();
  const genreName = searchParams.get("name") || "Genre";

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");
  const [showDropdown, setShowDropdown] = useState(false);

  const API_KEY = "1476cff43fbcd08886135a08bf98665e";

  // Reset page and data arrays completely if the user switches genres via the navigation menu
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setError(null);
  }, [genreId]);

  // Wrapped sorting metrics inside an isolated hook memory footprint
  const sortedMovies = useMemo(() => {
    const moviesCopy = [...movies];
    switch (sortBy) {
      case "rating":
        return moviesCopy.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
      case "date":
        return moviesCopy.sort((a, b) => new Date(b.release_date || 0) - new Date(a.release_date || 0));
      case "popularity":
        return moviesCopy.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      default:
        return movies;
    }
  }, [movies, sortBy]);

  useEffect(() => {
    let isMounted = true;

    const fetchGenreMovies = async () => {
      try {
        if (page === 1) setLoading(true);
        else setLoadingMore(true);

        // Discovers movies strictly matching our dynamic genre metric footprint ID
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}&language=en-US`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (isMounted) {
          setMovies((prevMovies) => {
            const incomingResults = data.results || [];
            // Filter incoming movies to make sure their IDs don't already exist
            const uniqueIncoming = incomingResults.filter(
              (newMovie) => !prevMovies.some((oldMovie) => oldMovie.id === newMovie.id)
            );
            return page === 1 ? incomingResults : [...prevMovies, ...uniqueIncoming];
          });
        }
      } catch (err) {
        console.error("Failed to fetch genre components:", err);
        if (isMounted) setError(`Failed to load ${genreName} movies. Please check connection.`);
      } finally {
        if (isMounted) {
          setLoading(false);
          setLoadingMore(false);
        }
      }
    };

    fetchGenreMovies();

    return () => {
      isMounted = false;
    };
  }, [genreId, page]);

  if (loading && page === 1) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white font-medium">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading {genreName} Database...</span>
        </div>
      </div>
    );
  }

  if (error && movies.length === 0) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-red-400 p-4 text-center">
        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl max-w-md">
          <p className="font-bold mb-2">An Error Occurred</p>
          <p className="text-sm text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#020617] text-gray-100 py-12 select-none">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* DYNAMIC HEADER CONTROLS */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-white/5 pb-6">
          
          {/* Breadcrumb Navigation showing current active Genre */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 bg-white/5 border border-white/5 w-fit px-4 py-2 rounded-xl backdrop-blur-md">
            <Link to="/" className="flex items-center gap-1 hover:text-cyan-400 transition">
              <Home size={12} /> Discover
            </Link>
            <ChevronRight size={10} className="text-gray-600" />
            <span className="flex items-center gap-1 text-gray-500">
              <Film size={12} /> Genres
            </span>
            <ChevronRight size={10} className="text-gray-600" />
            <span className="text-gray-300 font-bold tracking-wide capitalize">
              {genreName}
            </span>
          </nav>

          <div className="flex items-center gap-3 self-start sm:self-auto text-xs font-bold text-gray-400">
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/5 px-3 py-2 rounded-xl">
              <Grid size={13} className="text-cyan-400" />
              <span>{movies.length} Elements Loaded</span>
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className={`flex items-center gap-1.5 bg-white/5 border px-3 py-2 rounded-xl hover:border-cyan-400 hover:text-cyan-400 transition cursor-pointer select-none ${
                  showDropdown ? "border-cyan-500 text-cyan-400" : "border-white/5"
                }`}
              >
                <SlidersHorizontal size={13} />
                <span className="capitalize">
                  {sortBy === "default" ? "Refine Index" : `Sort: ${sortBy}`}
                </span>
              </button>

              {showDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
                  <div className="absolute right-0 mt-2 w-44 bg-[#0b1329] border border-white/10 rounded-xl shadow-2xl p-1.5 z-20 flex flex-col gap-0.5 backdrop-blur-xl">                    
                    <button
                      onClick={() => { setSortBy("default"); setShowDropdown(false); }}
                      className={`text-left text-xs font-semibold px-2.5 py-2 rounded-lg transition ${
                        sortBy === "default" ? "bg-cyan-500/10 text-cyan-400" : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      Default Popular
                    </button>

                    <button
                      onClick={() => { setSortBy("rating"); setShowDropdown(false); }}
                      className={`text-left text-xs font-semibold px-2.5 py-2 rounded-lg transition ${
                        sortBy === "rating" ? "bg-cyan-500/10 text-cyan-400" : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      Highest Rating
                    </button>

                    <button
                      onClick={() => { setSortBy("date"); setShowDropdown(false); }}
                      className={`text-left text-xs font-semibold px-2.5 py-2 rounded-lg transition ${
                        sortBy === "date" ? "bg-cyan-500/10 text-cyan-400" : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      Latest Release
                    </button>

                    <button
                      onClick={() => { setSortBy("popularity"); setShowDropdown(false); }}
                      className={`text-left text-xs font-semibold px-2.5 py-2 rounded-lg transition ${
                        sortBy === "popularity" ? "bg-cyan-500/10 text-cyan-400" : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      Mass Popularity
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* DYNAMIC TITLE */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-wide capitalize">
            {genreName} <span className="text-cyan-400">Library</span>
          </h2>
        </div>

        {/* CLONED GRID FRAMEWORK */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-2">
          {sortedMovies.map((movie) => (
            <div
              key={movie.id}
              className="group relative flex flex-col w-full h-full bg-white/5 border border-white/5 hover:border-cyan-500/20 rounded-2xl p-2 transition-all duration-300 hover:bg-white/10 hover:shadow-xl hover:shadow-cyan-500/5"
            >
              {/* Poster Asset Wrap */}
              <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-slate-900">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://placehold.co/500x750?text=No+Image"
                  }
                  alt={movie.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {/* Live Rating Panel */}
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded-lg border border-white/10 flex items-center gap-0.5">
                  <Star size={9} fill="#22d3ee" className="text-cyan-400" />
                  <span className="text-[10px] font-bold text-gray-200">
                    {movie.vote_average?.toFixed(1) || "0.0"}
                  </span>
                </div>

                {/* Score Rating Badges */}
                <div className="absolute top-2 left-2 bg-cyan-500/10 backdrop-blur-md border border-cyan-400/30 text-cyan-400 text-[9px] font-black tracking-wider px-2 py-0.5 rounded-md uppercase">
                  {movie.vote_average >= 7.5 ? "Blockbuster" : "Popular"}
                </div>

                {/* Dynamic Play Link Hover Capture */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link to={`/details/movie/${movie.id}`}>
                    <div className="w-9 h-9 rounded-full bg-cyan-400 text-black flex items-center justify-center shadow-lg shadow-cyan-400/20 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Play size={14} fill="black" className="ml-0.5" />
                    </div>
                  </Link>
                </div>
              </div>

              {/* Text Layout Metadata */}
              <div className="mt-2.5 px-1 flex flex-col gap-0.5">
                <h3 className="text-xs sm:text-sm font-bold text-gray-200 group-hover:text-cyan-400 transition truncate">
                  {movie.title}
                </h3>

                <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold mt-0.5">
                  <span className="truncate pr-1 capitalize text-cyan-400/60 font-mono text-[10px]">
                    {genreName}
                  </span>

                  <span className="text-gray-600 text-[10px] bg-white/5 px-1.5 py-0.5 rounded-md group-hover:text-cyan-400/80 group-hover:bg-cyan-500/5 transition shrink-0">
                    {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION TRIGGER PANEL */}
        {movies.length > 0 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setPage((prevPage) => prevPage + 1)}
              disabled={loadingMore}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 hover:border-cyan-400 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-cyan-400 hover:text-white transition-all shadow-lg shadow-cyan-900/10 disabled:opacity-50 cursor-pointer"
            >
              {loadingMore ? (
                <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Plus size={14} />
              )}
              <span>{loadingMore ? "Indexing..." : "Load More Assets"}</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}