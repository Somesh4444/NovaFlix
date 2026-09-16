import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Assumed react-router handles your play views
import { Star, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { API_KEY } from "../../apiConfig";

// Swiper styles
import "swiper/css";

export default function Popular() {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularTVShows = async () => {
      try {
        const apiKey = API_KEY;
        const url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.results) {
          setTvShows(data.results);
        }
      } catch (error) {
        console.error("Error collecting popular TV shows:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularTVShows();
  }, []);

  return (
    <section className="relative py-5 select-none overflow-hidden mb-4">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">
              TV Series Collection
            </p>
            <h2 className="text-xl md:text-3xl font-black text-white tracking-wide">
              Popular TV Shows
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-2">
            <button className="trending-prev w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-cyan-400/10 text-gray-400 hover:text-cyan-400 transition flex items-center justify-center cursor-pointer">
              <ChevronLeft size={16} />
            </button>
            <button className="trending-next w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-cyan-400/10 text-gray-400 hover:text-cyan-400 transition flex items-center justify-center cursor-pointer">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Swiper Layout Engine */}
        <div className="w-full relative overflow-hidden">
          {loading ? (
            /* COMPACT SKELETON PLACEHOLDER LOADER VIEW */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 animate-pulse">
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="bg-white/5 border border-white/5 rounded-2xl p-2 flex flex-col gap-3">
                  <div className="aspect-2/3 w-full bg-slate-800 rounded-xl" />
                  <div className="h-3 bg-slate-700 rounded w-3/4 mx-1" />
                  <div className="h-2 bg-slate-800 rounded w-1/2 mx-1" />
                </div>
              ))}
            </div>
          ) : (
            <Swiper
              modules={[Autoplay, Navigation]}
              loop={tvShows.length > 5}
              grabCursor={true}
              spaceBetween={16}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              navigation={{
                nextEl: ".trending-next",
                prevEl: ".trending-prev",
              }}
              breakpoints={{
                0: { slidesPerView: 2, spaceBetween: 12 },
                480: { slidesPerView: 3, spaceBetween: 12 },
                768: { slidesPerView: 4, spaceBetween: 16 },
                1024: { slidesPerView: 5, spaceBetween: 16 },
                1280: { slidesPerView: 6, spaceBetween: 16 },
              }}
              className="w-full overflow-hidden"
            >
              {tvShows.map((show) => (
                <SwiperSlide key={show.id} className="h-auto min-w-0">
                  {/* Entire card wrapped in Link */}
                  <Link 
                    to={`/details/tv/${show.id}`}
                    className="group relative flex flex-col w-full h-full cursor-pointer bg-white/2 border border-white/5 hover:border-cyan-500/20 rounded-2xl p-2 transition-all duration-300 hover:bg-white/4 hover:shadow-xl hover:shadow-cyan-500/2"
                  >
                    
                    {/* Poster Display Layout Box */}
                    <div className="relative aspect-2/3 w-full rounded-xl overflow-hidden bg-slate-900">
                      <img
                        src={show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : "https://placehold.co/500x750?text=No+Poster"}
                        alt={show.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Protection Gradients */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                      {/* Absolute Live Rating Counter */}
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded-lg border border-white/10 flex items-center gap-0.5 z-10">
                        <Star size={9} fill="#22d3ee" className="text-cyan-400" />
                        <span className="text-[10px] font-bold text-gray-200">
                          {show.vote_average ? show.vote_average.toFixed(1) : "0.0"}
                        </span>
                      </div>

                      {/* Blockbuster/Popular Status Flag */}
                      <div className="absolute top-2 left-2 bg-cyan-500/10 backdrop-blur-md border border-cyan-400/30 text-cyan-400 text-[9px] font-black tracking-wider px-2 py-0.5 rounded-md uppercase z-10">
                        {show.vote_average >= 7.5 ? "Top Rated" : "Popular"}
                      </div>

                      {/* Play Overlay Trigger */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <div className="w-9 h-9 rounded-full bg-cyan-400 text-black flex items-center justify-center shadow-lg shadow-cyan-400/20 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                          <Play size={14} fill="black" className="ml-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Metadata Content Information footer */}
                    <div className="mt-2.5 px-1 flex flex-col gap-0.5">
                      <h3 className="text-xs sm:text-sm font-bold text-gray-200 group-hover:text-cyan-400 transition truncate">
                        {show.name}
                      </h3>

                      <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold mt-0.5">
                        <span>TV Series</span>
                        <span className="text-gray-600 text-[10px] bg-white/5 px-1.5 py-0.5 rounded-md group-hover:text-cyan-400/80 group-hover:bg-cyan-500/5 transition">
                          {show.first_air_date ? show.first_air_date.split("-")[0] : "N/A"}
                        </span>
                      </div>
                    </div>

                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
}