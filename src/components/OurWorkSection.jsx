import React, { useState, useRef } from 'react';
import { 
  Play, 
  Sparkles, 
  ArrowRight, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Film,
  Layers,
  Sparkle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const portfolioVideos = [
  {
    id: 1,
    title: {
      en: "Luxury Villa & House Tour",
      ta: "சொகுசு வில்லா இல்லக் காட்சி"
    },
    category: "product",
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
    category: "explainer",
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
    category: "cinematic",
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
    category: "ugc",
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

export default function OurWorkSection({ onOpenVideoModal, onOpenInquiryModal }) {
  const { currentLang, t, priceFormatted } = useLanguage();
  const ow = t.ourWork || {};
  const portfolioRef = useRef(null);

  const handleScrollToPortfolio = () => {
    if (portfolioRef.current) {
      portfolioRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="our-work" className="py-14 sm:py-20 md:py-28 bg-white relative overflow-hidden border-b border-slate-200/80 scroll-mt-20">
      
      {/* Background Soft Mesh */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-indigo-100/30 via-emerald-100/20 to-teal-100/20 rounded-full blur-3xl -z-10"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1360px]">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] sm:text-[13px] font-bold uppercase tracking-widest text-indigo-600 mb-2 sm:mb-3 block">
            {ow.badge || "Our Work"}
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight font-heading">
            {ow.heading || "See What AI Video Can Do for Your Brand"}
          </h2>
          <p className="text-slate-600 text-xs sm:text-base md:text-lg mt-2.5 sm:mt-4 leading-relaxed max-w-2xl mx-auto">
            {ow.subheading || "Explore videos we've created for other brands and discover what's possible for your products."}
          </p>

          {/* Primary CTA: [Show Video Portfolio] */}
          <div className="mt-6 sm:mt-7 flex items-center justify-center">
            <button
              onClick={handleScrollToPortfolio}
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-slate-900 hover:bg-indigo-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-slate-900/10 hover:shadow-indigo-600/30 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
              </div>
              <span>{ow.cta || "Show Video Portfolio"}</span>
              <ArrowRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Video Portfolio Stage */}
        <div ref={portfolioRef} id="ai-showcase" className="scroll-mt-24 pt-2 sm:pt-4">
          
          {/* Desktop 4-Column Showcase (lg+) */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {portfolioVideos.map((item, idx) => (
              <PortfolioVideoCard 
                key={item.id}
                item={item}
                index={idx}
                currentLang={currentLang}
                onOpenModal={onOpenVideoModal}
              />
            ))}
          </div>

          {/* Mobile & Tablet: 360° Rotating Carousel (< lg) */}
          <div className="block lg:hidden">
            <Mobile3DPortfolioCarousel
              items={portfolioVideos}
              currentLang={currentLang}
              onOpenModal={onOpenVideoModal}
            />
          </div>

        </div>

        {/* Bottom Tagline Banner: "Your next winning creative could start with a simple idea." */}
        <div className="mt-10 sm:mt-16 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-8 md:p-9 shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(7,132,101,0.28),transparent_50%)] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 sm:gap-4 max-w-2xl">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shrink-0 shadow-inner">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-lg sm:text-2xl font-extrabold text-white font-heading leading-snug">
                {ow.tagline || "Your next winning creative could start with a simple idea."}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 sm:mt-1.5 leading-relaxed">
                {currentLang === 'ta' 
                  ? `${priceFormatted}/நிமிடத்திலிருந்து தொழில்முறை AI வீடியோ தயாரிப்பைத் தொடங்குங்கள் — 48–72 மணிநேரத்தில் டெலிவரி.`
                  : `Launch your professional AI video production from ${priceFormatted}/minute — delivered in 48–72 hours.`}
              </p>
            </div>
          </div>

          <div className="relative z-10 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => onOpenInquiryModal && onOpenInquiryModal()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm sm:text-base px-6 py-3.5 shadow-lg shadow-indigo-600/30 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{ow.taglineCta || "Get Your Video Today"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

function PortfolioVideoCard({ item, currentLang, onOpenModal }) {
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
    }
  };

  const handleClick = () => {
    if (onOpenModal) {
      onOpenModal({
        id: item.id,
        title: title,
        category: badge,
        videoUrl: item.videoUrl,
        type: "AI Commercial"
      });
    }
  };

  return (
    <div 
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex-none w-full aspect-[9/16] rounded-3xl border border-slate-200/90 bg-slate-950 overflow-hidden shadow-lg cursor-pointer group hover:border-indigo-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300"
    >
      {/* Background Video */}
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

      {/* Dark Readability Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/60 pointer-events-none group-hover:from-slate-950/90 transition-colors"></div>

      {/* Top Badge */}
      <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
        <span className="text-[10px] sm:text-xs font-bold text-white bg-indigo-600/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
          {badge}
        </span>
        <span className="text-[10px] sm:text-xs font-extrabold text-white/90 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-md">
          {rateText || item.rate}
        </span>
      </div>

      {/* Center Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-115 group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all duration-300">
          <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5 text-white" />
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-3.5 inset-x-3.5 z-10 pointer-events-none text-left">
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

function Mobile3DPortfolioCarousel({ items, currentLang, onOpenModal }) {
  const { rateText } = useLanguage();
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
        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-[11px] border border-slate-200">
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
          {items.map((item, index) => {
            let offset = index - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            const isImmediate = Math.abs(offset) === 1;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            const translateX = offset * 140; 
            const translateZ = -Math.abs(offset) * 110; 
            const rotateY = offset * -28; 
            const opacity = isCenter ? 1 : isImmediate ? 0.75 : 0.35;
            const scale = isCenter ? 1 : 0.88;

            const title = item.title[currentLang] || item.title.en;
            const badge = item.badge[currentLang] || item.badge.en;

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (isCenter) {
                    if (onOpenModal) {
                      onOpenModal({
                        id: item.id,
                        title: title,
                        category: badge,
                        videoUrl: item.videoUrl,
                        type: "AI Commercial"
                      });
                    }
                  } else {
                    setActiveIndex(index);
                  }
                }}
                className="absolute w-[220px] sm:w-[250px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ease-out cursor-pointer border border-white/20 bg-slate-950"
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity: opacity,
                  zIndex: 20 - Math.abs(offset),
                  boxShadow: isCenter ? '0 25px 50px -12px rgba(7, 132, 101, 0.45)' : '0 10px 25px -5px rgba(0,0,0,0.5)',
                }}
              >
                <video
                  src={`${item.videoUrl}#t=0.001`}
                  muted
                  loop
                  playsInline
                  autoPlay={isCenter}
                  preload="metadata"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/60 pointer-events-none"></div>

                <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
                  <span className="text-[10px] font-bold text-white bg-indigo-600/90 backdrop-blur-md px-2.5 py-0.5 rounded-full shadow-sm">
                    {badge}
                  </span>
                  <span className="text-[10px] font-extrabold text-white/90 bg-black/50 px-2 py-0.5 rounded-md">
                    {rateText || item.rate}
                  </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform ${
                    isCenter ? 'bg-indigo-600 text-white scale-110 shadow-indigo-600/50' : 'bg-white/20 text-white'
                  }`}>
                    <Play className="w-5 h-5 fill-current ml-0.5 text-white" />
                  </div>
                </div>

                <div className="absolute bottom-3 inset-x-3 z-10 pointer-events-none text-left">
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-snug font-heading drop-shadow-sm">
                    {title}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Manual Slide Controls */}
      <div className="flex items-center justify-center gap-4 mt-2">
        <button
          onClick={prevSlide}
          aria-label="Previous Video"
          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-colors shadow-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to video ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'w-6 bg-indigo-600' : 'w-2 bg-slate-300'
              }`}
            />
          ))}
        </div>
        <button
          onClick={nextSlide}
          aria-label="Next Video"
          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-colors shadow-sm"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}
