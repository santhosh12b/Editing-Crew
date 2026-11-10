import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, ArrowRight, ChevronDown, Calendar, MapPin, User, Sparkles } from 'lucide-react';
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
    numericPrice: 4000
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

const getTodayString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function CreateVideoModal({ isOpen, onClose, initialService }) {
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
  const [startDate, setStartDate] = useState(getTodayString());
  const [startDateError, setStartDateError] = useState('');
  const [billingType, setBillingType] = useState('one-time'); // 'one-time' or 'monthly'
  
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const countryDropdownRef = useRef(null);

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
    setPhone('');
    setPhoneError('');
    setCity('');
    setCityError('');
    setStartDate(getTodayString());
    setStartDateError('');
    setBillingType('one-time');
    setSelectedPackage('1m');
    setSelectedCountry(countryList[0]);
    setIsCountryDropdownOpen(false);
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

    // 4. Validate Start Date
    if (!startDate) {
      setStartDateError(isTa ? 'தொடக்க தேதியை தேர்ந்தெடுக்கவும்.' : 'Please select a start date.');
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
      startDate: startDate,
      billingType: frequencyTitle,

      // Flexible compatibility mappings for any Google Sheets column headers:
      "Name": name.trim(),
      "Phone Number": textPhone,
      "City": city.trim(),
      "Package": pkgTitle,
      "Start Date": startDate,
      "Monthly or One Time": frequencyTitle,
      "Billing Type": frequencyTitle,
      realPhone: textPhone,
      phoneNumber: textPhone,
      "Phone / WhatsApp": textPhone,
      projectType: `${pkgTitle} [${frequencyTitle}]`,
      duration: pkgObj.durationEn,
      description: `City: ${city.trim()} | Start Date: ${startDate} | Frequency: ${frequencyTitle}`,
      countryCode: selectedCountry.dialCode,
      country: selectedCountry.code
    };

    // Send to Google Sheets web app if URL is configured
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

    // Trigger Meta Pixel Lead event if loaded
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      try {
        window.fbq('track', 'Lead');
      } catch (e) {
        console.warn('Meta Pixel Lead tracking error:', e);
      }
    }

    // Smooth transition
    await new Promise((resolve) => setTimeout(resolve, 600));

    setIsSubmitting(false);
    setIsSuccess(true);
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
    startDateLabel: isTa ? "தொடக்க தேதி *" : "Start Date *",
    frequencyLabel: isTa ? "திட்ட கால இடைவெளி (Monthly or One Time) *" : "Monthly or One Time *",
    packageLabel: isTa ? "வீடியோ பேக்கேஜ் தேர்ந்தெடுக்கவும் *" : "Package *",
    submitBtn: isTa ? "வீடியோ கோரிக்கையை சமர்ப்பிக்கவும்" : "Submit Video Order",
    submitting: isTa ? "சமர்ப்பிக்கிறது..." : "Submitting Order...",
    successTitle: isTa ? "கோரிக்கை வெற்றிகரமாகப் பெறப்பட்டது!" : "Order Request Received Successfully!",
    successDesc: isTa 
      ? `நன்றி, ${name || 'வாடிக்கையாளர்'}. எங்கள் வீடியோ தயாரிப்பு குழு 12 மணி நேரத்திற்குள் உங்களைத் தொடர்புகொள்ளும்.`
      : `Thank you, ${name || 'there'}. Our video production team will reach out via WhatsApp/Phone within 12 hours.`,
    successClose: isTa ? "முடிந்தது" : "Done"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Backdrop overlay */}
      <div className="absolute inset-0" onClick={handleClose}></div>

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-[620px] rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-2xl text-slate-900 max-h-[90vh] overflow-y-auto no-scrollbar">
        
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
                      className={`w-full pl-9 pr-3.5 py-2.5 sm:py-2.5 rounded-xl border bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none transition-all ${
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

              {/* Row 2: City & Start Date (2 columns) */}
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
                      className={`w-full pl-9 pr-3.5 py-2 sm:py-2.5 rounded-xl border bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none transition-all ${
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

                {/* Start Date */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1">
                    {strings.startDateLabel}
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      min={getTodayString()}
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        if (startDateError) setStartDateError('');
                      }}
                      className={`w-full pl-9 pr-3.5 py-2 sm:py-2.5 rounded-xl border bg-slate-50/50 text-slate-900 text-sm focus:outline-none transition-all ${
                        startDateError 
                          ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' 
                          : 'border-slate-200 focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600'
                      }`}
                    />
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {startDateError && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{startDateError}</p>
                  )}
                </div>
              </div>

              {/* Row 3: Monthly or One Time (2 Segmented Buttons) */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                  {strings.frequencyLabel}
                </label>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setBillingType('one-time')}
                    className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      billingType === 'one-time'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/25'
                        : 'bg-slate-50/80 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${billingType === 'one-time' ? 'opacity-100 text-white' : 'opacity-30 text-slate-400'}`} />
                    <span>{isTa ? 'ஒரு முறை (One Time)' : 'One Time'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingType('monthly')}
                    className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      billingType === 'monthly'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/25'
                        : 'bg-slate-50/80 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${billingType === 'monthly' ? 'opacity-100 text-white' : 'opacity-30 text-slate-400'}`} />
                    <span>{isTa ? 'மாதாந்திரம் (Monthly)' : 'Monthly'}</span>
                  </button>
                </div>
              </div>

              {/* Row 4: Package Selection (Matching the User's Image) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs sm:text-sm font-bold text-slate-800">
                    {strings.packageLabel}
                  </label>
                  <span className="text-[10px] sm:text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/70 px-2 py-0.5 rounded-full">
                    {isTa ? "விலைப்பட்டியல்" : "AI Video Production"}
                  </span>
                </div>

                {/* Package Card matching image styling */}
                <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden divide-y divide-slate-100">
                  <div className="bg-slate-50/70 px-3.5 py-2 sm:px-4 sm:py-2 flex items-center justify-between border-b border-slate-100">
                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 font-heading">
                        AI Video Production
                      </h4>
                      <p className="text-[10px] text-slate-500 font-medium">
                        Pay-per-video packages
                      </p>
                    </div>
                    <span className="text-xs font-black text-indigo-700 bg-white border border-indigo-200 px-2.5 py-0.5 rounded-md shadow-xs">
                      {packages.find((p) => p.id === selectedPackage)?.price}
                    </span>
                  </div>

                  {packages.map((pkg) => {
                    const isSelected = selectedPackage === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg.id)}
                        className={`px-3.5 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-emerald-50/70 border-l-4 border-l-indigo-600'
                            : 'hover:bg-slate-50/70 border-l-4 border-l-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {/* Radio Indicator */}
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300 bg-white'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>

                          <div>
                            <p className={`text-xs sm:text-sm font-extrabold leading-snug ${isSelected ? 'text-indigo-950 font-heading' : 'text-slate-900'}`}>
                              {isTa ? pkg.durationTa : pkg.durationEn}
                            </p>
                            <p className="text-[10px] text-slate-500 font-medium">
                              {isTa ? pkg.rateTa : pkg.rateEn}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className={`text-sm sm:text-base font-extrabold tracking-tight ${isSelected ? 'text-indigo-700' : 'text-slate-900'}`}>
                            {pkg.price}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footnote from image */}
                <p className="text-[10px] text-slate-500 font-medium mt-1.5 leading-relaxed px-0.5">
                  {isTa
                    ? "விலைகள் குறிப்பீட்டுக்கானவை. ஸ்கிரிப்ட், வாய்ஸ்ஓவர், எடிட்டிங் மற்றும் திருத்தங்கள் சேவை ஒப்பந்தத்தில் முடிவு செய்யப்படும்."
                    : "Prices are indicative. Define script, voiceover, editing, revisions and delivery specifications in the service agreement."
                  }
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
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
