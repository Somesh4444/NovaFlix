import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { Play, Sparkles, Tv, Layers, Shield, Star, ArrowRight, ArrowLeftRight, Search } from 'lucide-react';
import Trending from "../common/Trending";
import Popular from "../common/Popular";
import TopRated from "../common/TopRated";
import { API_KEY, IMAGE_BASE_URL } from "../../apiConfig";

// Comprehensive TMDB Genre ID dictionary
const GENRE_MAP = {
  28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime",
  99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History",
  27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Sci-Fi",
  10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western",
  10759: "Action & Adventure", 10762: "Kids", 10763: "News", 10764: "Reality",
  10765: "Sci-Fi & Fantasy", 10766: "Soap", 10767: "Talk", 10768: "War & Politics"
};

export default function Home() {
  const [heroMovies, setHeroMovies] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // 1. This state variable will hold the text as the user types
  const [searchQuery, setSearchQuery] = useState("");
  // 2. This function tool lets us change pages programmatically
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
        );
        
        if (!response.ok) throw new Error("Network response failed");
        
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
          // RANDOMIZER: Shuffle using Fisher-Yates method
          const shuffledResults = [...data.results];
          for (let i = shuffledResults.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledResults[i], shuffledResults[j]] = [shuffledResults[j], shuffledResults[i]];
          }

          // Pick 3 random items
          const randomThree = shuffledResults.slice(0, 3).map((item) => {
            const mediaType = item.media_type || (item.title ? "movie" : "tv");
            
            const detectedGenre = item.genre_ids && item.genre_ids.length > 0 
              ? GENRE_MAP[item.genre_ids[0]] 
              : null;
              
            const fallbackLabel = mediaType === "tv" ? "TV Series" : "Movie";

            return {
              id: item.id,
              type: mediaType, 
              image: item.backdrop_path 
                ? `${IMAGE_BASE_URL}${item.backdrop_path}` 
                : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop",
              title: item.title || item.name || item.original_title,
              genre: detectedGenre || fallbackLabel, 
              rating: item.vote_average ? item.vote_average.toFixed(1) : "8.0",
            };
          });
          
          setHeroMovies(randomThree);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to sync hero feed data node:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  useEffect(() => {
    if (heroMovies.length === 0) return;
    
    const slider = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroMovies.length);
    }, 4000);
    return () => clearInterval(slider);
  }, [heroMovies.length]);

  return (
    <div className="text-white overflow-hidden">
      <section className="relative min-h-screen overflow-hidden bg-[#030712] py-10 flex items-center">
        
        {/* ULTRA-PREMIUM GRID & AMBIENT GLOW SYSTEM */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-[#0f172a] via-[#030712] to-[#030712]"></div>
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[30px_30px]"></div>
          <div className="absolute top-[-20%] left-[10%] w-200 h-100 bg-linear-to-r from-cyan-500/20 to-emerald-500/10 blur-[160px] rounded-full transform -rotate-12"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-150 h-150 bg-blue-600/15 blur-[180px] rounded-full"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          {/* <div className="grid lg:grid-cols-12 gap-16 items-center"> */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* LEFT SIDE */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-white/1 to-white/4 border border-white/8 rounded-full backdrop-blur-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-gray-400 text-[11px] font-medium tracking-wider uppercase flex items-center gap-1">
                  <Sparkles size={12} className="text-cyan-400" /> Version 2.0 Streaming Engine
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.05]">
                Explore the World <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-emerald-400 to-blue-500">
                  of Entertainment.
                </span>
              </h1>

              <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                A high-performance cinematic ecosystem combining AI-driven taste processing, zero-buffer pipeline architectures.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <button className="group relative flex items-center gap-2 bg-linear-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/20">
                  <Play size={16} fill="currentColor" />
                  <span>Launch Platform</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>

                <button className="group flex items-center gap-2 bg-white/2 hover:bg-white/6 border border-white/8 hover:border-white/15 px-8 py-4 rounded-xl font-semibold text-gray-200 transition-all duration-300 backdrop-blur-md">
                  <span>View Architecture</span>
                </button>
              </div>

              {/* ========================================================================= */}
              {/* 1. MOBILE & TABLET SEARCH BOX CONTAINER                                   */}
              {/* Visible on Mobile and Tablet, hides automatically on PC (>=1024px)       */}
              {/* ========================================================================= */}
              <div className="lg:hidden pt-8 border-t border-white/6 max-w-xl mx-auto">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchQuery.trim() !== "") {
                      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
                    }
                  }}
                  className="flex items-center bg-white/5 border border-cyan-400/10 rounded-2xl p-2 focus-within:border-cyan-400/40 transition-all duration-300 shadow-xl shadow-black/20"
                >
                  <div className="flex items-center flex-1 px-3">
                    <Search size={20} className="text-cyan-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search movies, TV shows, genres..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent outline-none text-base text-white placeholder:text-gray-500 ml-3 w-full font-medium"
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition active:scale-95 cursor-pointer shadow-md shadow-cyan-500/10 shrink-0"
                  >
                    Search
                  </button>
                </form>
              </div>

              {/* ========================================================================= */}
              {/* 2. PC-ONLY ENGINE FEATURES CONTAINER                                      */}
              {/* Hidden on Mobile & Tablet, shows ONLY on PC/Desktop (>=1024px)            */}
              {/* ========================================================================= */}
              <div className="hidden lg:block pt-8 border-t border-white/6 space-y-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Engine Features Included</p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-gray-400 text-sm">
                  <span className="flex items-center gap-1.5"><Tv size={14} className="text-cyan-400" /> 4K Spatial Audio</span>
                  <span className="flex items-center gap-1.5"><Layers size={14} className="text-emerald-400" /> Cloud Sync</span>
                  <span className="flex items-center gap-1.5"><Shield size={14} className="text-blue-400" /> DRM Protected</span>
                </div>
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="lg:col-span-5 relative w-full flex flex-col items-center justify-center min-h-125">
              <div className="absolute top-4 left-4 w-full max-w-105 aspect-4/5 rounded-3xl bg-slate-900/40 border border-white/3 opacity-40 transform scale-95 translate-x-12 translate-y-6 pointer-events-none hidden sm:block"></div>

              {loading ? (
                <div className="w-full max-w-110 aspect-16/13 bg-slate-900/40 border border-white/5 rounded-3xl flex items-center justify-center animate-pulse">
                  <span className="text-gray-500 font-mono text-xs">SYNCHRONIZING_NODES...</span>
                </div>
              ) : error ? (
                <div className="w-full max-w-110 aspect-16/13 bg-slate-950/50 border border-red-500/20 rounded-3xl flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-red-400 font-mono text-sm mb-2">CRITICAL_CONNECT_ERROR</span>
                  <p className="text-gray-500 text-xs">Unable to load feed elements. Verify API token parameters.</p>
                </div>
              ) : (
                <div className="relative w-full max-w-110 bg-linear-to-b from-slate-900/80 to-slate-950/90 border border-white/8 rounded-3xl p-4 shadow-2xl shadow-black/80 backdrop-blur-xl group transition-all duration-500 hover:border-white/15">
                  
                  {/* APP TOOLBAR */}
                  <div className="flex items-center justify-between border-b border-white/6 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                      </div>
                      <span className="text-[11px] font-mono text-gray-500 tracking-wider ml-2">{heroMovies[current]?.type === "tv" ? "✦ TV SHOW" : "✦ FEATURE MOVIE"}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 bg-white/5 border border-white/5 px-2 py-0.5 rounded-md text-[10px] text-cyan-400 font-mono">
                      <ArrowLeftRight size={10} /> SPOTLIGHT_CORE.SYS
                    </div>
                  </div>

                  {/* DISPLAY CONTAINER */}
                  <div className="relative aspect-16/10 w-full rounded-2xl overflow-hidden border border-white/5">
                    <img
                      src={heroMovies[current]?.image}
                      alt={heroMovies[current]?.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                    
                    <span className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md border border-white/10 text-emerald-400 text-[10px] font-mono px-2.5 py-1 rounded-md flex items-center gap-1 shadow-md">
                      <Star size={10} fill="currentColor" /> {heroMovies[current]?.rating} Rating
                    </span>
                  </div>

                  {/* LOWER META INFO PANELS */}
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="overflow-hidden">
                        <div className="inline-block">
                          <span className="text-[12px] font-bold text-cyan-400 tracking-widest uppercase bg-cyan-500/10 px-2.5 py-1 rounded font-mono">
                            {heroMovies[current]?.genre}
                          </span>
                        </div>
                        <h3 className="text-xl font-black text-white mt-2 tracking-tight uppercase line-clamp-1">
                          {heroMovies[current]?.title}
                        </h3>
                      </div>
                      
                      {/* TRACK CONTROLLER */}
                      <div className="flex items-center gap-1.5 bg-white/3 border border-white/6 p-1 rounded-lg shrink-0">
                        {heroMovies.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              current === index ? "w-5 bg-cyan-400" : "w-1.5 bg-white/20 hover:bg-white/40"
                            }`}
                            aria-label={`Data node ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* LAUNCH BUTTONS */}
                    <div className="grid grid-cols-12 gap-2 pt-1">
                      <Link 
                        to={`/details/${heroMovies[current]?.type}/${heroMovies[current]?.id}`}
                        className="col-span-12 flex items-center justify-center gap-2 text-xs font-bold bg-white hover:bg-cyan-400 text-slate-950 py-3.5 rounded-xl transition-all shadow-md text-center group"
                      >
                        <Play size={12} fill="currentColor" /> View Details
                      </Link>
                      {/* <button className="col-span-3 flex items-center justify-center rounded-xl bg-white/4 hover:bg-white/8 border border-white/8 text-white transition-all" title="Add to System Queue">
                        <Plus size={16} />
                      </button> */}
                    </div>
                  </div>

                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
}