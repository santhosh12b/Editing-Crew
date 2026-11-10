import React, { useRef, useState, useEffect } from 'react';
import { Play, Sparkles, Check, ChevronLeft, ChevronRight, Zap, ShieldCheck, RotateCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const aiVideosList = [
  {
    id: 1,
    title: {
      en: "Luxury Villa & House Tour",
      ta: "சொகுசு வில்லா இல்லக் காட்சி"
    },
    badge: {
      en: "3D Virtual Tour",
      ta: "3D விர்ச்சுவல் டூர்"
    },
    benefit: {
      en: "No Physical Shoot",
      ta: "நேரடி படப்பிடிப்பு தேவையில்லை"
    },
    videoUrl: "/video/estate.mp4",
    rate: "₹4,000 (1 Min)"
  },
  {
    id: 2,
    title: {
      en: "Apartment & Flat Walkthrough",
      ta: "அடுக்குமாடி குடியிருப்பு வால்க்த்ரூ"
    },
    badge: {
      en: "48h Fast Delivery",
      ta: "48 மணிநேர விரைவு டெலிவரி"
    },
    benefit: {
      en: "Realistic Interiors",
      ta: "தத்ரூபமான உள்துறை காட்சிகள்"
    },
    videoUrl: "/video/estate1.mp4",
    rate: "₹4,000 (1 Min)"
  },
  {
    id: 3,
    title: {
      en: "Township & Gated Community CGI",
      ta: "கேடட் கம்யூனிட்டி 3D ட்ரோன் பார்வை"
    },
    badge: {
      en: "Drone & Aerial View",
      ta: "வான்வழி ட்ரோன் பார்வை"
    },
    benefit: {
      en: "Master Plan Preview",
      ta: "மாஸ்டர் பிளான் மாதிரி"
    },
    videoUrl: "/video/estate2.mp4",
    rate: "₹7,000 (2 Min)"
  },
  {
    id: 4,
    title: {
      en: "Plot Layout & Real Estate Reels",
      ta: "மனை லேஅவுட் & விளம்பர ரீல்ஸ்"
    },
    badge: {
      en: "Lead Generating",
      ta: "அதிக லீட்ஸ் உருவாக்கம்"
    },
    benefit: {
      en: "Tamil & English Voiceover",
      ta: "தமிழ் & ஆங்கில குரல் பதிவு"
    },
    videoUrl: "/video/estate3.mp4",
    rate: "₹2,500 (30s)"
  }
];

export default function ValuePropositionSection({ onOpenVideoModal }) {
  const { currentLang, t, priceFormatted } = useLanguage();
  const vp = t.valueProposition;

  const isTa = currentLang === 'ta';

  return (
    <section id="ai-showcase" className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Main Banner Container */}
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 md:p-14 shadow-2xl overflow-hidden border border-slate-800">
          
          {/* Subtle Ambient Background Mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(7,132,101,0.35),transparent_50%)] pointer-events-none"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

          {/* Section Header */}
          <div className="relative z-10 text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-300 bg-indigo-950/90 border border-indigo-500/30 px-4 py-1.5 rounded-full mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>{vp.tagline}</span>
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-heading">
              {vp.headline}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-300 mt-3 sm:mt-4 leading-relaxed max-w-2xl mx-auto">
              {vp.subtext}
            </p>
          </div>

          {/* 4-Video Showcase: Desktop 4-Col & Mobile 360° 3D Rotating Carousel */}
          <div className="relative z-10 mb-8 sm:mb-10">
            {/* Desktop: 4-Col Grid View (lg+) */}
            <div className="hidden lg:grid lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {aiVideosList.map((item, idx) => (
                <VideoPhoneCard 
                  key={item.id} 
                  item={item} 
                  index={idx}
                  currentLang={currentLang}
                  onOpenModal={onOpenVideoModal}
                />
              ))}
            </div>

            {/* Mobile & Tablet: 360° 3D Rotating Carousel (< lg) */}
            <div className="block lg:hidden">
              <Mobile3DVideoCarousel
                items={aiVideosList}
                currentLang={currentLang}
                onOpenModal={onOpenVideoModal}
              />
            </div>
          </div>

          {/* Bottom 3 Value Highlights Bar */}
          <div className="relative z-10 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-emerald-400">
              <Check className="w-4 h-4 shrink-0" />
              <span>{isTa ? "விலையுயர்ந்த படப்பிடிப்புகள் இல்லை (80% வரை சேமிப்பு)" : "No Expensive Shoots (Save up to 80%)"}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-indigo-300">
              <Zap className="w-4 h-4 shrink-0" />
              <span>{isTa ? "வேகமானது: 48–72 மணிநேர டெலிவரி" : "Fast: 48–72 Hour Delivery"}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-emerald-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{isTa ? `நிலையான வெளிப்படையான விலை: ${priceFormatted} / நிமிடம்` : `Fixed Transparent Price: ${priceFormatted} / Minute`}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

