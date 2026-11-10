import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowRight, ChevronDown, MapPin, User, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { GOOGLE_SHEETS_SCRIPT_URL } from '../config/googleSheets';
import Thanks from './Thanks';

const countryList = [
  { code: 'IN', dialCode: '+91', name: 'India', minDigits: 10, maxDigits: 10, placeholder: '98765 43210' },
  { code: 'AE', dialCode: '+971', name: 'UAE (Dubai / NRI)', minDigits: 9, maxDigits: 9, placeholder: '50 123 4567' },
  { code: 'SG', dialCode: '+65', name: 'Singapore (NRI)', minDigits: 8, maxDigits: 8, placeholder: '8123 4567' },
  { code: 'MY', dialCode: '+60', name: 'Malaysia (NRI)', minDigits: 9, maxDigits: 10, placeholder: '12 345 6789' },
  { code: 'US', dialCode: '+1', name: 'United States (NRI)', minDigits: 10, maxDigits: 10, placeholder: '202 555 0199' },
  { code: 'GB', dialCode: '+44', name: 'United Kingdom (NRI)', minDigits: 10, maxDigits: 10, placeholder: '7911 123456' }
];

// Packages matching the user's uploaded price sheet
const packages = [
  {
    id: '30s',
    durationEn: '30 seconds',
    durationTa: '30 வினாடிகள்',
    rateEn: '₹5,000/min',
    rateTa: '₹5,000/நிமிடம்',
    price: '₹2,500',
    numericPrice: 2500
  },
  {
    id: '1m',
    durationEn: '1 minute',
    durationTa: '1 நிமிடம்',
    rateEn: '₹4,000/min',
    rateTa: '₹4,000/நிமிடம்',
    price: '₹4,000',
    numericPrice: 4000,
    isPopular: true
  },
  {
    id: '2m',
    durationEn: '2 minutes',
    durationTa: '2 நிமிடங்கள்',
    rateEn: '₹3,500/min',
    rateTa: '₹3,500/நிமிடம்',
    price: '₹7,000',
    numericPrice: 7000
  },
  {
    id: '5m',
    durationEn: '5 minutes',
    durationTa: '5 நிமிடங்கள்',
    rateEn: '₹3,200/min',
    rateTa: '₹3,200/நிமிடம்',
    price: '₹16,000',
    numericPrice: 16000
  },
  {
    id: '10m',
    durationEn: '10 minutes',
    durationTa: '10 நிமிடங்கள்',
    rateEn: '₹2,500/min',
    rateTa: '₹2,500/நிமிடம்',
    price: '₹30,000',
    numericPrice: 30000
  }
];

const billingOptions = [
  {
    id: 'one-time',
    labelEn: 'One-Time Project',
    labelTa: 'ஒரு முறை திட்டம் (One Time)',
    descEn: 'Single video production & delivery',
    descTa: 'ஒற்றை வீடியோ தயாரிப்பு மற்றும் டெலிவரி'
  },
  {
    id: 'monthly',
    labelEn: 'Monthly Subscription',
    labelTa: 'மாதாந்திர சேவை (Monthly)',
    descEn: 'Ongoing monthly content & reels',
    descTa: 'தொடர் மாதாந்திர வீடியோக்கள் & ரீல்கள்'
  }
];

