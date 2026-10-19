/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Scissors, Film, 
  ArrowUpRight, CheckCircle2, Terminal, 
  Flame, ShieldCheck, Send, User, Mail, Cpu, ExternalLink,
  Clapperboard, Sparkles, Volume2, MonitorPlay, ChevronDown, ChevronUp, X, Camera,
  Palette, Code2
} from 'lucide-react';

// --- LIGHTWEIGHT NON-LAGGY PARTICLES CANVAS FOR INTRO & MAIN WEBSITE ---
function IntroParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number; color: string }> = [];
    const colors = ['#FF4500', '#4A154B', '#3B82F6', '#ffffff'];

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-60" />;
}

// --- YOUTUBE SHORTS EMBEDS ---
const YOUTUBE_SHORTS = [
  { id: 'BF-muRMVaS8', title: 'Church Media Feature #1', brand: 'FAV LI$ NOBLE' },
  { id: 'pV_YWitmNcc', title: 'Church Media Feature #2', brand: 'FAV LI$ NOBLE' },
  { id: 'ONpDgT3qmxU', title: 'Church Media Feature #3', brand: 'FAV LI$ NOBLE' },
  { id: 'L3WeItMzyDM', title: 'Church Media Feature #4', brand: 'FAV LI$ NOBLE' },
  { id: 'm-pbBGwyYj8', title: 'High-Retention Short #5', brand: 'FAV LI$ NOBLE' },
  { id: '_M8TdRop8_M', title: 'High-Retention Short #6', brand: 'FAV LI$ NOBLE' },
  { id: 'LolrkctiAH4', title: 'High-Retention Short #7', brand: 'FAV LI$ NOBLE' },
  { id: 's4cY_qID9XI', title: 'High-Retention Short #8', brand: 'FAV LI$ NOBLE' },
  { id: '1mXG1GxVRdY', title: 'High-Retention Short #9', brand: 'FAV LI$ NOBLE' }
];

