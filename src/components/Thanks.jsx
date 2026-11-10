import React, { useEffect } from 'react';
import { CheckCircle2, Clock, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Thanks({ onClose, strings }) {
  const { currentLang } = useLanguage();
  const isTa = currentLang === 'ta';

  useEffect(() => {
    // Fire Meta Pixel Lead Event when Thanks component loads
    if (typeof window !== 'undefined') {
      try {
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'Lead');
        } else {
          window._fbq = window._fbq || [];
          window.fbq = window.fbq || function() {
            (window.fbq.q = window.fbq.q || []).push(arguments);
          };
          window.fbq('track', 'Lead');
        }
      } catch (err) {
        console.warn('Meta Pixel Lead tracking error in Thanks.jsx:', err);
      }
    }
  }, []);

  const getHomePath = () => {
    if (typeof window === 'undefined') return '/';
    const path = window.location.pathname;
    const match = path.match(/^(.*\/crew)(?:\/.*)?$/);
    if (match) {
      return `${match[1]}/`;
    }
    return '/';
  };

  const title = strings?.successTitle || (
    isTa ? "சொத்து வீடியோ கோரிக்கை வெற்றிகரமாகப் பெறப்பட்டது!" : "Enquiry Received Successfully!"
  );

  const desc = strings?.successDesc || (
    isTa 
      ? "உங்கள் விவரங்கள் பெறப்பட்டன. எங்கள் ரியல் எஸ்டேட் வீடியோ தயாரிப்பு குழு 12 மணி நேரத்திற்குள் வாட்ஸ்அப் / தொலைபேசியில் உங்களைத் தொடர்புகொள்ளும்."
      : "Thank you for reaching out. Our real estate video production team is reviewing your project details and will contact you via WhatsApp / Phone within 12 hours."
  );

  return (
    <div className="py-6 sm:py-8 text-center animate-in fade-in duration-300">
      
      {/* Success Badge & Animated Check */}
      <div className="relative inline-flex items-center justify-center mb-4 sm:mb-5">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100/80 text-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/15">
          <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11 stroke-[2.5]" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs shadow-md">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
      </div>

      <div>
        <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full mb-2.5">
          {isTa ? "கோரிக்கை பெறப்பட்டது" : "Enquiry Confirmed"}
        </span>
      </div>

      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-heading mb-2 sm:mb-3 leading-tight max-w-lg mx-auto">
        {title}
      </h2>

      <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mb-6 sm:mb-7 leading-relaxed">
        {desc}
      </p>

      {/* 3 Next Steps Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 max-w-xl mx-auto mb-7 text-left">
        <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 shadow-xs">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-1.5">
            <Clock className="w-4 h-4" />
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-heading">
            {isTa ? "12 மணி நேர பதில்" : "12-Hour Callback"}
          </h4>
          <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 leading-snug">
            {isTa ? "வாட்ஸ்அப் அல்லது போன் மூலம் ஆலோசனை." : "Requirements review & concept previews."}
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 shadow-xs">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-heading">
            {isTa ? "3D மாடலிங்" : "3D CGI Modeling"}
          </h4>
          <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 leading-snug">
            {isTa ? "வரைபடம் 3D காட்சியாக மாற்றம்." : "Floor plans turned into walkthroughs."}
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 shadow-xs">
          <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-1.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-heading">
            {isTa ? "48-72 மணி டெலிவரி" : "48-72h Delivery"}
          </h4>
          <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 leading-snug">
            {isTa ? "ரீல்ஸ் மற்றும் யூடியூப் வடிவங்கள்." : "Reels & 16:9 4K formats ready for ads."}
          </p>
        </div>
      </div>

      {/* Return to Website Button */}
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={onClose || (() => { window.location.href = getHomePath(); })}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isTa ? "முகப்புப் பக்கத்திற்குச் செல்லவும்" : "Back to Website"}</span>
        </button>
      </div>

    </div>
  );
}
