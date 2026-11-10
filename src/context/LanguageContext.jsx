import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, languages } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState(() => {
    try {
      // 1. If URL has explicit ?lang= parameter
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get('lang');
        if (urlLang === 'ta' || urlLang === 'en') {
          return urlLang;
        }
      }
      // 2. Active session preference (if user clicked during this session)
      const sessionLang = sessionStorage.getItem('app_lang');
      if (sessionLang === 'en' || sessionLang === 'ta') {
        return sessionLang;
      }
    } catch (e) {}
    // Default: English first
    return 'en';
  });

  // Update HTML lang and persist
  useEffect(() => {
    try {
      sessionStorage.setItem('app_lang', currentLang);
      localStorage.setItem('app_lang', currentLang);
    } catch (e) {}

    document.documentElement.lang = currentLang;

    if (currentLang === 'ta') {
      document.title = "ரியல் எஸ்டேட் AI வீடியோ தயாரிப்பு — இந்தியாவில் சொத்து விளம்பர வீடியோக்கள்";
    } else {
      document.title = "Real Estate AI Video Production — Property Walkthrough & Ad Videos in India";
    }
  }, [currentLang]);

  const t = translations[currentLang] || translations.en;
  const currentLanguageObj = languages.find(l => l.code === currentLang) || languages[0];

  const currency = '₹';
  const pricePerMinute = 2500;
  const priceFormatted = '₹2,500';
  const rateText = '₹2,500';

  return (
    <LanguageContext.Provider value={{ 
      currentLang, 
      setLanguage: setCurrentLang, 
      t, 
      languages,
      currentLanguageObj,
      isTamil: currentLang === 'ta',
      currency,
      pricePerMinute,
      priceFormatted,
      rateText,
      isSingapore: false,
      isMalaysia: false,
      navigateToMarket: () => {}
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
