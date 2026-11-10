import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentLang, setLanguage, languages, currentLanguageObj } = useLanguage();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (code) => {
    setLanguage(code);
    setDropdownOpen(false);
  };

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

          {/* Right: Language Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-slate-800 bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs sm:text-sm shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 cursor-pointer"
              aria-label="Select Language"
              aria-expanded={dropdownOpen}
            >
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-800 shrink-0" />
              <span className="font-extrabold tracking-wide">
                {currentLanguageObj?.short || 'EN'}
              </span>
              <ChevronDown 
                className={`w-3.5 h-3.5 text-slate-800 transition-transform duration-200 ${
                  dropdownOpen ? 'rotate-180' : ''
                }`} 
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-slate-200/90 bg-white p-2 shadow-xl shadow-slate-200/60 z-50 animate-in fade-in-50 zoom-in-95 duration-150 text-slate-900">
                <div className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  {currentLang === 'ta' ? 'மொழி' : 'Language'}
                </div>

                <div className="space-y-0.5">
                  {languages.map((lang) => {
                    const isSelected = currentLang === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => handleSelectLanguage(lang.code)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-slate-100 text-slate-900 font-bold'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <span>{lang.label}</span>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-slate-900 stroke-[2.5]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
