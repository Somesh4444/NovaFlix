export default function Footer() {
  return (
    <footer className="w-full bg-[#020617] text-gray-400 border-t border-white/5 py-12 mt-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Content Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-white/5">
          
          <a href="/" className="flex items-center gap-3">
          
          <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <span className="text-black text-xl font-black">
              N
            </span>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white tracking-wide">
              Nova<span className="text-cyan-400">flix</span>
            </h1>

            <p className="text-xs text-cyan-200/60 -mt-1">
              Modern Streaming Platform
            </p>
          </div>
        </a>

          {/* Links */}
          <div className="flex flex-wrap gap-6 text-sm">
            <a href="#" className="hover:text-cyan-400 transition">Movies</a>
            <a href="#" className="hover:text-cyan-400 transition">TV Shows</a>
            <a href="#" className="hover:text-cyan-400 transition">About</a>
            <a href="#" className="hover:text-cyan-400 transition">Terms of Service</a>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-gray-500">
          <p>© 2026 NovaFlix. All rights reserved.</p>
          <p className="tracking-wide">
            Designed with <span className="text-cyan-400">♥</span> By Lipuun.
          </p>
        </div>

      </div>
    </footer>
  );
}