export default function App() {
  const [isEntered, setIsEntered] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [activePage, setActivePage] = useState<'home' | 'about' | 'projects' | 'contact'>('home');

  // TikTok Style Fullscreen Viewer State
  const [tiktokIndex, setTiktokIndex] = useState<number | null>(null);

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    name: '',
    brand: '',
    projectType: 'High-Retention Shorts',
    budget: '$5k - $15k',
    deadline: '',
    message: ''
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomId = 'FLN-' + Math.floor(100000 + Math.random() * 900000);
    setBookingId(randomId);
    setBookingSubmitted(true);
  };

  // Press and hold logic for Intro Splash
  const startHolding = () => {
    setIsHolding(true);
    setHoldProgress(0);
    const startTime = Date.now();
    const duration = 1200; // 1.2 seconds

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setHoldProgress(progress);
      if (progress >= 100) {
        clearInterval(progressIntervalRef.current!);
        setIsEntered(true);
      }
    }, 30);
  };

  const stopHolding = () => {
    if (!isEntered) {
      setIsHolding(false);
      setHoldProgress(0);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    }
  };

  const changePage = (page: 'home' | 'about' | 'projects' | 'contact') => {
    setTiktokIndex(null);
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If not entered, show Intro Splash Page
  if (!isEntered) {
    return (
      <div className="min-h-screen bg-[#050508] text-slate-100 flex flex-col items-center justify-center relative overflow-hidden select-none px-6">
        <IntroParticlesCanvas />

        <div className="relative z-10 text-center space-y-6 max-w-md mx-auto flex flex-col items-center">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-[#FF4500] uppercase tracking-widest font-bold">
              FAV LI$ NOBLE STUDIOS
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tighter text-gradient-purple">
              IMMERSIVE POST-PRODUCTION
            </h1>
          </div>

          {/* Glowing Circle */}
          <div 
            onMouseDown={startHolding}
            onMouseUp={stopHolding}
            onMouseLeave={stopHolding}
            onTouchStart={startHolding}
            onTouchEnd={stopHolding}
            className={`relative w-36 h-36 sm:w-40 sm:h-40 rounded-full glass-card cursor-pointer flex flex-col items-center justify-center transition-all duration-500 border-2 shadow-[0_0_35px_rgba(255,69,0,0.35),inset_0_0_20px_rgba(74,21,75,0.4)] ${
              isHolding ? 'border-[#FF4500] shadow-[0_0_60px_rgba(255,69,0,0.7),inset_0_0_30px_rgba(255,69,0,0.5)] scale-105' : 'border-orange-500/40 hover:border-orange-500'
            }`}
          >
            {/* Progress ring fill */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
              <circle 
                cx="50" cy="50" r="48" 
                fill="none" 
                stroke="#FF4500" 
                strokeWidth="3.5" 
                strokeDasharray="301.59" 
                strokeDashoffset={301.59 - (301.59 * holdProgress) / 100}
                className="transition-all duration-75"
              />
            </svg>

            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF4500]/15 via-[#4A154B]/25 to-transparent animate-pulse" />

            <div className="relative z-10 text-center p-3 space-y-1">
              <Scissors className="w-6 h-6 text-[#FF4500] mx-auto animate-bounce" />
              <span className="text-xs font-black tracking-tight text-white block">FAV LI$ NOBLE</span>
              <span className="text-[9px] font-mono text-orange-400 block tracking-widest">
                {isHolding ? `${Math.round(holdProgress)}%` : 'HOLD'}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] font-mono text-slate-400 tracking-wider uppercase animate-pulse">
              [ PRESS AND HOLD TO START ]
            </p>

            <button
              onClick={() => setIsEntered(true)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF4500] to-[#FF1744] text-white text-[11px] font-extrabold tracking-widest uppercase shadow-lg shadow-orange-600/30 hover:scale-105 transition-all border border-white/20"
            >
              Enter Portfolio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-100 relative selection:bg-[#FF4500] selection:text-white bg-[#050508] flex flex-col justify-between overflow-y-auto">
      {/* Live Particles Canvas across the main website */}
      <IntroParticlesCanvas />

      {/* Hardware-accelerated CSS gradient background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#4A154B]/20 blur-[140px]" />
        <div className="absolute top-[30%] -right-[15%] w-[45vw] h-[45vw] rounded-full bg-[#FF4500]/10 blur-[160px]" />
      </div>

      <div className="flex-1 flex flex-col">
        {/* Clean, Uncluttered Header */}
        <header className="sticky top-0 z-50 glass-card border-b border-white/10 backdrop-blur-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => changePage('home')}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FF4500] to-[#4A154B] flex items-center justify-center shadow-lg shadow-orange-600/20 border border-white/20">
                <Scissors className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-base font-black tracking-tighter text-gradient-flame">FAV LI$ NOBLE</span>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => changePage('contact')}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#FF4500] to-[#FF1744] text-white text-[10px] font-bold tracking-widest uppercase shadow-md shadow-orange-600/20 hover:scale-105 transition-all flex items-center gap-1 border border-white/20"
              >
                <Flame className="w-3 h-3" /> <span>Book Now</span>
              </button>
            </div>
          </div>
        </header>

        {/* Fully Responsive Navigation Bar */}
        <nav className="sticky top-16 z-40 bg-[#050508]/95 backdrop-blur-xl border-b border-white/10 py-3 px-4 sm:px-6 shadow-md">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About & Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'contact', label: 'Contact' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => changePage(tab.id as any)}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all cursor-pointer text-center truncate ${
                    activePage === tab.id && tiktokIndex === null
                      ? 'bg-gradient-to-r from-[#FF4500] to-[#FF1744] text-white shadow-lg shadow-orange-600/20 border border-white/20' 
                      : 'glass-card text-slate-300 hover:text-white hover:border-[#FF4500]/40'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* PAGE CONTENT CONTAINER WITH FULL VERTICAL SCROLL */}
        <div className="relative z-10 flex-1 py-12 px-4 sm:px-6">
          
          {/* PAGE 1: HOME */}
          {activePage === 'home' && tiktokIndex === null && (
            <main className="max-w-5xl mx-auto space-y-12 animate-fadeIn py-6">
              <div className="space-y-8 text-center">
                <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl space-y-6 max-w-4xl mx-auto">
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-none">
                    <span className="text-gradient-flame block mb-3">FAV LI$ NOBLE</span>
                    <span className="text-gradient-purple block text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight uppercase">
                      HIGH-RETENTION VIDEO EDITING & IMMERSIVE POST-PRODUCTION ENGINEERING.
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed pt-4 font-sans border-t border-white/10 max-w-3xl mx-auto">
                    Every piece of raw footage holds a hidden story, waiting for the perfect cut to bring it to life. I am the creative force behind fav Li$ Noble, a premier video editing brand dedicated to turning raw concepts into high-impact visual experiences.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
                  <div className="glass-card p-4 rounded-xl border-l-2 border-l-[#FF4500]">
                    <div className="text-2xl font-black text-white">1.2B+</div>
                    <div className="text-xs text-slate-400 tracking-wider uppercase mt-0.5">Organic Views</div>
                  </div>
                  <div className="glass-card p-4 rounded-xl border-l-2 border-l-[#3B82F6]">
                    <div className="text-2xl font-black text-white">99.4%</div>
                    <div className="text-xs text-slate-400 tracking-wider uppercase mt-0.5">Client Retention</div>
                  </div>
                  <div className="glass-card p-4 rounded-xl border-l-2 border-l-[#4A154B]">
                    <div className="text-2xl font-black text-white">&lt; 24h</div>
                    <div className="text-xs text-slate-400 tracking-wider uppercase mt-0.5">Urgent Turnaround</div>
                  </div>
                  <div className="glass-card p-4 rounded-xl border-l-2 border-l-emerald-500">
                    <div className="text-2xl font-black text-white">8K / HDR</div>
                    <div className="text-xs text-slate-400 tracking-wider uppercase mt-0.5">Master Suite</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <button 
                    onClick={() => changePage('projects')}
                    className="px-8 py-4 rounded-2xl bg-white text-black font-extrabold text-sm tracking-widest uppercase hover:bg-orange-500 hover:text-white transition-all shadow-2xl flex items-center gap-3 group cursor-pointer"
                  >
                    <span>Explore projects</span>
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => changePage('about')}
                    className="px-8 py-4 rounded-2xl glass-card font-bold text-sm tracking-widest uppercase hover:border-[#FF4500]/50 transition-all flex items-center gap-3 text-slate-200 cursor-pointer"
                  >
                    <Terminal className="w-4 h-4 text-[#FF4500]" />
                    <span>About & Skills</span>
                  </button>
                </div>
              </div>
            </main>
          )}

          {/* PAGE 2: ABOUT & SKILLS */}
          {activePage === 'about' && tiktokIndex === null && (
            <main className="max-w-6xl mx-auto space-y-16 animate-fadeIn py-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#FF4500] to-[#4A154B] rounded-3xl blur-xl opacity-30" />
                  <div className="relative glass-card rounded-3xl overflow-hidden border border-white/20 aspect-[4/5]">
                    <img 
                      src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=80" 
                      alt="Fav li$ Noble"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6">
                      <span className="text-xs font-mono text-[#FF4500] uppercase tracking-widest font-bold">Director & Master Editor</span>
                      <h3 className="text-2xl font-black text-white">FAV LI$ NOBLE</h3>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-orange-500/30 text-orange-400 text-xs font-semibold tracking-wider uppercase">
                    <User className="w-3.5 h-3.5 text-[#FF4500]" /> Biography & Philosophy
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                    TURNING RAW CONCEPTS INTO <span className="text-gradient-flame">HIGH-IMPACT VISUAL EXPERIENCES</span>
                  </h2>
                  
                  <div className="space-y-4 text-slate-300 font-light leading-relaxed text-sm sm:text-base">
                    <p>
                      Every piece of raw footage holds a hidden story, waiting for the perfect cut to bring it to life. I am the creative force behind fav Li$ Noble, a premier video editing brand dedicated to turning raw concepts into high-impact visual experiences.
                    </p>
                    <p>
                      As a professional video editor, I don't just cut clips together; I curate pacing, shape emotions, and build worlds. The "Noble" in the brand name reflects my commitment to premium, top-tier quality, while the "fav" is earned—my goal is to become the go-to, favorite creative partner for every client I work with.
                    </p>
                    <p>
                      Whether it is a fast-paced social media edit, a corporate brand story, or a cinematic masterpiece, I combine technical mastery in industry-standard software with an artistic eye for storytelling. From seamless sound design to flawless color grading, I ensure your content doesn’t just grab attention—it holds onto it.
                    </p>
                  </div>

                  <div className="pt-2">
                    <div className="glass-card p-4 rounded-2xl border-l-4 border-l-[#FF4500] inline-block">
                      <p className="text-sm font-bold text-white italic">
                        "Your vision deserves elite execution. Let's build something."
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wider uppercase">
                    <Cpu className="w-3.5 h-3.5 text-purple-400" /> Expertise & Capabilities
                  </div>
                  <h3 className="text-3xl font-black text-white">SERVICES AND SKILLS</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3 hover:border-orange-500/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-[#FF4500] flex items-center justify-center">
                        <Clapperboard className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-bold text-white">Cinematic Video Editing</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Turn your raw footage into a polished, breathtaking narrative. Perfect for short films, music videos, documentaries, and event recaps that require emotional depth and precise pacing.
                    </p>
                  </div>

                  <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3 hover:border-orange-500/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center">
                        <Flame className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-bold text-white">High-Retention Social Media Editing</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Dominate platforms like YouTube, TikTok, and Instagram Reels. I specialize in fast cuts, trendy motion graphics, automated/stylized captions, and sound effects designed to hook viewers in the first 3 seconds.
                    </p>
                  </div>

                  <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3 hover:border-orange-500/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                        <MonitorPlay className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-bold text-white">Corporate & Commercial Editing</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Elevate your business presence. Clean, professional edits for brand promos, real estate walkthroughs, product launches, and internal training videos that reflect your company’s premium standards.
                    </p>
                  </div>

                  <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3 hover:border-orange-500/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-bold text-white">Color Correction & Cinematic Grading</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Give your videos a distinct look. I fix exposure and white balance issues, then apply custom cinematic color grading to evoke the exact mood your story needs.
                    </p>
                  </div>

                  <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3 hover:border-orange-500/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <Volume2 className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-bold text-white">Audio Enhancement & Sound Design</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Sound is half the viewing experience. This service includes dialogue cleanup, background noise removal, audio balancing, and immersive sound effect layering.
                    </p>
                  </div>

                  <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3 hover:border-orange-500/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
                        <Palette className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-bold text-white">Graphics Designing</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Brand identity, social media flyers, thumbnails, posters, and high-impact visual assets tailored to elevate your brand presence.
                    </p>
                  </div>

                  <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3 hover:border-orange-500/40 transition-colors md:col-span-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                        <Code2 className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-bold text-white">Web Development</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Modern, high-performance web applications, interactive landing pages, and portfolio platforms built with lightning speed and stunning aesthetics.
                    </p>
                  </div>
                </div>
              </div>
            </main>
          )}

          {/* PAGE 3: PROJECTS */}
          {activePage === 'projects' && tiktokIndex === null && (
            <main className="max-w-7xl mx-auto space-y-12 animate-fadeIn py-6">
              <div className="text-center space-y-3 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wider uppercase">
                  <Film className="w-3.5 h-3.5 text-purple-400" /> Featured Projects
                </div>
                <h2 className="text-4xl sm:text-5xl font-black tracking-tight">CURATED <span className="text-gradient-flame">PROJECTS</span></h2>
                <p className="text-xs font-mono text-slate-300">We edited and sent to their church media. And we have extracted the videos from their pages.</p>
              </div>

              <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/15 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-2">
                  {YOUTUBE_SHORTS.map((short, idx) => (
                    <div 
                      key={short.id} 
                      onClick={() => setTiktokIndex(idx)}
                      className="glass-card rounded-2xl overflow-hidden border border-white/15 p-4 space-y-3 group hover:border-[#FF4500] transition-all cursor-pointer relative"
                    >
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                        <span className="text-orange-400 font-bold">{short.brand}</span>
                        <span>1080P</span>
                      </div>
                      
                      <div className="relative w-full rounded-xl overflow-hidden bg-black shadow-inner aspect-[9/16] group-hover:scale-[1.02] transition-transform">
                        <img 
                          src={`https://img.youtube.com/vi/${short.id}/hqdefault.jpg`} 
                          alt={short.title} 
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                          <div className="w-14 h-14 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-2xl shadow-orange-600/50 group-hover:scale-110 transition-transform">
                            <Play className="w-6 h-6 fill-current ml-0.5" />
                          </div>
                        </div>
                      </div>

                      <div className="pt-1 flex items-center justify-between">
                        <span className="text-xs font-bold text-white tracking-tight">{short.brand}</span>
                        <span className="text-[10px] font-mono text-orange-400 font-bold flex items-center gap-1">Watch Full <ArrowUpRight className="w-3 h-3" /></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </main>
          )}

          {/* PAGE 4: CONTACT */}
          {activePage === 'contact' && tiktokIndex === null && (
            <main className="max-w-5xl mx-auto space-y-12 animate-fadeIn py-6">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-orange-500/30 text-orange-400 text-xs font-semibold tracking-wider uppercase">
                  <Mail className="w-3.5 h-3.5 text-[#FF4500]" /> Direct Management
                </div>
                <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">CONTACT & BOOKING</h2>
                <p className="text-slate-300 text-sm font-light">
                  Secure your production slot or inquire about executive post-production retainers.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 glass-card rounded-3xl p-8 border border-white/15 space-y-6">
                  <h3 className="text-2xl font-bold text-white">DIRECTORIAL OFFICE</h3>
                  
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-3 text-slate-300">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-orange-400">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block font-mono">EXECUTIVE BOOKING EMAIL</span>
                        <span className="font-bold text-white">boboike600@gmail.com</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-slate-300">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-400">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block font-mono">LOCATION SUITES</span>
                        <span className="font-bold text-white">Onitsha, Anambra, Nigeria (Remote 8K)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-slate-300">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-emerald-400">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block font-mono">CURRENT AVAILABILITY</span>
                        <span className="font-bold text-emerald-400">Q1/Q2 Retainers Open (2 Slots)</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-slate-400 font-mono leading-relaxed">
                      For urgent feature film cuts or press inquiries, contact the management team directly via encrypted Signal or email.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-7 glass-card rounded-3xl p-8 sm:p-10 border border-white/15 shadow-2xl relative">
                  {bookingSubmitted ? (
                    <div className="rounded-2xl p-8 text-center space-y-6 border border-emerald-500/30">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-black text-white">CONSULTATION REQUEST LOCKED</h3>
                        <p className="text-xs font-mono text-slate-400">RESERVATION ID: <span className="text-emerald-400 font-bold">{bookingId}</span></p>
                        <p className="text-sm text-slate-300 max-w-md mx-auto pt-2">
                          Thank you, <span className="text-white font-bold">{bookingForm.name}</span>. Fav li$ Noble's executive producer will review your brief for <span className="text-orange-400 font-bold">{bookingForm.brand}</span> and reach out via email within 4 hours.
                        </p>
                      </div>
                      <button 
                        onClick={() => setBookingSubmitted(false)}
                        className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-all"
                      >
                        Submit Another Project Brief
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleBookingSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">Your Name / Director *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. Alex Vance"
                            value={bookingForm.name}
                            onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                            className="w-full glass-card rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF4500] transition-colors"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">Brand / Studio Name *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. Apex Cinematic"
                            value={bookingForm.brand}
                            onChange={(e) => setBookingForm({...bookingForm, brand: e.target.value})}
                            className="w-full glass-card rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF4500] transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">Project Type</label>
                          <select 
                            value={bookingForm.projectType}
                            onChange={(e) => setBookingForm({...bookingForm, projectType: e.target.value})}
                            className="w-full glass-card rounded-xl px-4 py-3.5 text-sm text-white bg-[#0a0a12] focus:outline-none focus:border-[#FF4500] transition-colors"
                          >
                            <option>High-Retention Shorts</option>
                            <option>Cinematic Advertisement</option>
                            <option>Narrative Direction / Feature</option>
                            <option>Full Post-Production Retainer</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">Budget Range</label>
                          <select 
                            value={bookingForm.budget}
                            onChange={(e) => setBookingForm({...bookingForm, budget: e.target.value})}
                            className="w-full glass-card rounded-xl px-4 py-3.5 text-sm text-white bg-[#0a0a12] focus:outline-none focus:border-[#FF4500] transition-colors"
                          >
                            <option>$3k - $8k (Single Campaign)</option>
                            <option>$8k - $20k (Monthly Retainer)</option>
                            <option>$20k+ (Feature / Global Flagship)</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">Target Deadline</label>
                          <input 
                            type="date" 
                            required
                            value={bookingForm.deadline}
                            onChange={(e) => setBookingForm({...bookingForm, deadline: e.target.value})}
                            className="w-full glass-card rounded-xl px-4 py-3.5 text-sm text-white bg-[#0a0a12] focus:outline-none focus:border-[#FF4500] transition-colors font-mono"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">Project Brief & Vision *</label>
                        <textarea 
                          required
                          rows={4}
                          placeholder="Describe your footage assets, pacing requirements, deliverables, and aesthetic references..."
                          value={bookingForm.message}
                          onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                          className="w-full glass-card rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF4500] transition-colors resize-none"
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF4500] via-[#FF1744] to-[#4A154B] text-white font-extrabold text-sm tracking-widest uppercase hover:scale-[1.01] transition-all shadow-2xl flex items-center justify-center gap-3 border border-white/20"
                      >
                        <Send className="w-4 h-4" />
                        <span>Submit Production Brief & Request Slot</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </main>
          )}

        </div>
      </div>

      {/* TIKTOK STYLE FULL-SCREEN VERTICAL VIEWER WITH CAMERA WATERMARK AT THE BOTTOM */}
      {tiktokIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center animate-fadeIn">
          {/* Close button (top right) */}
          <button 
            onClick={() => setTiktokIndex(null)}
            className="absolute top-4 right-4 z-50 w-11 h-11 rounded-full bg-black/60 hover:bg-[#FF4500] text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl cursor-pointer transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Video Button (Left) */}
          <button
            onClick={() => setTiktokIndex(prev => (prev! > 0 ? prev! - 1 : YOUTUBE_SHORTS.length - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-black/50 hover:bg-orange-600 text-white hidden sm:flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl cursor-pointer transition-colors"
          >
            <ChevronUp className="w-6 h-6 -rotate-90" />
          </button>

          {/* Next Video Button (Right) */}
          <button
            onClick={() => setTiktokIndex(prev => (prev! < YOUTUBE_SHORTS.length - 1 ? prev! + 1 : 0))}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-black/50 hover:bg-orange-600 text-white hidden sm:flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl cursor-pointer transition-colors"
          >
            <ChevronDown className="w-6 h-6 -rotate-90" />
          </button>

          {/* Pure Fullscreen Vertical Video (TikTok Style) */}
          <div className="relative w-full h-full sm:w-[410px] sm:h-[90vh] sm:max-h-[850px] bg-black flex items-center justify-center overflow-hidden sm:rounded-3xl shadow-2xl">
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_SHORTS[tiktokIndex].id}?autoplay=1&mute=0&controls=1&enablejsapi=1&rel=0&loop=1`}
              title="TikTok Style Short Player"
              className="w-full h-full border-0 object-cover"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

            {/* CAMERA WATERMARK AT THE BOTTOM OF THE VIDEO */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 shadow-2xl">
              <Camera className="w-4 h-4 text-[#FF4500]" />
              <span className="text-xs font-mono font-bold tracking-widest text-white uppercase drop-shadow-md">
                FAV LI$ NOBLE
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Clean & Simple Minimal Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/80 py-12 px-6 mt-12 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF4500] flex items-center justify-center text-white font-black">
              FL
            </div>
            <span>© {new Date().getFullYear()} FAV LI$ NOBLE. ALL RIGHTS RESERVED. POST-PRODUCTION DIRECTOR.</span>
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <button onClick={() => changePage('home')} className="hover:text-[#FF4500] transition-colors cursor-pointer">Home</button>
            <button onClick={() => changePage('about')} className="hover:text-[#FF4500] transition-colors cursor-pointer">About & Skills</button>
            <button onClick={() => changePage('projects')} className="hover:text-[#FF4500] transition-colors cursor-pointer">Projects</button>
            <button onClick={() => changePage('contact')} className="hover:text-[#FF4500] transition-colors cursor-pointer">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
