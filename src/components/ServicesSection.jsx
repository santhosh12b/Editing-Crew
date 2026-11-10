import React from 'react';
import { 
  ShoppingBag, 
  HelpCircle, 
  Film, 
  Sparkles, 
  TrendingUp, 
  Globe, 
  ArrowRight, 
  Check 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const iconMap = {
  'product-ads': ShoppingBag,
  'explainers': HelpCircle,
  'animated-stories': Film,
  'cinematic-vfx': Sparkles,
  'business-promo': TrendingUp,
  'multilingual': Globe,
  ShoppingBag,
  HelpCircle,
  Film,
  Sparkles,
  TrendingUp,
  Globe
};

export default function ServicesSection({ onOpenInquiryModal }) {
  const { t } = useLanguage();
  const services = t.services;

  return (
    <section id="services" className="py-20 sm:py-28 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>{services.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-heading">
            {services.heading}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            {services.subheading}
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.items.map((service) => {
            const IconComponent = iconMap[service.id] || iconMap[service.icon] || Sparkles;
            return (
              <div
                key={service.id}
                className="group relative rounded-3xl border border-slate-200/90 bg-white p-8 transition-all duration-300 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold text-slate-600 bg-slate-100/90 px-3 py-1 rounded-full border border-slate-200/60">
                      {service.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2.5 group-hover:text-indigo-600 transition-colors font-heading">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Details Pill List */}
                  <div className="space-y-2 mb-8">
                    {service.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="pt-5 border-t border-slate-100">
                  <button
                    onClick={onOpenInquiryModal}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-slate-700 bg-slate-50 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-200"
                  >
                    <span>{services.cta} {service.title}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
