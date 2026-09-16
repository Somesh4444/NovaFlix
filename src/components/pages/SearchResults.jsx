import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Star, Play, Home, Search, ChevronRight } from "lucide-react";
import { API_KEY } from "../../apiConfig";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1`
        );
        const data = await response.json();
        
        if (data.results) {
          // Keep only movies and TV shows
          const filteredData = data.results.filter(
            (item) => item.media_type === "movie" || item.media_type === "tv"
          );
          setResults(filteredData);
        }
      } catch (error) {
        console.error("Error searching database:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white font-medium">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          <span>Searching global archives...</span>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#020617] text-gray-100 py-12 select-none">
      <div className="max-w-7xl mx-auto px-6">

        {/* BREADCRUMB */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-white/5 pb-6">
          <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 bg-white/5 border border-white/5 w-fit px-4 py-2 rounded-xl backdrop-blur-md">
            <Link to="/" className="flex items-center gap-1 hover:text-cyan-400 transition">
              <Home size={12} /> Discover
            </Link>
            <ChevronRight size={10} className="text-gray-600" />
            <span className="flex items-center gap-1 text-gray-500">
              <Search size={12} /> Search
            </span>
            <ChevronRight size={10} className="text-gray-600" />
            <span className="text-gray-300 font-bold tracking-wide">
              Results
            </span>
          </nav>
        </div>

        {/* MAIN SECTION TITLE */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-wide">
            Search Results for: <span className="text-cyan-400">"{query}"</span>
          </h2>
          <p className="text-gray-400 mt-1">
            Found {results.length} matches across Movies and TV Shows.
          </p>
        </div>

        {/* CONDITIONAL DISPLAY GRID */}
        {results.length === 0 ? (
          <div className="text-center py-20 bg-white/5 border border-white/5 rounded-3xl p-8">
            <p className="text-gray-400 font-medium text-sm">
              No matching catalogs found. Please check your spelling or try another keyword.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-2">
            {results.map((item) => {
              // Safely pull date whether it's a movie or a TV show
              const releaseYear = item.release_date 
                ? item.release_date.split("-")[0] 
                : item.first_air_date 
                ? item.first_air_date.split("-")[0] 
                : "N/A";

              return (
                <Link
                  key={item.id}
                  to={`/details/${item.media_type}/${item.id}`}
                  className="group relative flex flex-col w-full h-full cursor-pointer bg-white/5 border border-white/5 hover:border-cyan-500/20 rounded-2xl p-2 transition-all duration-300 hover:bg-white/10 hover:shadow-xl hover:shadow-cyan-500/5"
                >
                  {/* Poster Display Box */}
                  <div className="relative aspect-2/3 w-full rounded-xl overflow-hidden bg-slate-900">
                    <img
                      src={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                          : "https://placehold.co/500x750?text=No+Poster"
                      }
                      alt={item.title || item.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                    {/* Rating Badge Overlay */}
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded-lg border border-white/10 flex items-center gap-0.5 z-10">
                      <Star size={9} fill="#22d3ee" className="text-cyan-400" />
                      <span className="text-[10px] font-bold text-gray-200">
                        {item.vote_average?.toFixed(1) || "0.0"}
                      </span>
                    </div>

                    {/* Media Type Badge Overlay (Movie vs TV) */}
                    <div className="absolute top-2 left-2 bg-cyan-500/10 backdrop-blur-md border border-cyan-400/30 text-cyan-400 text-[9px] font-black tracking-wider px-2 py-0.5 rounded-md uppercase z-10">
                      {item.media_type === "movie" ? "Movie" : "Series"}
                    </div>

                    {/* Play Action Visual Interface Wrapper */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <div className="w-9 h-9 rounded-full bg-cyan-400 text-black flex items-center justify-center shadow-lg shadow-cyan-400/20 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <Play size={14} fill="black" className="ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Info / Metadata Layout Segment */}
                  <div className="mt-2.5 px-1 flex flex-col gap-0.5">
                    <h3 className="text-xs sm:text-sm font-bold text-gray-200 group-hover:text-cyan-400 transition truncate">
                      {item.title || item.name}
                    </h3>

                    <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold mt-0.5">
                      <span className="truncate pr-1 capitalize">{item.media_type}</span>

                      <span className="text-gray-600 text-[10px] bg-white/5 px-1.5 py-0.5 rounded-md group-hover:text-cyan-400/80 group-hover:bg-cyan-500/5 transition shrink-0">
                        {releaseYear}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}