function VideoPhoneCard({ item, index, currentLang, onOpenModal }) {
  const { rateText } = useLanguage();
  const videoRef = useRef(null);

  const title = item.title[currentLang] || item.title.en;
  const badge = item.badge[currentLang] || item.badge.en;
  const benefit = item.benefit[currentLang] || item.benefit.en;

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

  const handleClick = () => {
    if (onOpenModal) {
      onOpenModal({
        id: item.id,
        title: title,
        category: badge,
        videoUrl: item.videoUrl,
        description: benefit
      });
    }
  };

  return (
    <div 
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex-none w-[220px] sm:w-[240px] lg:w-full aspect-[9/16] rounded-2xl sm:rounded-3xl border border-white/15 bg-slate-950 overflow-hidden shadow-xl cursor-pointer group hover:border-indigo-400/80 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 snap-center"
    >
      {/* Background Video Element displaying local user video */}
      <video
        ref={videoRef}
        src={`${item.videoUrl}#t=0.001`}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
      >
        <source src={item.videoUrl} type="video/mp4" />
      </video>

      {/* Dark Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/60 pointer-events-none group-hover:from-slate-950/90 transition-colors"></div>

      {/* Top Badge: e.g. 100% KI-generiert */}
      <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
        <span className="text-[10px] sm:text-xs font-bold text-white bg-indigo-600/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
          {badge}
        </span>
        <span className="text-[10px] sm:text-xs font-extrabold text-white/90 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md">
          {rateText || item.rate}
        </span>
      </div>

      {/* Center Floating Play Button */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-115 group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all duration-300">
          <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5 text-white" />
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-3 inset-x-3 z-10 pointer-events-none text-left">
        <h4 className="text-xs sm:text-sm font-extrabold text-white leading-snug font-heading mb-1 drop-shadow-sm">
          {title}
        </h4>
        <div className="flex items-center justify-between text-[10px] sm:text-xs text-indigo-300 font-medium">
          <span>{benefit}</span>
          <span className="text-white/80 group-hover:translate-x-0.5 transition-transform flex items-center">
            ▶
          </span>
        </div>
      </div>

    </div>
  );
}

function Mobile3DVideoCarousel({ items, currentLang, onOpenModal }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isDragging = useRef(false);

  const total = items.length;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaX) > 30 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  const handleMouseDown = (e) => {
    touchStartX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const deltaX = e.clientX - touchStartX.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) nextSlide();
      else prevSlide();
    }
  };

  return (
    <div className="relative w-full py-2 select-none">
      
      {/* Carousel Slide Counter */}
      <div className="flex items-center justify-end px-2 mb-3 text-xs">
        <span className="px-2.5 py-1 rounded-full bg-white/10 text-slate-300 font-bold text-[11px] backdrop-blur-md border border-white/10">
          {activeIndex + 1} / {total}
        </span>
      </div>

      {/* 3D Stage with cylindrical perspective */}
      <div 
        className="relative w-full h-[430px] sm:h-[480px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ perspective: '1000px' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div 
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {items.map((item, idx) => {
            let diff = idx - activeIndex;
            if (diff < -2) diff += total;
            if (diff > 2) diff -= total;

            const title = item.title[currentLang] || item.title.en;
            const badge = item.badge[currentLang] || item.badge.en;
            const benefit = item.benefit[currentLang] || item.benefit.en;

            return (
              <Mobile3DCard
                key={item.id}
                item={item}
                diff={diff}
                isActive={diff === 0}
                currentLang={currentLang}
                onClickCard={() => {
                  if (diff === 0) {
                    if (onOpenModal) {
                      onOpenModal({
                        id: item.id,
                        title,
                        category: badge,
                        videoUrl: item.videoUrl,
                        description: benefit
                      });
                    }
                  } else {
                    setActiveIndex(idx);
                  }
                }}
              />
            );
          })}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-40 p-2 sm:p-2.5 rounded-full bg-slate-900/80 hover:bg-indigo-600 text-white border border-white/20 backdrop-blur-md shadow-xl transition-all duration-200 active:scale-90"
          aria-label="Previous Video"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-40 p-2 sm:p-2.5 rounded-full bg-slate-900/80 hover:bg-indigo-600 text-white border border-white/20 backdrop-blur-md shadow-xl transition-all duration-200 active:scale-90"
          aria-label="Next Video"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex items-center justify-center gap-2 mt-3">
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'w-7 bg-indigo-500 shadow-md shadow-indigo-500/50' 
                  : 'w-2 bg-white/25 hover:bg-white/40'
              }`}
              aria-label={`Go to video ${idx + 1}`}
            />
          );
        })}
      </div>

    </div>
  );
}

function Mobile3DCard({ item, diff, isActive, currentLang, onClickCard }) {
  const { rateText } = useLanguage();
  const videoRef = useRef(null);

  const title = item.title[currentLang] || item.title.en;
  const badge = item.badge[currentLang] || item.badge.en;
  const benefit = item.benefit[currentLang] || item.benefit.en;

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  // Compute 3D Cylindrical Position for 360-degree rotation effect
  let transform = '';
  let zIndex = 10;
  let opacity = 0;
  let pointerEvents = 'none';
  let filter = 'brightness(0.5)';

  if (diff === 0) {
    // Active Center
    transform = 'translateX(-50%) translateY(-50%) translateZ(40px) rotateY(0deg) scale(1)';
    zIndex = 30;
    opacity = 1;
    pointerEvents = 'auto';
    filter = 'brightness(1)';
  } else if (diff === 1) {
    // Immediate Right
    transform = 'translateX(calc(-50% + 95px)) translateY(-50%) translateZ(-30px) rotateY(-28deg) scale(0.85)';
    zIndex = 20;
    opacity = 0.65;
    pointerEvents = 'auto';
    filter = 'brightness(0.7)';
  } else if (diff === -1) {
    // Immediate Left
    transform = 'translateX(calc(-50% - 95px)) translateY(-50%) translateZ(-30px) rotateY(28deg) scale(0.85)';
    zIndex = 20;
    opacity = 0.65;
    pointerEvents = 'auto';
    filter = 'brightness(0.7)';
  } else if (diff === 2) {
    // Far Right
    transform = 'translateX(calc(-50% + 170px)) translateY(-50%) translateZ(-85px) rotateY(-48deg) scale(0.68)';
    zIndex = 10;
    opacity = 0.2;
    pointerEvents = 'none';
    filter = 'brightness(0.35)';
  } else if (diff === -2) {
    // Far Left
    transform = 'translateX(calc(-50% - 170px)) translateY(-50%) translateZ(-85px) rotateY(48deg) scale(0.68)';
    zIndex = 10;
    opacity = 0.2;
    pointerEvents = 'none';
    filter = 'brightness(0.35)';
  }

  return (
    <div
      onClick={onClickCard}
      className="absolute left-1/2 top-1/2 w-[210px] sm:w-[240px] aspect-[9/16] rounded-2xl sm:rounded-3xl border border-white/20 bg-slate-950 overflow-hidden shadow-2xl cursor-pointer transition-all duration-500 ease-out"
      style={{
        transform,
        zIndex,
        opacity,
        filter,
        pointerEvents,
        transformOrigin: 'center center',
        willChange: 'transform, opacity'
      }}
    >
      {/* Video Element displaying local user video */}
      <video
        ref={videoRef}
        src={`${item.videoUrl}#t=0.001`}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={item.videoUrl} type="video/mp4" />
      </video>

      {/* Dark Gradient Overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/60 pointer-events-none"></div>

      {/* Top Badge: 100% KI-generiert + Rate */}
      <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10 pointer-events-none">
        <span className="text-[10px] font-bold text-white bg-indigo-600/90 backdrop-blur-md px-2 py-0.5 rounded-full shadow-sm">
          {badge}
        </span>
        <span className="text-[10px] font-extrabold text-white/90 bg-black/50 backdrop-blur-md px-1.5 py-0.5 rounded-md">
          {rateText || item.rate}
        </span>
      </div>

      {/* Center Floating Play Button */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isActive 
            ? 'bg-indigo-600 text-white shadow-indigo-500/50 scale-105 ring-4 ring-indigo-500/25' 
            : 'bg-white/20 text-white backdrop-blur-md border border-white/30'
        }`}>
          <Play className="w-5 h-5 fill-current ml-0.5 text-white" />
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-2.5 inset-x-2.5 z-10 pointer-events-none text-left">
        <h4 className="text-xs sm:text-sm font-extrabold text-white leading-snug font-heading mb-0.5 drop-shadow-sm">
          {title}
        </h4>
        <div className="flex items-center justify-between text-[10px] text-indigo-300 font-medium">
          <span>{benefit}</span>
          <span className="text-white/80 flex items-center">▶</span>
        </div>
      </div>

    </div>
  );
}

