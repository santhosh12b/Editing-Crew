import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, ArrowRight, ChevronDown } from 'lucide-react';
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

export default function CreateVideoModal({ isOpen, onClose, initialService }) {
  const { currentLang, t } = useLanguage();
  
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(() => countryList[0]);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [projectType, setProjectType] = useState(initialService || '');
  const [duration, setDuration] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const countryDropdownRef = useRef(null);

  useEffect(() => {
    if (initialService) {
      setProjectType(initialService);
    }
  }, [initialService]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Handle click outside country dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setIsCountryDropdownOpen(false);
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
    setEmail('');
    setPhone('');
    setPhoneError('');
    setSelectedCountry(countryList[0]);
    setIsCountryDropdownOpen(false);
    onClose();
  };

  // Strictly disallow numbers in Name input (letters and spaces only)
  const handleNameChange = (e) => {
    const cleanVal = e.target.value.replace(/[0-9]/g, '');
    setName(cleanVal);
    if (nameError) setNameError('');
  };

  // Strictly disallow letters & special characters in Phone input (digits only 0-9)
  // Strictly block typing after country's max digits (e.g. 10 digits for Germany)
  const handlePhoneChange = (e) => {
    // Only keep numeric digits 0-9
    const digits = e.target.value.replace(/\D/g, '');
    const maxDigits = selectedCountry?.maxDigits || 10;
    // Strictly prevent typing after maxDigits
    setPhone(digits.slice(0, maxDigits));
    if (phoneError) setPhoneError('');
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

    const isTa = currentLang === 'ta';

    // 1. Validate Name (minimum 2 characters)
    if (!name.trim() || name.trim().length < 2) {
      setNameError(isTa ? 'உங்கள் பெயரை உள்ளிடவும்.' : 'Please enter your name (letters only).');
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

    setIsSubmitting(true);

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Strip leading 0 for final international dial format
    const cleanPhoneDigits = phone.trim().replace(/^0+/, '');
    const fullPhone = `${selectedCountry.dialCode} ${cleanPhoneDigits || phone.trim()}`;
    const textPhone = `'${fullPhone}`;
    const selectedProjectType = projectType || (isTa ? 'பொதுவான கோரிக்கை' : 'General Enquiry');
    const selectedDuration = duration || 1;

    const payload = {
      date: formattedDate,
      name: name.trim(),
      email: email.trim(),

      // Compatibility mapping for existing Apps Script deployment:
      // (Maps data.projectType to Col D, data.duration to Col E, data.description to Col F)
      projectType: textPhone,
      duration: selectedProjectType,
      description: selectedDuration,

      // Compatibility mapping for updated Apps Script deployment:
      realPhone: textPhone,
      realProjectType: selectedProjectType,
      realDuration: selectedDuration,
      phone: textPhone,
      phoneNumber: textPhone,
      "Phone / WhatsApp": textPhone,
      "Your Name": name.trim(),
      "Email Address *": email.trim(),
      "Project Type": selectedProjectType,
      "Target Duration (minutes)": selectedDuration,
      countryCode: selectedCountry.dialCode,
      country: selectedCountry.code
    };

    // Send to Google Sheets asynchronously in background so user gets instant 1-second response
    if (GOOGLE_SHEETS_SCRIPT_URL) {
      fetch(GOOGLE_SHEETS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      }).catch((err) => {
        console.error('Failed to submit to Google Sheets:', err);
      });
    }

    // Trigger Meta Pixel Lead event
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      try {
        window.fbq('track', 'Lead');
      } catch (e) {
        console.warn('Meta Pixel Lead tracking error:', e);
      }
    }

    // Fast ~700ms loading transition for instant, seamless user experience (< 1 sec)
    await new Promise((resolve) => setTimeout(resolve, 700));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const strings = {
    title: isTa ? "உங்கள் சொத்து வீடியோ திட்டத்தைத் தொடங்குங்கள்" : "Request Your Real Estate Video",
    subtitle: isTa 
      ? "உங்கள் அடுக்குமாடி குடியிருப்பு, வில்லா அல்லது மனை திட்டம் பற்றி எங்களிடம் கூறுங்கள். வாடிக்கையாளர்களை ஈர்க்கும் சிறந்த 3D வீடியோவை நாங்கள் உருவாக்குகிறோம்."
      : "Tell us about your residential project, luxury villa, or plot layout. We will turn your floor plans into a high-converting property video.",
    nameLabel: isTa ? "உங்கள் பெயர் / பில்டர் பெயர் *" : "Your Name / Builder Name *",
    namePlaceholder: isTa ? "எ.கா. கார்த்திக் (ஸ்ரீ பில்டர்ஸ்)" : "e.g. Ramesh (Krishna Builders)",
    emailLabel: isTa ? "மின்னஞ்சல் முகவரி *" : "Email Address *",
    emailPlaceholder: "name@company.com",
    phoneLabel: isTa ? "தொலைபேசி / WhatsApp எண் *" : "WhatsApp / Phone Number *",
    phonePlaceholder: "98765 43210",
    projectTypeLabel: isTa ? "சொத்து வகை" : "Property Video Type",
    projectTypePlaceholder: isTa ? "சொத்து வகையைத் தேர்ந்தெடுக்கவும்" : "Select property video type",
    durationLabel: isTa ? "இலக்கு கால அளவு (நிமிடங்கள்)" : "Target Duration (minutes)",
    submitBtn: isTa ? "சொத்து வீடியோ கோரிக்கையை சமர்ப்பிக்கவும்" : "Submit Property Video Enquiry",
    submitting: isTa ? "சமர்ப்பிக்கிறது..." : "Submitting Property Enquiry...",
    successTitle: isTa ? "விவரங்கள் வெற்றிகரமாகப் பெறப்பட்டன!" : "Property Enquiry Received Successfully!",
    successDesc: isTa 
      ? `நன்றி, ${name || 'வாடிக்கையாளர்'}. எங்கள் ரியல் எஸ்டேட் வீடியோ குழு 12 மணி நேரத்திற்குள் உங்களைத் தொடர்புகொள்ளும்.`
      : `Thank you, ${name || 'there'}. Our real estate video production directors will reach out via WhatsApp/Phone within 12 hours with concept previews.`,
    successClose: isTa ? "மூடு" : "Close"
  };

  // Video categories from services
  const categories = [
    { value: 'apartment-walkthrough', label: isTa ? 'அடுக்குமாடி குடியிருப்பு 3D வால்க்த்ரூ' : 'Apartment & Flat 3D Walkthrough' },
    { value: 'villa-tours', label: isTa ? 'சொகுசு வில்லா & பங்களா இல்லக் காட்சிகள்' : 'Luxury Villa & Bungalow Tours' },
    { value: 'layout-promo', label: isTa ? 'வீட்டுமனை & லேஅவுட் ட்ரோன் காட்சிகள்' : 'Plot & Layout 3D Drone CGI' },
    { value: 'reels-ads', label: isTa ? 'இன்ஸ்டாகிராம் ரீல்ஸ் & வாட்ஸ்அப் விளம்பரங்கள்' : 'Property Reels & Instagram Video Ads' },
    { value: 'commercial-hubs', label: isTa ? 'வணிக வளாக & அலுவலக இடங்கள்' : 'Commercial & Retail Space Promos' },
    { value: 'multilingual-voice', label: isTa ? 'பன்மொழி வீடியோக்கள் (தமிழ் & ஆங்கிலம்)' : 'Bilingual Commercials (English & Tamil)' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Backdrop overlay */}
      <div className="absolute inset-0" onClick={handleClose}></div>

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-[620px] rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-8 md:p-9 shadow-2xl text-slate-900 overflow-hidden max-h-[92vh] overflow-y-auto">
        
        {/* Close Button (Circular, matching screenshot) */}
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
            <div className="pr-10 mb-5 sm:mb-6">
              <h3 className="text-xl sm:text-2xl md:text-[26px] font-extrabold text-slate-900 font-heading mb-1.5 leading-snug">
                {strings.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {strings.subtitle}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              
              {/* Row 1: Your Name & Email Address (2 columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                    {strings.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={handleNameChange}
                    placeholder={strings.namePlaceholder}
                    className={`w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none transition-all ${
                      nameError 
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' 
                        : 'border-slate-200 focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600'
                    }`}
                  />
                  {nameError && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{nameError}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                    {strings.emailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={strings.emailPlaceholder}
                    className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600 transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Phone Number (with Country Code) & Project Type (2 columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                    {strings.phoneLabel}
                  </label>

                  <div className={`relative flex rounded-xl border bg-slate-50/50 transition-all ${
                    phoneError 
                      ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-500/20' 
                      : 'border-slate-200 focus-within:ring-2 focus-within:ring-indigo-600/30 focus-within:border-indigo-600'
                  }`}>
                    
                    {/* Country Code Trigger Button */}
                    <div className="relative shrink-0" ref={countryDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                        className="h-full flex items-center gap-1.5 px-2.5 sm:px-3 py-2.5 sm:py-3 bg-slate-100/80 hover:bg-slate-200/80 text-slate-900 font-bold text-xs sm:text-sm border-r border-slate-200 rounded-l-xl transition-colors cursor-pointer select-none"
                        aria-label="Select Country Code"
                        aria-expanded={isCountryDropdownOpen}
                      >
                        <span className="text-[10px] sm:text-xs font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded tracking-wide">
                          {selectedCountry.code}
                        </span>
                        <span className="font-extrabold text-slate-800 tracking-tight">
                          {selectedCountry.dialCode}
                        </span>
                        <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-150 ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown Popover */}
                      {isCountryDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1.5 w-64 max-h-56 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                          <div className="space-y-0.5">
                            {countryList.map((c) => {
                              const isSelected = selectedCountry.code === c.code;
                              return (
                                <button
                                  key={c.code}
                                  type="button"
                                  onClick={() => handleSelectCountry(c)}
                                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                                    isSelected 
                                      ? 'bg-indigo-50 text-indigo-700 font-bold' 
                                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 truncate">
                                    <span className="text-[10px] font-black text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
                                      {c.code}
                                    </span>
                                    <span className="truncate">{c.name}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 ml-2 shrink-0">
                                    <span className="text-[10px] text-slate-400 font-medium">({c.minDigits} dig)</span>
                                    <span className="text-slate-700 font-bold text-xs">
                                      {c.dialCode}
                                    </span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Phone Number Input (Strictly Numeric & Capped at Country maxDigits) */}
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      required
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder={selectedCountry.placeholder || strings.phonePlaceholder}
                      maxLength={selectedCountry?.maxDigits || 10}
                      className="w-full bg-transparent px-3 py-2.5 sm:py-3 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none rounded-r-xl"
                    />
                  </div>
                  {phoneError && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{phoneError}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                    {strings.projectTypeLabel}
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600 transition-all cursor-pointer"
                  >
                    <option value="">{strings.projectTypePlaceholder}</option>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.label}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Target Duration (minutes) */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                  {strings.durationLabel}
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={duration}
                  onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600 transition-all"
                />
              </div>

              {/* Row 5: Submit Project Enquiry Button (Brand Indigo instead of orange) */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-indigo-600/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>{strings.submitting}</span>
                  ) : (
                    <span>{strings.submitBtn}</span>
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
