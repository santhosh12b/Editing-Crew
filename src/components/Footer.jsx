import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;

  return (
    <footer className="border-t border-slate-200/80 bg-white py-10 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          
          {/* Logo & Brand Tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a href="#" className="flex items-center space-x-2.5 sm:space-x-3 group">
              <img 
                src="/logo.png" 
                alt="The Editing Crew" 
                className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow-[0_4px_10px_rgba(16,185,129,0.3)] group-hover:scale-105 transition-transform duration-200" 
              />
              <span 
                className="text-xl font-semibold tracking-tight text-slate-900 font-heading"
                style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 600 }}
              >
                The Editing Crew
              </span>
            </a>
            <span className="hidden sm:inline text-slate-300">|</span>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {t.hero.eyebrow}
            </p>
          </div>

          {/* Copyright Notice */}
          <p className="text-xs sm:text-sm text-slate-500">
            {f.rights}
          </p>

        </div>
      </div>
    </footer>
  );
}
