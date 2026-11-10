import React from 'react';
import { 
  Image, 
  Scissors, 
  Volume2, 
  Music, 
  Lightbulb, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const featureIcons = [
  Image,
  Scissors,
  Volume2,
  Music,
  Lightbulb,
  CheckCircle2
];

export default function PricingSection({ onOpenInquiryModal }) {
  const { t, priceFormatted } = useLanguage();
  const pricing = t?.pricing || {};

  return (
    <section id="pricing" className="py-14 sm:py-20 md:py-28 bg-[#FAFAFC] relative overflow-hidden border-b border-slate-200/80 scroll-mt-20">
      
      {/* Background Soft Mesh Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-indigo-50/60 via-emerald-50/40 to-teal-50/20 rounded-full blur-3xl -z-10"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <span className="text-[11px] sm:text-[13px] font-bold uppercase tracking-widest text-indigo-600 mb-2 sm:mb-3 block">
            {pricing.badge || `What You Get for ${priceFormatted}/Minute`}
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight font-heading">
            {pricing.heading || "Complete Video Production. One Simple Price."}
          </h2>
          <p className="text-slate-600 text-xs sm:text-base md:text-lg mt-2.5 sm:mt-4 leading-relaxed max-w-2xl mx-auto">
            {pricing.subheading || "No need to manage different creators, editors, or production teams. We take care of the entire process."}
          </p>
        </div>

        {/* Focused All-Inclusive Pricing Container */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-slate-100 shadow-[0_4px_30px_-5px_rgba(0,0,0,0.05)] max-w-5xl mx-auto flex flex-col md:flex-row items-stretch gap-6 sm:gap-8 lg:gap-10">
          
          {/* Left Price Box */}
          <div className="w-full md:w-[280px] lg:w-[320px] rounded-xl sm:rounded-3xl bg-[#F8FAFC] border border-slate-100 p-5 sm:p-8 md:p-10 flex flex-col items-center justify-center text-center shrink-0">
            <span className="text-sm sm:text-base font-bold text-indigo-600 mb-1">
              {pricing.pricePrefix || "Just"}
            </span>
            <span className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-indigo-600 tracking-tight leading-tight my-1 font-heading">
              {pricing.price || priceFormatted}
            </span>
            <span className="text-xs sm:text-sm md:text-base font-bold text-indigo-600/90 mt-1 max-w-[200px] leading-snug">
              {pricing.priceSuffix || "per finished minute"}
            </span>
          </div>

          {/* Right: 6 Feature Highlights Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-4 sm:gap-y-6 lg:gap-x-8 lg:gap-y-7 py-1 md:py-3">
            {pricing.features && pricing.features.map((item, idx) => {
              const IconComponent = featureIcons[idx] || Sparkles;
              return (
                <div key={idx} className="flex items-start gap-3 sm:gap-3.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-50/80 flex items-center justify-center shrink-0 mt-0.5 text-indigo-600">
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm md:text-base font-bold text-slate-900 leading-snug font-heading mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs md:text-sm text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom CTA Action Button: [Let's Create Your Video] */}
        <div className="mt-8 sm:mt-12 text-center flex flex-col items-center justify-center">
          <button
            onClick={() => onOpenInquiryModal && onOpenInquiryModal()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-lg shadow-xl shadow-indigo-600/25 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{pricing.cta || "Let's Create Your Video"}</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <p className="text-xs sm:text-sm text-slate-500 mt-2.5 sm:mt-3 font-medium">
            {pricing.subnote || `Starting at just ${priceFormatted} per finished minute. No expensive video shoots required.`}
          </p>
        </div>

      </div>
    </section>
  );
}
