import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BottomCtaSection({ onOpenInquiryModal }) {
  const { t, priceFormatted } = useLanguage();
  const cta = t?.bottomCta || {};

  return (
    <section className="pt-0 pb-10 sm:pt-2 sm:pb-14 md:pt-4 md:pb-20 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Banner Card */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-[#ebedf3] border border-slate-200/90 p-6 sm:p-8 md:p-10 lg:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-10 text-center md:text-left overflow-hidden">
          
          {/* Left Column: Heading & Description & Price Highlight */}
          <div className="flex-1 min-w-0 max-w-xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 font-heading mb-2 sm:mb-2.5 leading-snug sm:leading-tight">
              {cta.heading || "Ready to Accelerate Your Property Sales?"}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed mb-2.5 sm:mb-3">
              {cta.description || "Give your apartment, villa, or plotting project the visual impact it deserves. Generate high-intent buyer inquiries and increase site visits with high-converting 3D property videos."}
            </p>
            <p className="text-xs sm:text-sm font-extrabold text-indigo-600">
              {cta.priceHighlight || `Your first property video starts at just ${priceFormatted}.`}
            </p>
          </div>

          {/* Right Column: CTA Button & Subtext */}
          <div className="flex flex-col items-center justify-center shrink-0 w-full md:w-auto text-center">
            <button
              onClick={onOpenInquiryModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold text-sm sm:text-base shadow-lg shadow-indigo-600/25 transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              <span>{cta.buttonText || "Request Property Video"}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 shrink-0" />
            </button>
            
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium text-center mt-2 sm:mt-2.5 max-w-[280px] sm:max-w-xs leading-relaxed">
              {cta.subtext || "Share your floor plan or property photos, and let's bring it to life."}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
