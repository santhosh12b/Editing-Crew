import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, languages } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState(() => {
    try {
      const saved = localStorage.getItem('app_lang');
      if (saved && (saved === 'en' || saved === 'ta')) {
        return saved;
      }
    } catch (e) {}
    return 'en';
  });

  // Update HTML lang and persist
  useEffect(() => {
    try {
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