export default function CreateVideoModal({ isOpen, onClose }) {
  const { currentLang } = useLanguage();
  const isTa = currentLang === 'ta';
  
  // Form State Fields
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(() => countryList[0]);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [city, setCity] = useState('');
  const [cityError, setCityError] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('1m');
  const [billingType, setBillingType] = useState('one-time'); // 'one-time' or 'monthly'
  
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isFreqOpen, setIsFreqOpen] = useState(false);
  const [isPkgOpen, setIsPkgOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const countryDropdownRef = useRef(null);
  const freqDropdownRef = useRef(null);
  const pkgDropdownRef = useRef(null);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        if (isCountryDropdownOpen || isFreqOpen || isPkgOpen) {
          setIsCountryDropdownOpen(false);
          setIsFreqOpen(false);
          setIsPkgOpen(false);
        } else {
          handleClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isCountryDropdownOpen, isFreqOpen, isPkgOpen]);

  // Handle click outside dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setIsCountryDropdownOpen(false);
      }
      if (freqDropdownRef.current && !freqDropdownRef.current.contains(event.target)) {
        setIsFreqOpen(false);
      }
      if (pkgDropdownRef.current && !pkgDropdownRef.current.contains(event.target)) {
        setIsPkgOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsSubmitting(false);
    setIsSuccess(false);
    setName('');
    setNameError('');
    setPhone('');
    setPhoneError('');
    setCity('');
    setCityError('');
    setBillingType('one-time');
    setSelectedPackage('1m');
    setSelectedCountry(countryList[0]);
    setIsCountryDropdownOpen(false);
    setIsFreqOpen(false);
    setIsPkgOpen(false);
    onClose();
  };

  // Strictly disallow numbers in Name input
  const handleNameChange = (e) => {
    const cleanVal = e.target.value.replace(/[0-9]/g, '');
    setName(cleanVal);
    if (nameError) setNameError('');
  };

  // Strictly disallow letters in Phone input
  const handlePhoneChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '');
    const maxDigits = selectedCountry?.maxDigits || 10;
    setPhone(digits.slice(0, maxDigits));
    if (phoneError) setPhoneError('');
  };

  // Handle City Change
  const handleCityChange = (e) => {
    setCity(e.target.value);
    if (cityError) setCityError('');
  };

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
    const maxDigits = country.maxDigits || 10;
    if (phone.length > maxDigits) {
      setPhone(phone.slice(0, maxDigits));
    }
    if (phoneError) setPhoneError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validate Name
    if (!name.trim() || name.trim().length < 2) {
      setNameError(isTa ? 'உங்கள் பெயரை உள்ளிடவும்.' : 'Please enter your name.');
      return;
    }

    // 2. Validate Phone
    const minDigits = selectedCountry?.minDigits || 10;
    if (!phone.trim() || phone.trim().length < minDigits) {
      setPhoneError(
        isTa 
          ? `குறைந்தது ${minDigits} இலக்கங்களை உள்ளிடவும்.` 
          : `Please enter at least ${minDigits} digits.`
      );
      return;
    }

    // 3. Validate City
    if (!city.trim() || city.trim().length < 2) {
      setCityError(isTa ? 'உங்கள் நகரத்தை உள்ளிடவும்.' : 'Please enter your city.');
      return;
    }

    setIsSubmitting(true);

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    const cleanPhoneDigits = phone.trim().replace(/^0+/, '');
    const fullPhone = `${selectedCountry.dialCode} ${cleanPhoneDigits || phone.trim()}`;
    const textPhone = `'${fullPhone}`;
    const pkgObj = packages.find((p) => p.id === selectedPackage) || packages[1];
    const pkgTitle = `${pkgObj.durationEn} (${pkgObj.price})`;
    const frequencyTitle = billingType === 'monthly' ? 'Monthly' : 'One Time';

    const payload = {
      date: formattedDate,
      name: name.trim(),
      phone: textPhone,
      city: city.trim(),
      package: pkgTitle,
      packageDuration: pkgObj.durationEn,
      packagePrice: pkgObj.price,
      startDate: "-",
      billingType: frequencyTitle,

      // Flexible compatibility mappings for Google Sheets headers:
      "Name": name.trim(),
      "Phone Number": textPhone,
      "City": city.trim(),
      "Package": pkgTitle,
      "Package Price": pkgObj.price,
      "Start Date": "-",
      "Monthly or One Time": frequencyTitle,
      "Frequency (Monthly / One Time)": frequencyTitle,
      "Billing Type": frequencyTitle,
      realPhone: textPhone,
      phoneNumber: textPhone,
      "Phone / WhatsApp": textPhone,
      projectType: `${pkgTitle} [${frequencyTitle}]`,
      duration: pkgObj.durationEn,
      description: `City: ${city.trim()} | Package: ${pkgTitle} | Frequency: ${frequencyTitle}`,
      countryCode: selectedCountry.dialCode,
      country: selectedCountry.code
    };

    // Send to Google Sheets web app
    if (GOOGLE_SHEETS_SCRIPT_URL) {
      try {
        fetch(GOOGLE_SHEETS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(payload)
        }).catch((err) => {
          console.warn('Google Sheets background submission notice:', err);
        });
      } catch (err) {
        console.warn('Fetch submission error:', err);
      }
    }

    // Trigger Meta Pixel Lead event if loaded
    if (typeof window !== 'undefined') {
      try {
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'Lead');
        } else {
          window._fbq = window._fbq || [];
          window.fbq = window.fbq || function() {
            (window.fbq.q = window.fbq.q || []).push(arguments);
          };
          window.fbq('track', 'Lead');
        }
      } catch (e) {
        console.warn('Meta Pixel Lead tracking error:', e);
      }
    }

    // Smooth transition then navigate to thanks page
    const getThanksPath = () => {
      if (typeof window === 'undefined') return '/thanks/';
      const path = window.location.pathname;
      const match = path.match(/^(.*\/crew)(?:\/.*)?$/);
      if (match) {
        return `${match[1]}/thanks/`;
      }
      return '/thanks/';
    };

    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      window.location.href = getThanksPath();
    }, 400);
  };

  const strings = {
    title: isTa ? "வீடியோ ஆர்டர் கோரிக்கை" : "Order Your Video Package",
    subtitle: isTa 
      ? "உங்கள் விவரங்களை பூர்த்தி செய்து, தேவையான வீடியோ பேக்கேஜைத் தேர்ந்தெடுக்கவும்."
      : "Fill in your details below and choose a package to get started.",
    nameLabel: isTa ? "பெயர் *" : "Name *",
    namePlaceholder: isTa ? "எ.கா. கார்த்திக் குமார்" : "e.g. Ramesh Kumar",
    phoneLabel: isTa ? "தொலைபேசி / WhatsApp எண் *" : "Phone Number *",
    phonePlaceholder: "98765 43210",
    cityLabel: isTa ? "நகரம் *" : "City *",
    cityPlaceholder: isTa ? "எ.கா. சென்னை, கோயம்புத்தூர், பெங்களூரு" : "e.g. Chennai, Bangalore, Coimbatore",
    questionFrequencyLabel: isTa 
      ? "மாதாந்திரமா அல்லது ஒரு முறை தேவையா? *" 
      : "Monthly or One-Time Requirement? *",
    packageLabel: isTa ? "வீடியோ பேக்கேஜ் *" : "Package *",
    submitBtn: isTa ? "வீடியோ கோரிக்கையை சமர்ப்பிக்கவும்" : "Submit Video Order",
    submitting: isTa ? "சமர்ப்பிக்கிறது..." : "Submitting Order...",
    successTitle: isTa ? "கோரிக்கை வெற்றிகரமாகப் பெறப்பட்டது!" : "Order Request Received Successfully!",
    successDesc: isTa 
      ? `நன்றி, ${name || 'வாடிக்கையாளர்'}. எங்கள் வீடியோ தயாரிப்பு குழு 12 மணி நேரத்திற்குள் உங்களைத் தொடர்புகொள்ளும்.`
      : `Thank you, ${name || 'there'}. Our video production team will reach out via WhatsApp/Phone within 12 hours.`,
    successClose: isTa ? "முடிந்தது" : "Done"
  };

  const selectedPkgObj = packages.find((p) => p.id === selectedPackage) || packages[1];
  const selectedFreqObj = billingOptions.find((b) => b.id === billingType) || billingOptions[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Backdrop overlay */}
      <div className="absolute inset-0" onClick={handleClose}></div>

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-[560px] rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-2xl text-slate-900 max-h-[92vh] overflow-y-auto no-scrollbar">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors z-20 focus:outline-none cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Modal Header */}
            <div className="pr-10 mb-4 sm:mb-5">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading mb-1 leading-snug">
                {strings.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {strings.subtitle}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              
              {/* Row 1: Name & Phone Number (2 columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                {/* Name */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1">
                    {strings.nameLabel}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={handleNameChange}
                      placeholder={strings.namePlaceholder}
                      className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none transition-all ${
                        nameError 
                          ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' 
                          : 'border-slate-200 focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600'
                      }`}
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {nameError && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{nameError}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1">
                    {strings.phoneLabel}
                  </label>

                  <div className={`relative flex rounded-xl border bg-slate-50/50 transition-all ${
                    phoneError 
                      ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-500/20' 
                      : 'border-slate-200 focus-within:ring-2 focus-within:ring-indigo-600/30 focus-within:border-indigo-600'
                  }`}>
                    
                    {/* Country Code Trigger */}
                    <div className="relative shrink-0" ref={countryDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                        className="h-full flex items-center gap-1 px-2.5 py-2 bg-slate-100/80 hover:bg-slate-200/80 text-slate-900 font-bold text-xs sm:text-sm border-r border-slate-200 rounded-l-xl transition-colors cursor-pointer select-none"
                        aria-label="Select Country Code"
                        aria-expanded={isCountryDropdownOpen}
                      >
                        <span className="text-[10px] sm:text-xs font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-1 py-0.5 rounded tracking-wide">
                          {selectedCountry.code}
                        </span>
                        <span className="font-extrabold text-slate-800 tracking-tight text-xs sm:text-sm">
                          {selectedCountry.dialCode}
                        </span>
                        <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-150 ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown Popover */}
                      {isCountryDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1.5 w-60 max-h-52 overflow-y-auto no-scrollbar rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                          <div className="space-y-0.5">
                            {countryList.map((c) => {
                              const isSelected = selectedCountry.code === c.code;
                              return (
                                <button
                                  key={c.code}
                                  type="button"
                                  onClick={() => handleSelectCountry(c)}
                                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                                    isSelected 
                                      ? 'bg-indigo-50 text-indigo-700 font-bold' 
                                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                                  }`}
                                >
                                  <div className="flex items-center gap-1.5 truncate">
                                    <span className="text-[9px] font-black text-slate-600 bg-slate-100 border border-slate-200 px-1 py-0.5 rounded">
                                      {c.code}
                                    </span>
                                    <span className="truncate">{c.name}</span>
                                  </div>
                                  <span className="text-slate-700 font-bold text-xs shrink-0 ml-1">
                                    {c.dialCode}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Phone Number Input */}
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      required
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder={selectedCountry.placeholder || strings.phonePlaceholder}
                      maxLength={selectedCountry?.maxDigits || 10}
                      className="w-full bg-transparent px-3 py-2 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none rounded-r-xl"
                    />
                  </div>
                  {phoneError && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{phoneError}</p>
                  )}
                </div>
              </div>

              {/* Row 2: City & Monthly/One-Time Question (2 columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                {/* City */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1">
                    {strings.cityLabel}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={handleCityChange}
                      placeholder={strings.cityPlaceholder}
                      className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none transition-all ${
                        cityError 
                          ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' 
                          : 'border-slate-200 focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600'
                      }`}
                    />
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {cityError && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{cityError}</p>
                  )}
                </div>

                {/* Monthly or One Time Question Dropdown */}
                <div className="relative" ref={freqDropdownRef}>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1 leading-snug">
                    {strings.questionFrequencyLabel}
                  </label>
                  
                  {/* Custom Trigger */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsFreqOpen((prev) => !prev);
                      setIsPkgOpen(false);
                      setIsCountryDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border bg-slate-50/50 text-left transition-all cursor-pointer ${
                      isFreqOpen 
                        ? 'border-indigo-600 ring-2 ring-indigo-600/20 bg-white' 
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                    aria-haspopup="listbox"
                    aria-expanded={isFreqOpen}
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {isTa ? selectedFreqObj.labelTa : selectedFreqObj.labelEn}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-2 transition-transform duration-200 ${isFreqOpen ? 'rotate-180 text-indigo-600' : ''}`} />
                  </button>

                  {/* Custom Popover */}
                  {isFreqOpen && (
                    <div className="absolute top-full left-0 mt-1.5 w-full rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl z-30 animate-in fade-in-50 zoom-in-95 duration-150 space-y-1">
                      {billingOptions.map((opt) => {
                        const isSelected = billingType === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => {
                              setBillingType(opt.id);
                              setIsFreqOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-indigo-50/90 text-indigo-950 font-bold border border-indigo-200/80 shadow-2xs'
                                : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                            }`}
                          >
                            <div className="pr-2">
                              <p className="text-xs sm:text-sm font-bold leading-tight">
                                {isTa ? opt.labelTa : opt.labelEn}
                              </p>
                              <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                                {isTa ? opt.descTa : opt.descEn}
                              </p>
                            </div>
                            {isSelected && (
                              <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Row 3: Package Selection Dropdown */}
              <div className="relative" ref={pkgDropdownRef}>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs sm:text-sm font-bold text-slate-800">
                    {strings.packageLabel}
                  </label>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 bg-slate-100 border border-slate-200/80 px-2 py-0.5 rounded-full">
                    AI Video Production
                  </span>
                </div>

                {/* Custom Trigger */}
                <button
                  type="button"
                  onClick={() => {
                    setIsPkgOpen((prev) => !prev);
                    setIsFreqOpen(false);
                    setIsCountryDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 sm:py-3 rounded-xl border bg-slate-50/50 text-left transition-all cursor-pointer ${
                    isPkgOpen
                      ? 'border-indigo-600 ring-2 ring-indigo-600/20 bg-white'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                  aria-haspopup="listbox"
                  aria-expanded={isPkgOpen}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-xs sm:text-sm font-black text-slate-900">
                      {isTa ? selectedPkgObj.durationTa : selectedPkgObj.durationEn}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      ({isTa ? selectedPkgObj.rateTa : selectedPkgObj.rateEn})
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className="text-xs sm:text-sm font-black text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-2.5 py-0.5 rounded-lg shadow-2xs">
                      {selectedPkgObj.price}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isPkgOpen ? 'rotate-180 text-indigo-600' : ''}`} />
                  </div>
                </button>

                {/* Custom Dropdown Popover */}
                {isPkgOpen && (
                  <div className="absolute top-full left-0 mt-1.5 w-full rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl z-40 animate-in fade-in-50 zoom-in-95 duration-150 max-h-60 overflow-y-auto no-scrollbar space-y-1">
                    {packages.map((pkg) => {
                      const isSelected = selectedPackage === pkg.id;
                      return (
                        <button
                          key={pkg.id}
                          type="button"
                          onClick={() => {
                            setSelectedPackage(pkg.id);
                            setIsPkgOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-50/90 text-indigo-950 font-bold border border-indigo-200/80 shadow-2xs'
                              : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            {/* Radio indicator */}
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                              isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300 bg-white'
                            }`}>
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>

                            <div>
                              <p className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                                {isTa ? pkg.durationTa : pkg.durationEn}
                              </p>
                              <p className="text-[10px] text-slate-500 font-medium">
                                {isTa ? pkg.rateTa : pkg.rateEn}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className={`text-xs sm:text-sm font-black ${isSelected ? 'text-indigo-700' : 'text-slate-900'}`}>
                              {pkg.price}
                            </span>
                            {isSelected && (
                              <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Footnote */}
                <p className="text-[10px] text-slate-400 font-medium mt-1.5 leading-relaxed px-0.5">
                  {isTa
                    ? "விலைகள் குறிப்பீட்டுக்கானவை. ஸ்கிரிப்ட், வாய்ஸ்ஓவர், எடிட்டிங் மற்றும் திருத்தங்கள் சேவை ஒப்பந்தத்தில் முடிவு செய்யப்படும்."
                    : "Prices are indicative. Define script, voiceover, editing, revisions and delivery specifications in the service agreement."
                  }
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-1.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-indigo-600/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>{strings.submitting}</span>
                  ) : (
                    <>
                      <span>{strings.submitBtn}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* Success State via Thanks component */
          <Thanks onClose={handleClose} strings={strings} />
        )}

      </div>
    </div>
  );
}
