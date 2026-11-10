import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const originalReviews = [
  {
    id: 1,
    src: "/review.png",
    author: "Ronnie T (Big Friendly Guy)",
    role: "Local Guide · 156 reviews",
    alt: "Google review by Ronnie T: Fantastic guys love working with them !! excellent service"
  },
  {
    id: 2,
    src: "/review2.png",
    author: "S Sujin",
    role: "Verified Google Reviewer · 5 reviews",
    alt: "Google review by S Sujin: Good AI provides excellent video-making services for branding, product promotions, and conceptual videos"
  },
  {
    id: 3,
    src: "/review3.png",
    author: "Bijoy Cherian",
    role: "Verified Google Reviewer · 10 reviews",
    alt: "Google review by Bijoy Cherian: Very understanding and creative team. Keep up the good work."
  },
  {
    id: 4,
    src: "/review4.png",
    author: "Rok Hrastnik",
    role: "Verified Google Reviewer · 4 reviews",
    alt: "Google review by Rok Hrastnik: Really happy with them! Did my ad request for a few complex ads in a few days. Great service, great price, fast."
  }
];

export default function TestimonialsMarquee() {
  const { currentLang, t } = useLanguage();
  const testimonials = t?.testimonials || {};

  return (
    <section id="testimonials" className="pt-8 pb-8 sm:pt-14 sm:pb-14 md:pt-18 md:pb-18 bg-white relative border-t border-slate-100 scroll-mt-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 max-w-3xl mx-auto">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-2 sm:mb-2.5">
            {testimonials.badge || "REVIEWS"}
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-[40px] font-extrabold text-slate-900 font-heading leading-snug sm:leading-tight mb-2 sm:mb-3">
            {testimonials.heading || "What Our Clients Say"}
          </h2>
          <p className="text-slate-500 text-xs sm:text-base leading-relaxed max-w-xl mx-auto">
            {testimonials.subheading || "Trusted by builders, developers and agents across India."}
          </p>
        </div>

        {/* 2x2 Grid of Authentic Google Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 max-w-5xl mx-auto">
          {originalReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-4 md:p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
            >
              <img
                src={review.src}
                alt={review.alt}
                className="w-full h-auto object-contain select-none transition-transform duration-300 group-hover:scale-[1.01]"
                loading="lazy"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
