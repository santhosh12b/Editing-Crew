import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhatWeOfferSection from './components/WhatWeOfferSection';
import OurWorkSection from './components/OurWorkSection';
import PricingSection from './components/PricingSection';
import TestimonialsMarquee from './components/TestimonialsMarquee';
import HowItWorksSection from './components/HowItWorksSection';
import BottomCtaSection from './components/BottomCtaSection';
import Footer from './components/Footer';
import VideoModal from './components/VideoModal';
import CreateVideoModal from './components/CreateVideoModal';
import Thanks from './components/Thanks';

export default function App() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  const isThanksPage = typeof window !== 'undefined' && (
    window.location.pathname.endsWith('/thanks') || 
    window.location.pathname.endsWith('/thanks/')
  );

  const handleOpenInquiryModal = () => {
    setIsInquiryModalOpen(true);
  };

  const handleCloseInquiryModal = () => {
    setIsInquiryModalOpen(false);
  };

  const handleSelectVideo = (video) => {
    setSelectedVideo(video);
  };

  const handleCloseVideoModal = () => {
    setSelectedVideo(null);
  };

  // Scroll to the AI Showcase / Our Work section
  const handleOpenShowreel = () => {
    const el = document.getElementById('our-work') || document.getElementById('ai-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (isThanksPage) {
    return (
      <div className="relative min-h-screen bg-white text-slate-900 overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-800 flex flex-col justify-between">
        <Navbar 
          onOpenInquiryModal={handleOpenInquiryModal} 
          onOpenShowreel={handleOpenShowreel}
        />
        <main className="flex-1 flex items-center justify-center px-4 pt-28 pb-16">
          <div className="max-w-xl w-full bg-[#FAFAFC] rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl shadow-slate-200/50 text-center">
            <Thanks onClose={() => { window.location.href = '/'; }} />
          </div>
        </main>
        <Footer onOpenInquiryModal={handleOpenInquiryModal} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white text-slate-900 overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-800">
      
      {/* 1. Header / Navbar */}
      <Navbar 
        onOpenInquiryModal={handleOpenInquiryModal} 
        onOpenShowreel={handleOpenShowreel}
      />

      <main>
        {/* 1. Hero Section */}
        <HeroSection 
          onOpenShowreel={handleOpenShowreel}
          onOpenInquiryModal={handleOpenInquiryModal}
        />

        {/* 2. What We Offer / See What We Can Create Section */}
        <WhatWeOfferSection onOpenInquiryModal={handleOpenInquiryModal} />

        {/* 3. Our Work: See What AI Video Can Do for Your Brand */}
        <OurWorkSection 
          onOpenVideoModal={handleSelectVideo}
          onOpenInquiryModal={handleOpenInquiryModal}
        />

        {/* 4. What You Get for €69/Minute: Complete Video Production. One Simple Price. */}
        <PricingSection 
          onOpenInquiryModal={handleOpenInquiryModal}
        />

        {/* 5. Customer Reviews / Testimonials */}
        <TestimonialsMarquee />

        {/* 6. How It Works: From Your Idea to a Finished Video in 3 Simple Steps */}
        <HowItWorksSection />

        {/* 7. Final Call to Action Section */}
        <BottomCtaSection 
          onOpenInquiryModal={handleOpenInquiryModal}
        />
      </main>

      {/* Footer */}
      <Footer 
        onOpenInquiryModal={handleOpenInquiryModal}
      />

      {/* Full Vertical Reel Video Player Modal */}
      {selectedVideo && (
        <VideoModal 
          video={selectedVideo} 
          onClose={handleCloseVideoModal}
          onOpenInquiryModal={handleOpenInquiryModal}
        />
      )}

      {/* Interactive Video Inquiry & €69/min Calculator Modal */}
      <CreateVideoModal 
        isOpen={isInquiryModalOpen} 
        onClose={handleCloseInquiryModal} 
      />

    </div>
  );
}
