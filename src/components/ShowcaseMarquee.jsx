import React, { useRef } from 'react';
import { Play, Sparkles } from 'lucide-react';
import { showreelVideos } from '../data/landingData';
import { useLanguage } from '../context/LanguageContext';

export default function ShowcaseMarquee({ onSelectVideo }) {
  const { t } = useLanguage();
  const sr = t.showreel;
  // Duplicate list to achieve continuous seamless loop
  const marqueeItems = [...showreelVideos, ...showreelVideos, ...showreelVideos];

  return (
    <section id="showreel" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>{sr.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-heading">
            {sr.heading}
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            {sr.subheading}
          </p>
        </div>

        {/* Marquee Wrapper with side fade gradients */}
        <div className="relative w-full overflow-hidden py-4">
          
          {/* Left & Right Fade Masks for pure white background */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 md:w-44 z-20 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 md:w-44 z-20 bg-gradient-to-l from-white via-white/80 to-transparent"></div>

          {/* Marquee Row */}
          <div className="group flex overflow-hidden [--gap:1.5rem] [gap:var(--gap)] flex-row">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {marqueeItems.map((video, idx) => (
                <VideoCard 
                  key={`${video.id}-${idx}`} 
                  video={video} 
                  onSelectVideo={onSelectVideo} 
                />
              ))}
            </div>
            {/* Duplicated track for smooth CSS marquee looping */}
            <div 
              aria-hidden="true" 
              className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]"
            >
              {marqueeItems.map((video, idx) => (
                <VideoCard 
                  key={`clone-${video.id}-${idx}`} 
                  video={video} 
                  onSelectVideo={onSelectVideo} 
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

function VideoCard({ video, onSelectVideo }) {
  const { rateText } = useLanguage();
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onClick={() => onSelectVideo(video)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="cursor-pointer relative h-[280px] w-40 sm:h-[340px] sm:w-48 md:h-[400px] md:w-56 shrink-0 rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-900 shadow-md group/card transition-all duration-300 hover:scale-[1.03] hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/15"
    >
      {/* Aspect 9:16 Video Preview */}
      <div className="relative w-full h-full overflow-hidden bg-slate-950">
        
        {/* Poster Frame Image */}
        <img
          src={video.posterUrl}
          alt={video.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover/card:opacity-0"
        />

        {/* Video Preview (plays on hover) */}
        <video
          ref={videoRef}
          src={video.videoUrl}
          muted
          loop
          playsInline
          preload="none"
          className="w-full h-full object-cover"
        />

        {/* Hover Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none transition-opacity duration-300"></div>

        {/* Play Icon indicator on center */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="p-3.5 rounded-full bg-indigo-600/90 backdrop-blur-md text-white shadow-lg">
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
        </div>

        {/* Bottom Category Badge & Title */}
        <div className="absolute bottom-3 left-3 right-3 pointer-events-none z-10">
          <span className="inline-block px-2.5 py-0.5 rounded-md bg-indigo-600/90 backdrop-blur-md text-[10px] sm:text-[11px] font-bold text-white tracking-wide mb-1">
            {video.category}
          </span>
          <p className="text-white text-xs sm:text-sm font-bold line-clamp-1">
            {video.title}
          </p>
          <div className="flex items-center justify-between text-[10px] text-slate-300 mt-1">
            <span>Duration: {video.duration}</span>
            <span>{rateText}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
