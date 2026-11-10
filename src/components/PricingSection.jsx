import React from 'react';
import { 
  Building2, 
  Scissors, 
  Volume2, 
  Music, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Clock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const featureIcons = [
  Building2,
  Scissors,
  Volume2,
  Music,
  Clock,
  CheckCircle2
];

// Packages matching the user's uploaded price sheet
const packages = [
  {
    id: '30s',
    durationEn: '30 seconds',
    durationTa: '30 வினாடிகள்',
    rateEn: '₹5,000/min',
    rateTa: '₹5,000/நிமிடம்',
    price: '₹2,500'
  },
  {
    id: '1m',
    durationEn: '1 minute',
    durationTa: '1 நிமிடம்',
    rateEn: '₹4,000/min',
    rateTa: '₹4,000/நிமிடம்',
    price: '₹4,000'
  },
  {
    id: '2m',
    durationEn: '2 minutes',
    durationTa: '2 நிமிடங்கள்',
    rateEn: '₹3,500/min',
    rateTa: '₹3,500/நிமிடம்',
    price: '₹7,000'
  },
  {
    id: '5m',
    durationEn: '5 minutes',
    durationTa: '5 நிமிடங்கள்',
    rateEn: '₹3,200/min',
    rateTa: '₹3,200/நிமிடம்',
    price: '₹16,000'
  },
  {
    id: '10m',
    durationEn: '10 minutes',
    durationTa: '10 நிமிடங்கள்',
    rateEn: '₹2,500/min',
    rateTa: '₹2,500/நிமிடம்',
    price: '₹30,000'
  }
];

export default function PricingSection({ onOpenInquiryModal }) {
  const { currentLang, t } = useLanguage();
  const pricing = t?.pricing || {};
  const isTa = currentLang === 'ta';

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
            {isTa ? "வெளிப்படையான கட்டண விபரம்" : "Pay-Per-Video Packages"}
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight font-heading">
            {isTa ? "முழுமையான வீடியோ தயாரிப்பு. நிலையான கட்டணம்." : "Complete Video Production. Transparent Packages."}
          </h2>
          <p className="text-slate-600 text-xs sm:text-base md:text-lg mt-2.5 sm:mt-4 leading-relaxed max-w-2xl mx-auto">
            {isTa 
              ? "30 வினாடி ரீல்ஸ் முதல் 10 நிமிட பெருந்திட்ட வீடியோக்கள் வரை. நடிகர்கள் அல்லது கேமரா செலவின்றி உங்கள் திட்டத்திற்கு ஏற்ற பேக்கேஜைத் தேர்ந்தெடுக்கவும்."
              : "From 30-second social reels to 10-minute master plan tours. No camera or actor costs. Choose the exact package for your property marketing."
            }
          </p>
        </div>

        {/* Pricing Container: Left Package Table + Right 6 Feature Inclusions */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-slate-200/90 shadow-xl shadow-slate-200/40 max-w-5xl mx-auto flex flex-col lg:flex-row items-stretch gap-6 sm:gap-8 lg:gap-10">
          
          {/* Left: Pay-per-video Packages Table (matching user uploaded image) */}
          <div className="w-full lg:w-[440px] rounded-2xl sm:rounded-3xl bg-[#F8FAFC] border border-slate-200/80 p-4 sm:p-6 flex flex-col justify-between shrink-0 shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading">
                  AI Video Production
                </h3>
                <span className="text-[10px] sm:text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/70 px-2.5 py-0.5 rounded-full">
                  {isTa ? "விலைப்பட்டியல்" : "Package Sheet"}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mb-3.5">
                Pay-per-video packages
              </p>

              {/* 5 Package Rows */}
              <div className="divide-y divide-slate-200/90 bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
                {packages.map((pkg) => (
                  <div 
                    key={pkg.id} 
                    onClick={() => onOpenInquiryModal && onOpenInquiryModal()}
                    className="p-3 sm:px-4 sm:py-3 flex items-center justify-between hover:bg-emerald-50/60 transition-colors cursor-pointer group"
                  >
                    <div>
                      <p className="text-xs sm:text-sm font-extrabold text-slate-900 font-heading group-hover:text-indigo-700 transition-colors">
                        {isTa ? pkg.durationTa : pkg.durationEn}
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5">
                        {isTa ? pkg.rateTa : pkg.rateEn}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm sm:text-base font-extrabold text-indigo-700 tracking-tight font-heading">
                        {pkg.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[10px] text-slate-400 font-medium mt-3 leading-relaxed">
              {isTa 
                ? "விலைகள் குறிப்பீட்டுக்கானவை. ஸ்கிரிப்ட், வாய்ஸ்ஓவர், எடிட்டிங் மற்றும் திருத்தங்கள் சேவை ஒப்பந்தத்தில் முடிவு செய்யப்படும்."
                : "Prices are indicative. Define script, voiceover, editing, revisions and delivery specifications in the service agreement."
              }
            </p>
          </div>

          {/* Right: 6 Feature Highlights Grid */}
          <div className="flex-1 flex flex-col justify-between py-1">
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading mb-4">
                {isTa ? "ஒவ்வொரு பேக்கேஜிலும் அடங்கியவை:" : "What's Included in Every Package:"}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4 sm:gap-y-5">
                {pricing.features && pricing.features.map((item, idx) => {
                  const IconComponent = featureIcons[idx] || Sparkles;
                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-indigo-50/80 flex items-center justify-center shrink-0 mt-0.5 text-indigo-600">
                        <IconComponent className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug font-heading mb-0.5">
                          {item.title}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">
                  {isTa ? "தொடக்க விலை" : "Packages Start From"}
                </span>
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                  ₹2,500 <span className="text-xs font-semibold text-slate-500">/ 30s ad</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => onOpenInquiryModal && onOpenInquiryModal()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
              >
                <span>{isTa ? "பேக்கேஜை தேர்வு செய்யவும்" : "Choose Package"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Subnote */}
        <div className="mt-8 sm:mt-10 text-center">
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {isTa 
              ? "வெறும் ₹2,500 (30 வினாடி விளம்பரம்) முதல் தொடங்குகிறது. மறைமுக கட்டணங்கள் இல்லை. 100% திருப்தி உத்தரவாதம்."
              : "Packages starting from ₹2,500 for a 30s ad. Zero hidden fees. 100% commercial ad rights."
            }
          </p>
        </div>

      </div>
    </section>
  );
}
