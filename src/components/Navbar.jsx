import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { currentLang, setLanguage } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          
          {/* Logo */}
          <a 
            href="/" 
            className="flex items-center space-x-2.5 sm:space-x-3 group"
          >
            <img 
              src="/logo.png" 
              alt="The Editing Crew Logo" 
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-[0_4px_12px_rgba(16,185,129,0.35)] group-hover:scale-105 transition-transform duration-200" 
            />
            <span 
              className="text-xl sm:text-2xl font-semibold text-slate-900 font-heading"
              style={{ fontWeight: 600 }}
            >
              The Editing Crew
            </span>
          </a>

          {/* Right: Direct 1-Click Language Switcher */}
          <div className="flex items-center">
            <div className="flex items-center p-0.5 sm:p-1 rounded-full border border-slate-200 bg-slate-100/90 shadow-2xs">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  currentLang === 'en'
                    ? 'bg-white text-indigo-700 shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                aria-label="Switch to English"
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ta')}
                className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  currentLang === 'ta'
                    ? 'bg-white text-indigo-700 shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                aria-label="தமிழில் மாற்றவும்"
              >
                தமிழ்
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
