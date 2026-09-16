import { 
  Shield, Zap, Cpu, 
  Sparkles, ChevronRight, Home 
} from "lucide-react";
import { FaGithub, FaEnvelope, FaGlobe } from "react-icons/fa";

export default function About() {
  const stats = [
    { value: "25K+", label: "Movies & TV Shows" },
    { value: "500K+", label: "TMDB Records" },
    { value: "React", label: "Frontend Stack" },
    { value: "24/7", label: "Content Access" },
  ];

  const values = [
    {
      icon: <Cpu className="text-cyan-400" size={22} />,
      title: "Built With React",
      desc: "Developed using React and modern component architecture to deliver a smooth, fast and responsive browsing experience.",
    },
    {
      icon: <Zap className="text-emerald-400" size={22} />,
      title: "Powered By TMDB API",
      desc: "Movie details, ratings, cast information, trailers, trending content and recommendations are fetched from TMDB.",
    },
    {
      icon: <Shield className="text-blue-400" size={22} />,
      title: "Clean User Experience",
      desc: "Focused on simplicity, performance and accessibility to make discovering movies enjoyable across all devices.",
    },
  ];

  return (
    <section className="min-h-screen bg-[#020617] text-gray-100 py-12 relative overflow-hidden select-none">
      
      {/* AMBIENT GLOW SYSTEM */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[5%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 blur-[180px] rounded-full"></div>
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 space-y-16">
        
        {/* HEADER SECTION (COMBINED) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 bg-white/5 border border-white/5 w-fit px-4 py-2 rounded-xl backdrop-blur-md">
            <a href="/" className="flex items-center gap-1 hover:text-cyan-400 transition">
              <Home size={12} /> Discover
            </a>
            <ChevronRight size={10} className="text-gray-600" />
            <span className="text-gray-300 font-bold tracking-wide">
              Little Us
            </span>
          </nav>

          {/* Admin Creator Thumbnail Badge (Enlarged) */}
          <div className="flex items-center gap-3.5 bg-white/2 border border-white/5 px-2.5 py-2.5 rounded-2xl backdrop-blur-sm self-start sm:self-auto">
            <div className="relative">
              <img 
                src="https://somesh4444.github.io/portfolio/images/lipun.jpg" 
                alt="System Architect" 
                className="w-11 h-11 rounded-xl object-cover ring-2 ring-cyan-500/20"
              />
              <span className="absolute bottom-[-1px] right-[-1px] w-3 h-3 bg-emerald-500 border-2 border-[#020617] rounded-full"></span>
            </div>
            <div className="text-left space-y-0.5">
              <p className="text-[11px] font-mono font-bold tracking-widest text-gray-400 uppercase">System Admin</p>
              <p className="text-sm font-black text-white tracking-tight hover:text-cyan-400 transition cursor-pointer">@Somesh</p>
            </div>
          </div>
        </div>

        {/* HERO TITLES */}
      <div className="max-w-3xl border-l-2 border-cyan-500/30 pl-5 sm:pl-7 space-y-4">
        {/* Minimalist Tech Badge */}
        <div className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-cyan-400 uppercase">
          <Sparkles size={10} className="animate-pulse" />
          // project manifest
        </div>
        
        {/* Unified Typographic Hierarchy */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
            Welcome to Novaflix. Discover{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-emerald-400 to-blue-500">
              Movies, Shows & Stories.
            </span>
          </h1>
        </div>

        {/* Cleaned Description Text */}
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
          A refined cinematic discovery interface built with React and powered by the TMDB database api. 
          Seamlessly browse trending media, cast archives, user ratings, and streaming backdrops through a modular, zero-shifting layout.
        </p>
      </div>

        {/* METRICS SHOWCASE */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/2 border border-white/5 rounded-2xl p-6 text-center backdrop-blur-sm hover:border-cyan-500/20 transition duration-300">
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">{stat.value}</h3>
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* INFRASTRUCTURE VALUES */}
        <div className="space-y-8">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">  What Powers Novaflix</h2>
            <p className="text-gray-400 text-xs sm:text-sm">Built with modern frontend technologies and real-world API integration.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {values.map((item, i) => (
              <div key={i} className="bg-linear-to-b from-white/2 to-transparent border border-white/4 rounded-2xl p-6 space-y-3 hover:border-white/1 transition duration-300">
                <div className="p-2 bg-white/3 border border-white/5 rounded-xl w-fit">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">{item.title}</h3>
                <p className="text-gray-400 text-s leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative group overflow-hidden bg-linear-to-br from-white/3 to-transparent border border-white/5 rounded-3xl p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/20">
          {/* Subtly backlights the profile image area */}
          <div className="absolute top-0 left-0 w-48 h-48 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none"></div>

          <div className="relative flex flex-col md:flex-row gap-8 items-start">
            
            {/* Left Column: Asymmetric Profile Pic & Socials */}
            <div className="flex flex-col items-center sm:items-start md:items-center gap-4 shrink-0 w-full md:w-fit">
              <div className="relative">
                {/* Decorative corner accents for a tactical tech look */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400"></div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400"></div>
                
                <img
                  src="https://somesh4444.github.io/portfolio/images/lipun.jpg"
                  alt="Somesh"
                  className="w-28 h-28 md:w-32 md:h-32 rounded-xl object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 bg-slate-900"
                />
                <span className="absolute bottom-2 right-2 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>

              {/* Social Actions Grid */}
              <div className="flex gap-2 w-full justify-center md:justify-between">
                <a
                  href="https://github.com/somesh4444"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-white/5 bg-white/1 text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/10 transition-all duration-200"
                >
                  <FaGithub size={16} />
                </a>
                <a
                  href="mailto:ofcsomu@gmail.com"
                  className="p-2.5 rounded-xl border border-white/5 bg-white/1 text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/5 hover:border-emerald-500/20 transition-all duration-200"
                  title="Send an Email"
                >
                  <FaEnvelope size={16} />
                </a>
                <a
                  href="https://somesh4444.github.io/portfolio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-white/5 bg-white/1 text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/5 hover:border-emerald-500/20 transition-all duration-200"
                >
                  <FaGlobe size={16} />
                </a>
              </div>
            </div>

            {/* Right Column: Dynamic Text Layout & Project Meta */}
            <div className="flex-1 space-y-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest mb-2 text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/10 uppercase">
                  // Lead_Developer
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                  Hi, I'm <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-gray-200 to-gray-400">Somesh</span> 👋
                </h2>
              </div>

              <div className="space-y-3 font-medium text-gray-400 text-sm leading-relaxed max-w-5xl">
                <p>
                   I'm a frontend developer focused on learning and building with modern web
                  technologies. <span className="text-gray-200 font-semibold"> Novaflix</span>  is a personal React project that helped me gain
                  hands-on experience with API integration, state management, routing, and
                  responsive design.
                </p>
              </div>

              {/* Embedded Tech Stack Pill Badges */}
              <div className="pt-2 border-t border-white/5 flex flex-wrap gap-2 items-center">
                <span className="text-[10px] font-mono text-gray-600 uppercase tracking-wider mr-1">Stack:</span>
                <span className="px-2.5 py-0.5 rounded-md bg-white/2 border border-white/5 text-gray-400 text-xs font-mono">React 19</span>
                <span className="px-2.5 py-0.5 rounded-md bg-white/2 border border-white/5 text-gray-400 text-xs font-mono">Tailwind CSS</span>
                <span className="px-2.5 py-0.5 rounded-md bg-white/2 border border-white/5 text-gray-400 text-xs font-mono">TMDB API</span>
                <span className="px-2.5 py-0.5 rounded-md bg-white/2 border border-white/5 text-gray-400 text-xs font-mono">REST Integration</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}