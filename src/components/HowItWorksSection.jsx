import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function HowItWorksSection() {
  const { t } = useLanguage();
  const hiw = t?.howItWorks || {};

  const defaultSteps = [
    {
      num: "1",
      title: "Share Your Idea",
      desc: "Send us your product photos, script, reference video, or just a rough concept."
    },
    {
      num: "2",
      title: "We Create Your Video",
      desc: "Our team handles AI production, editing, sound effects, and background music."
    },
    {
      num: "3",
      title: "Receive Your Finished Video",
      desc: "Get your completed video, ready to use across your marketing channels."
    }
  ];

  const steps = [
    {
      num: hiw.step1?.num || defaultSteps[0].num,
      title: hiw.step1?.title || defaultSteps[0].title,
      desc: hiw.step1?.desc || defaultSteps[0].desc
    },
    {
      num: hiw.step2?.num || defaultSteps[1].num,
      title: hiw.step2?.title || defaultSteps[1].title,
      desc: hiw.step2?.desc || defaultSteps[1].desc
    },
    {
      num: hiw.step3?.num || defaultSteps[2].num,
      title: hiw.step3?.title || defaultSteps[2].title,
      desc: hiw.step3?.desc || defaultSteps[2].desc
    }
  ];

  return (
    <section id="how-it-works" className="pt-8 pb-10 sm:pt-14 sm:pb-16 md:pt-20 md:pb-20 bg-white relative border-t border-slate-100 scroll-mt-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-10 md:mb-14 max-w-3xl mx-auto">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-indigo-600 block mb-2">
            {hiw.badge || "HOW IT WORKS"}
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-[40px] font-extrabold text-slate-900 font-heading leading-snug sm:leading-tight mb-2 sm:mb-2.5">
            {hiw.heading || "From Your Idea to a Finished Video in 3 Simple Steps"}
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            {hiw.subheading || "Simple, straightforward, and without the hassle of a traditional video shoot."}
          </p>
        </div>

        {/* 3 Steps Flow */}
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-2.5 sm:gap-4 md:gap-4 lg:gap-6 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              {/* Step Card */}
              <div className="flex-1 bg-slate-50/70 hover:bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-200/80 p-4 sm:p-5 md:p-6 lg:p-7 flex flex-row md:flex-col items-center md:items-start gap-3.5 sm:gap-4 md:gap-0 transition-all duration-300 hover:shadow-lg hover:border-slate-300 hover:-translate-y-1">
                {/* Step Number Circle */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-base sm:text-lg shadow-md shadow-indigo-600/25 md:mb-4 shrink-0 font-heading">
                  {step.num}
                </div>

                {/* Content */}
                <div className="flex-1 text-left">
                  {/* Step Title */}
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base md:text-lg font-heading mb-1 leading-snug">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* Connecting Arrows between steps */}
              {index < steps.length - 1 && (
                <>
                  {/* Desktop Right Arrow */}
                  <div className="hidden md:flex items-center justify-center text-indigo-400 shrink-0 px-1 self-center">
                    <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 stroke-[2.5] text-indigo-400/80" />
                  </div>
                  {/* Mobile Down Arrow */}
                  <div className="flex md:hidden items-center justify-center text-indigo-400 py-0.5">
                    <ArrowDown className="w-4 h-4 stroke-[2.5] text-indigo-400/80" />
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-xs sm:text-sm font-semibold text-slate-500">
            {hiw.note || "Simple, straightforward, and without the hassle of a traditional video shoot."}
          </p>
        </div>

      </div>
    </section>
  );
}
