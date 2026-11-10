import React from 'react';
import { X, Check, Sparkles } from 'lucide-react';
import { comparisonPoints } from '../data/landingData';

export default function ComparisonSection() {
  return (
    <section id="alternatives" className="py-14 sm:py-20 md:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Smart Way To Grow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-3">
            Why creators choose us
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            See how FacelessReels compares to traditional content creation methods
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: Hiring video editors */}
          <div className="rounded-2xl border border-red-500/20 bg-red-950/10 p-6 flex flex-col justify-between transition-all duration-300 hover:border-red-500/40">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-base sm:text-lg text-foreground">
                  Hiring video editors
                </h3>
                <div className="p-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400">
                  <X className="h-4 w-4" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Expensive at $50–200 per video, requires endless back-and-forth management and coordination with unreliable freelancers.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-red-500/15 text-xs font-semibold text-red-400">
              ❌ High cost & high friction
            </div>
          </div>

          {/* Card 2: Creating videos yourself */}
          <div className="rounded-2xl border border-red-500/20 bg-red-950/10 p-6 flex flex-col justify-between transition-all duration-300 hover:border-red-500/40">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-base sm:text-lg text-foreground">
                  Creating videos yourself
                </h3>
                <div className="p-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400">
                  <X className="h-4 w-4" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Exhausting process of daily scripting, voice recording, manual B-roll editing, subtitling, and publishing across multiple channels.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-red-500/15 text-xs font-semibold text-red-400">
              ❌ 20+ hours wasted every week
            </div>
          </div>

          {/* Card 3: FacelessReels (Winner) */}
          <div className="relative rounded-2xl border-2 border-emerald-500/50 bg-emerald-950/15 p-6 flex flex-col justify-between shadow-lg shadow-emerald-500/10 transition-all duration-300 hover:border-emerald-500/80 hover:scale-[1.02]">
            {/* Recommended Tag */}
            <div className="absolute -top-3 left-6 px-2.5 py-0.5 rounded-full bg-emerald-500 text-black text-[11px] font-extrabold uppercase tracking-wider">
              Recommended
            </div>

            <div>
              <div className="flex items-center justify-between mb-3 mt-1">
                <h3 className="font-bold text-base sm:text-lg text-emerald-400">
                  FacelessReels
                </h3>
                <div className="p-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                  <Check className="h-4 w-4 stroke-[3]" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Create and publish high-quality faceless reels on total autopilot across TikTok, Instagram, and YouTube while you sleep.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-emerald-500/20 text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <span>✅ 100% automated & scalable</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
