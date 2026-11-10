import React, { useState } from 'react';
import { ShieldCheck, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { weeklyAnalytics, featuredChannels } from '../data/landingData';

export default function AnalyticsSection() {
  const [hoveredDay, setHoveredDay] = useState(null);

  return (
    <section className="py-16 md:py-24 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-5xl">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            We actually get views
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Real numbers from the TikTok, YouTube and Instagram accounts our users connected.
          </p>
        </div>

        {/* 2-Column Cards Grid */}
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
          
          {/* Card 1: Views Last Week & 7-Day Chart */}
          <div className="flex h-full flex-col rounded-2xl border border-border bg-card/70 p-6 sm:p-7 shadow-sm transition-all duration-300 hover:border-border/80">
            
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-muted-foreground">Views last week</p>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                Live tracking
              </span>
            </div>

            <p className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums text-foreground">
              {weeklyAnalytics.totalViews}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {weeklyAnalytics.dateRange}
            </p>

            {/* 7-Day Bar Chart */}
            <div className="mt-8 flex min-h-[170px] flex-1 flex-col justify-end">
              <div className="flex flex-1 items-end gap-2.5 sm:gap-3.5">
                {weeklyAnalytics.days.map((item, index) => {
                  const isHovered = hoveredDay === index;
                  return (
                    <div 
                      key={item.day}
                      onMouseEnter={() => setHoveredDay(index)}
                      onMouseLeave={() => setHoveredDay(null)}
                      className="flex flex-1 flex-col items-center group/bar cursor-pointer"
                    >
                      <div className="relative w-full flex items-end justify-center h-32">
                        {/* Day View Tag on top of bar */}
                        <span 
                          className={`absolute inset-x-0 text-center text-[11px] font-semibold tabular-nums transition-all duration-200 ${
                            isHovered ? 'text-primary scale-110 font-bold' : 'text-muted-foreground'
                          }`}
                          style={{ bottom: `calc(${item.height} + 6px)` }}
                        >
                          {item.value}
                        </span>

                        {/* Bar Pillar */}
                        <div 
                          className={`w-full rounded-t-md rounded-b-sm bg-gradient-to-t transition-all duration-300 ${
                            isHovered 
                              ? 'from-primary to-indigo-400 shadow-lg shadow-primary/30' 
                              : 'from-primary/60 to-primary hover:from-primary/80 hover:to-primary'
                          }`}
                          style={{ height: item.height }}
                        ></div>
                      </div>

                      <span className={`mt-2 text-center text-xs transition-colors ${
                        isHovered ? 'text-foreground font-semibold' : 'text-muted-foreground'
                      }`}>
                        {item.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Verified Platforms Footer */}
            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-border/60 pt-4">
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-500" />
                Verified via official platform integrations
              </span>

              <div className="flex items-center gap-3">
                {/* TikTok */}
                <div title="TikTok verified" className="flex items-center gap-1 text-xs font-medium text-foreground bg-muted/60 px-2 py-0.5 rounded border border-border">
                  <span>TikTok</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/20" />
                </div>
                {/* YouTube */}
                <div title="YouTube verified" className="flex items-center gap-1 text-xs font-medium text-foreground bg-muted/60 px-2 py-0.5 rounded border border-border">
                  <span>YouTube</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/20" />
                </div>
                {/* Instagram */}
                <div title="Instagram verified" className="flex items-center gap-1 text-xs font-medium text-foreground bg-muted/60 px-2 py-0.5 rounded border border-border">
                  <span>Instagram</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/20" />
                </div>
              </div>
            </div>

          </div>

          {/* Card 2: Creator Channels Showcase */}
          <div className="flex h-full min-w-0 flex-col rounded-2xl border border-border bg-card/70 p-6 sm:p-7 shadow-sm">
            <p className="text-sm font-semibold text-muted-foreground mb-4">
              Pages our users run with FacelessReels
            </p>

            <div className="flex flex-col justify-between flex-1 divide-y divide-border/50">
              {featuredChannels.map((channel, index) => (
                <a
                  key={index}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 py-4 first:pt-0 last:pb-0 hover:bg-muted/30 px-3 -mx-3 rounded-xl transition-colors"
                >
                  {/* Channel Views Graph Thumbnail */}
                  <div className="relative w-full sm:w-40 sm:h-20 shrink-0 overflow-hidden rounded-lg bg-zinc-900 border border-border/70">
                    <img
                      src={channel.image}
                      alt={`Analytics for ${channel.name}`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-semibold text-emerald-400">
                      {channel.totalViews} views
                    </div>
                  </div>

                  {/* Channel Details */}
                  <div className="flex min-w-0 flex-1 items-center justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/20 border border-primary/30 font-bold text-xs text-primary">
                        {channel.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="truncate text-sm font-bold text-foreground">
                            {channel.name}
                          </p>
                        </div>
                        <p className="truncate text-xs text-muted-foreground">
                          {channel.handle}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline pl-2">
                      <span>View</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </a>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
