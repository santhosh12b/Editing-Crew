import React, { useRef, useEffect } from 'react';
import { X, Volume2, VolumeX, Play, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function VideoModal({ video, onClose, onOpenInquiryModal }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isMuted, setIsMuted] = React.useState(false);
  const { t, priceFormatted } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Vertical Reel Player Container */}
      <div className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] aspect-[9/16] rounded-3xl overflow-hidden border border-slate-700 bg-black shadow-2xl flex flex-col justify-between">
        
        {/* Top Control Bar */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-white">
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold">
            {video.category}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-colors"
              aria-label="Toggle mute"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Element */}
        <div className="relative w-full h-full cursor-pointer" onClick={togglePlay}>
          <video
            ref={videoRef}
            src={video.videoUrl}
            poster={video.posterUrl}
            autoPlay
            loop
            playsInline
            muted={isMuted}
            className="w-full h-full object-cover"
          />

          {/* Centered Play Pause Indicator */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="p-4 rounded-full bg-indigo-600/90 backdrop-blur-md text-white shadow-xl">
                <Play className="w-8 h-8 fill-white ml-1" />
              </div>
            </div>
          )}
        </div>

        {/* Bottom Info & CTA */}
        <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black via-black/85 to-transparent z-20 space-y-3">
          <div>
            <h4 className="text-base font-bold text-white leading-tight">
              {video.title}
            </h4>
            <div className="flex items-center justify-between text-xs text-slate-300 mt-1">
              <span>{t.showreel.duration}: {video.duration}</span>
              <span className="font-semibold text-emerald-400">{priceFormatted} / {t.pricing.calcSuffix}</span>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              if (onOpenInquiryModal) onOpenInquiryModal();
            }}
            className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 glow-primary transition-all"
          >
            <span>{t.hero.secondaryCta}</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
