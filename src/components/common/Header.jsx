import { useState, useEffect } from "react";
import { Search, Menu, X, ChevronDown, Bookmark} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { API_KEY } from "../../apiConfig";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGenreOpen, setIsGenreOpen] = useState(false);

  // 1. This state variable will hold the text as the user types
  const [searchQuery, setSearchQuery] = useState("");
  // 2. This function tool lets us change pages programmatically
  const navigate = useNavigate();
  
  // Dynamic state container to hold the genres returned from TMDB
  const [genres, setGenres] = useState([]);

  // FETCH DYNAMIC GENRE DATA SYSTEM ON MOUNT
  useEffect(() => {
    const fetchLiveGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        if (!response.ok) throw new Error("Failed to pull raw endpoint metrics");
        const data = await response.json();
        
        if (data.genres) {
          // Slice the top 6 standard genres to fit beautifully into your custom UI layout grid
          setGenres(data.genres.slice(0, 10));
        }
      } catch (err) {
        console.error("Failed loading layout system route nodes:", err);
        // Clean fallback in case network layer drops completely
        setGenres([
          { id: 28, name: "Action" },
          { id: 18, name: "Drama" },
          { id: 35, name: "Comedy" }
        ]);
      }
    };

    fetchLiveGenres();
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-500/10 bg-[#07111f]/80 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 z-50">
          <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <span className="text-black text-xl font-black">N</span>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white tracking-wide">
              Nova<span className="text-cyan-400">flix</span>
            </h1>
            <p className="text-xs text-cyan-200/60 -mt-1">
              Modern Streaming Platform
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className="text-gray-300 hover:text-cyan-400 transition duration-300">
            Discover
          </Link>
          <Link to="/movies" className="text-gray-300 hover:text-cyan-400 transition duration-300">
            Movies
          </Link>
          <Link to="/series" className="text-gray-300 hover:text-cyan-400 transition duration-300">
            Series
          </Link>

          {/* Genre Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => setIsGenreOpen(!isGenreOpen)}
              onBlur={() => setTimeout(() => setIsGenreOpen(false), 200)}
              className="flex items-center gap-1 text-gray-300 hover:text-cyan-400 transition duration-300 cursor-pointer focus:outline-none"
            >
              Genre
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${isGenreOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isGenreOpen && (
              <div className="absolute top-full left-0 mt-3 w-44 bg-[#0d1e36] border border-cyan-400/10 rounded-2xl p-2 shadow-xl z-50">
                <div className="grid grid-cols-1 gap-1">
                  {/* CHANGED: Passing the direct TMDB numeric ID inside the route state parameters */}
                  {genres.map((genre) => (
                    <Link
                      key={genre.id}
                      to={`/genre/${genre.id}?name=${encodeURIComponent(genre.name)}`}
                      className="px-4 py-2 text-sm text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 rounded-xl transition"
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link to="/about" className="text-gray-300 hover:text-cyan-400 transition duration-300">
            About
          </Link>
          <Link 
            to="/watchlist" 
            className="flex items-center gap-1.5 text-gray-300 hover:text-cyan-400 transition duration-300 bg-white/5 border border-white/5 hover:border-cyan-500/20 px-3 py-2.5 rounded-xl"
          >
            <Bookmark size={14} className="text-cyan-400" />
            <span>My Watchlist</span>
          </Link>
        </nav>

        {/* Desktop Search Box */}
        <div className="hidden md:flex items-center w-70 bg-white/5 border border-cyan-400/10 rounded-2xl px-4 py-3 focus-within:border-cyan-400/40 transition">
          <Search size={18} className="text-cyan-300" />
          <input
            type="text"
            placeholder="Search movies, shows, genres..."
            className="bg-transparent outline-none text-sm text-white placeholder:text-gray-500 ml-3 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchQuery.trim() !== "") {
                navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
              }
            }}
          />
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-cyan-300 z-50 focus:outline-none cursor-pointer"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer Menu Overhang */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-19.25 h-[calc(100vh-77px)] bg-[#07111f] border-t border-white/5 px-6 py-8 z-40 flex flex-col gap-6 overflow-y-auto overscroll-contain pb-20">

          {/* Mobile Menu Links */}
          <nav className="flex flex-col gap-6 text-lg font-medium">
            <Link to="/" onClick={closeMobileMenu} className="text-gray-300 hover:text-cyan-400 transition">Discover</Link>
            <Link to="/movies" onClick={closeMobileMenu} className="text-gray-300 hover:text-cyan-400 transition">Movies</Link>
            <Link to="/series" onClick={closeMobileMenu} className="text-gray-300 hover:text-cyan-400 transition">Series</Link>
            
            {/* Mobile Genre Accordion Section */}
            <div className="flex flex-col gap-3 pt-2 border-t border-white/5">
              <span className="text-xs text-cyan-400/60 tracking-wider uppercase font-bold">Genres</span>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 pl-1">
                {genres.map((genre) => (
                  <Link 
                    key={genre.id} 
                    to={`/genre/${genre.id}?name=${encodeURIComponent(genre.name)}`}
                    onClick={closeMobileMenu}
                    className="text-base text-gray-400 hover:text-cyan-400 transition py-1"
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/about" onClick={closeMobileMenu} className="text-gray-300 hover:text-cyan-400 transition pt-4 border-t border-white/5">About</Link>
            <Link 
              to="/watchlist" 
              onClick={closeMobileMenu} 
              className="flex items-center justify-center gap-2 text-base text-slate-950 font-bold bg-cyan-400 hover:bg-cyan-300 py-3.5 rounded-xl transition mt-2 shadow-lg shadow-cyan-500/10"
            >
              <Bookmark size={18} fill="currentColor" />
              <span>My Watchlist</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}