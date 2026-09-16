import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Film, Star, Play, ArrowLeft } from "lucide-react";

export default function Watchlist() {
  // 🚀 FIXED: Read from localStorage directly during state initialization.
  // This bypasses useEffect entirely and eliminates cascading render warnings.
  const [watchlist, setWatchlist] = useState(() => {
    return JSON.parse(localStorage.getItem("watchlist")) || [];
  });

  // Function to safely remove items from state and localStorage
  const removeFromWatchlist = (id, type) => {
    const updatedList = watchlist.filter(
      (item) => !(String(item.id) === String(id) && item.type === type)
    );
    setWatchlist(updatedList);
    localStorage.setItem("watchlist", JSON.stringify(updatedList));
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white py-12 px-6 relative overflow-hidden select-none">
      
      {/* Background Ambient Glow Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        
        {/* Header Actions Panel */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-1">
              <Film size={12} /> User Workspace Engine
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
              My <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">Watchlist</span>
            </h1>
          </div>

          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-cyan-400 bg-white/5 border border-white/5 px-4 py-2.5 rounded-xl transition duration-300 self-start sm:self-auto"
          >
            <ArrowLeft size={16} /> Back to Discover
          </Link>
        </div>

        {/* Dynamic Display Logic Conditional Block */}
        {watchlist.length === 0 ? (
          /* EMPTY STATE CONTAINER */
          <div className="flex flex-col items-center justify-center text-center py-24 bg-slate-900/20 border border-dashed border-white/5 rounded-3xl p-8 max-w-xl mx-auto backdrop-blur-xl">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4 border border-cyan-500/20 shadow-lg shadow-cyan-500/5">
              <Film size={28} />
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Your Watchlist is Empty</h3>
            <Link 
              to="/movies" 
              className="mt-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition active:scale-95 shadow-md shadow-cyan-500/15"
            >
              Explore Somthing
            </Link>
          </div>
        ) : (
          /* CONTENT DISPLAY GRID */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {watchlist.map((item) => {
              const currentRating = item.vote_average || item.rating;
              const displayTitle = item.title || item.name;
              const currentPoster = item.poster_path || item.image;

              return (
                <div 
                  key={`${item.type || 'movie'}-${item.id}`}
                  className="group relative bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md flex flex-col transition-all duration-300 hover:border-white/15 hover:shadow-xl hover:shadow-black/40"
                >
                  {/* Poster Display Wrapper */}
                  <div className="relative aspect-2/3 w-full overflow-hidden bg-slate-950">
                    <img 
                      src={currentPoster ? `https://image.tmdb.org/t/p/w500${currentPoster}` : "https://placehold.co/500x750?text=No+Poster+Found"} 
                      alt={displayTitle} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Backdrop Gradient Shading Overlays */}
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link 
                        to={`/details/${item.type || 'movie'}/${item.id}`}
                        className="w-12 h-12 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition duration-300 cursor-pointer"
                      >
                        <Play size={20} fill="currentColor" className="ml-0.5" />
                      </Link>
                    </div>

                    {/* Rating Badge */}
                    {currentRating !== undefined && currentRating !== null && (
                      <span className="absolute top-2.5 right-2.5 bg-slate-950/80 backdrop-blur-md border border-white/10 text-cyan-400 text-[10px] font-mono px-2 py-0.5 rounded-md flex items-center gap-1 shadow-md z-10">
                        <Star size={10} fill="currentColor" className="text-cyan-400" /> {parseFloat(currentRating).toFixed(1)}
                      </span>
                    )}

                    {/* Top Left Remove Trigger Action Overlay */}
                    <button 
                      onClick={() => removeFromWatchlist(item.id, item.type || 'movie')}
                      className="absolute top-2.5 left-2.5 opacity-0 group-hover:opacity-100 bg-red-500/20 hover:bg-red-500 border border-red-500/30 text-white p-2 rounded-md transition duration-300 shadow-md z-10 cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>

                  {/* Lower Text Parameters Block */}
                  <div className="p-3 flex-1 flex flex-col justify-between gap-1 bg-slate-950/20">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-wider uppercase block">
                      {item.type === "tv" ? "TV Show" : "Movie"}
                    </span>
                    <h3 className="text-sm font-bold text-white tracking-tight uppercase line-clamp-1 group-hover:text-cyan-400 transition duration-300">
                      {displayTitle}
                    </h3>
                    <button
                        onClick={() => removeFromWatchlist(item.id, item.type || "movie")}
                        className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 text-red-300 text-xs font-semibold transition"
                        >
                        <Trash2 size={14} className="shrink-0" />
                        <span className="truncate">Remove</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}