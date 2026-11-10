import React, { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function Thanks({ onClose, strings }) {
  useEffect(() => {
    // Fire Meta Pixel Lead Event when Thanks component loads
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      try {
        window.fbq('track', 'Lead');
      } catch (err) {
        console.warn('Meta Pixel Lead tracking error in Thanks.jsx:', err);
      }
    }
  }, []);

  return (
    <div className="py-8 sm:py-10 text-center animate-in fade-in duration-300">
      <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-sm">
        <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
      </div>

      <h3 className="text-2xl font-extrabold text-slate-900 font-heading mb-3">
        {strings?.successTitle || "Thank you for your enquiry!"}
      </h3>

      <p className="text-sm text-slate-600 max-w-md mx-auto mb-8 leading-relaxed">
        {strings?.successDesc || "We've received your request and will get back to you shortly."}
      </p>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="px-8 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
        >
          {strings?.successClose || "Done"}
        </button>
      )}
    </div>
  );
}
