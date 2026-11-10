import React from 'react';
import { Play, Sparkles, ArrowRight, ShieldCheck, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const trustAvatars = [
  { url: "/avatars/avatar1.jpg", name: "Elena Rostova" },
  { url: "/avatars/avatar2.jpg", name: "Marcus Weber" },
  { url: "/avatars/avatar3.jpg", name: "Sophie Dupont" },
  { url: "/avatars/avatar4.jpg", name: "Lukas Becker" },
  { url: "/avatars/avatar5.jpg", name: "Hannah Meyer" },
];

const trustText = {
  en: {
    highlight: "Trusted by 100+ users"
  },
  ta: {
    highlight: "100+ பயனர்களால் நம்பப்படுகிறது"
  }
};

export default function HeroSection({ onOpenShowreel, onOpenInquiryModal }) {
  const { currentLang, t } = useLanguage();
  const hero = t.hero;
  const trust = trustText[currentLang] || trustText.en;

  // Ensure pricing tokens (e.g. "$69/Minute." or "€69/Minute.") stay atomically together and never wrap separately
  const renderHeadline = (text) => {
    if (!text || typeof text !== 'string') return text;

    const priceRegex = /(?:₹[\s\u00A0]*2,999|₹[\s\u00A0]*2999|2,999[\s\u00A0]*₹|2999[\s\u00A0]*₹|\$[\s\u00A0]*69|69[\s\u00A0]*\$)(?:[\s\u00A0]*\/[\s\u00A0]*(?:Minute|minute|நிமிடத்தில்|நிமிடம்))?\.?/i;
    const match = text.match(priceRegex);

    if (match) {
      const idx = text.indexOf(match[0]);
      const before = text.substring(0, idx);
      const after = text.substring(idx + match[0].length);
      return (
        <>
          {before}
          <span className="inline-block whitespace-nowrap">
            {match[0].replace(/[\s\u00A0]+/g, '\u00A0')}
          </span>
          {after}
        </>
      );
    }
    return text;
  };

  return (
    <section className="relative overflow-hidden pt-24 pb-12 sm:pt-36 sm:pb-24 lg:pt-44 lg:pb-28 bg-white">
      
      {/* Background Soft Gradients & Pattern */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-70 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-100/60 via-emerald-100/40 to-teal-100/30 rounded-full blur-3xl -z-10"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
        
        {/* Social Proof Trust Badge */}
        <div className="inline-flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow duration-200 mb-5 sm:mb-6 max-w-full">
          {/* Overlapping Avatars Stack */}
          <div className="flex -space-x-1.5 sm:-space-x-2 overflow-hidden shrink-0">
            {trustAvatars.map((avatar, idx) => (
              <img
                key={idx}
                src={avatar.url}
                alt={avatar.name}
                loading="eager"
                className="inline-block h-6 w-6 sm:h-7 sm:w-7 rounded-full ring-2 ring-white object-cover bg-slate-100 shadow-xs"
              />
            ))}
          </div>

          {/* Purple Trend Icon */}
          <TrendingUp className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-indigo-600 stroke-[2.5] shrink-0" />

          {/* Trust Text */}
          <div className="text-[11px] sm:text-sm text-slate-800 flex items-center leading-none">
            <span className="font-extrabold text-slate-900 truncate">
              {trust.highlight}
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1 className={`font-extrabold text-slate-900 mb-3 sm:mb-4 font-heading ${
          currentLang === 'ta' 
            ? 'text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-snug sm:leading-tight max-w-4xl mx-auto' 
            : 'text-[28px] xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-tight sm:leading-[1.1]'
        }`}>
          {renderHeadline(hero.headline)}
        </h1>

        {/* Subheading */}
        <p className={`font-bold text-indigo-600 mb-4 sm:mb-6 font-heading max-w-3xl mx-auto ${
          currentLang === 'ta'
            ? 'text-sm xs:text-base sm:text-xl md:text-2xl leading-relaxed'
            : 'text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight'
        }`}>
          {hero.subheading}
        </p>

        {/* Description */}
        <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10">
          {hero.description}
        </p>

        {/* Single Call To Action: Get Your First Video */}
        <div className="flex items-center justify-center mb-8 sm:mb-12">
          <button
            onClick={onOpenInquiryModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-base md:text-lg px-7 py-3.5 sm:px-9 sm:py-4 shadow-xl shadow-indigo-600/25 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] glow-primary cursor-pointer"
          >
            <span>{hero.primaryCta}</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.5]" />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-6 lg:gap-10 text-[11px] sm:text-sm font-semibold text-slate-500 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{hero.badge1}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span>{hero.badge2}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{hero.badge3}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
