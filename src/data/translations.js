import { taTranslation } from './translations/ta.js';

export const languages = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'ta', label: 'தமிழ் (Tamil)', short: 'TA' }
];

export const translations = {
  en: {
    hero: {
      eyebrow: "AI & 3D Video Production for Real Estate in India",
      headline: "Sell Properties Faster with High-Impact Real Estate Videos — From ₹2,999/Minute.",
      subheading: "Transform floor plans, architectural CADs, and property photos into cinematic 3D walkthroughs, aerial drone CGI, and high-converting social media reels.",
      description: "From luxury villa tours and apartment walkthroughs to plot layout animations, we handle complete 3D modeling, AI rendering, professional editing, and voiceovers.",
      primaryCta: "Get Your Property Video",
      secondaryCta: "Explore Property Showcase",
      badge1: "Just ₹2,999 / Finished Minute",
      badge2: "48–72h Turnaround",
      badge3: "100% Commercial Ad Rights"
    },
    whatWeOffer: {
      badge: "What We Create for Builders & Agents",
      heading: "Showcase Your Properties. Convert Buyers Faster.",
      subheading: "Give prospective home buyers an immersive visual experience with hyper-realistic property videos designed for Instagram, YouTube, WhatsApp marketing, and property portals.",
      cta: "Order Property Video",
      customIdeaBadge: "Custom Project Requirements",
      customIdeaHeading: "Have a large township, villa community, or commercial project?",
      customIdeaSub: "From 360° master plan CGI flythroughs to custom architectural animations — we bring any real estate project to life.",
      customIdeaBtn: "Discuss Your Project",
      items: [
        {
          id: "apartment",
          title: "Apartment & Flat Walkthroughs",
          description: "Hyper-realistic virtual tours showcasing modern living rooms, modular kitchens, master suites, and balcony views.",
          badge: "High Buyer Interest",
          icon: "Building2",
          color: "violet"
        },
        {
          id: "villa",
          title: "Luxury Villa & House Tours",
          description: "Cinematic interior and exterior tours featuring landscaped gardens, private pools, and premium architectural detailing.",
          badge: "Luxury Living",
          icon: "Home",
          color: "rose"
        },
        {
          id: "plot",
          title: "Plot & Layout CGI Flyovers",
          description: "Transform 2D plot maps into lively 3D gated communities highlighting blacktop roads, parks, water tanks, and future amenities.",
          badge: "Layout Visualizer",
          icon: "MapPin",
          color: "emerald"
        },
        {
          id: "reels",
          title: "Viral Real Estate Reels & Shorts",
          description: "Punchy, fast-paced vertical video ads crafted specifically for Instagram, Facebook Ads, and WhatsApp statuses to generate qualified buyer leads.",
          badge: "Lead Generating",
          icon: "Smartphone",
          color: "amber"
        },
        {
          id: "commercial",
          title: "Commercial & Retail Space Promos",
          description: "Demonstrate footfall potential, retail elevations, corporate office setups, and tech park facilities with polished 3D visuals.",
          badge: "B2B Commercial",
          icon: "Briefcase",
          color: "blue"
        },
        {
          id: "cinematic",
          title: "Cinematic Drone & CGI Flythroughs",
          description: "Dramatic aerial perspective views capturing neighborhood connectivity, nearby metro stations, schools, and highway access.",
          badge: "Aerial Cinematic",
          icon: "Sparkles",
          color: "pink"
        }
      ]
    },
    ourWork: {
      badge: "Real Estate Portfolio",
      heading: "See How Top Builders & Agents Sell Properties",
      subheading: "Explore virtual walkthroughs, aerial CGI, and ad reels produced for residential townships, luxury villas, and plotting projects across India.",
      cta: "View Property Reel",
      tagline: "Your next property booking starts with a visually stunning walkthrough.",
      taglineCta: "Book Your Video Today",
      filterAll: "All Properties",
      filterProduct: "Luxury Villas",
      filterUGC: "Apartment Tours",
      filterCinematic: "Drone & Aerial CGI",
      filterExplainer: "Plot Layouts"
    },
    services: {
      badge: "End-to-End Real Estate Media",
      heading: "Comprehensive Video Services for Indian Real Estate",
      subheading: "From 2D floor plans to broadcast-ready 3D architectural commercials with professional Tamil and English voiceovers at just ₹2,999 per finished minute.",
      cta: "Create Video",
      items: [
        {
          id: "apartment-walkthrough",
          title: "3D Apartment Walkthroughs",
          description: "Showcase room dimensions, sunlight flow, modular kitchen layouts, and utility spaces with photorealistic lighting.",
          tag: "Residential",
          details: ["2D Plan to 3D Conversion", "Interior Design Staging", "Balcony & Aerial Views", "Clubhouse & Gym Tours"]
        },
        {
          id: "villa-tours",
          title: "Luxury Villa & Bungalow Showcases",
          description: "Highlight premium elevations, double-height ceilings, private terraces, and landscaped courtyards.",
          tag: "High Value",
          details: ["Day & Sunset Lighting", "Material & Texture Details", "Private Garden CGI", "Car Parking & Porch Views"]
        },
        {
          id: "layout-promo",
          title: "Plot & Layout CGI Flyovers",
          description: "Help customers visualize their future home location on barren plots with demarcated boundary lines, tar roads, and streetlights.",
          tag: "Townships",
          details: ["Master Plan 3D Rendering", "Surrounding Landmarks Map", "DTCP/RERA Approval Badges", "Amenity Callouts"]
        },
        {
          id: "reels-ads",
          title: "Lead Generation Property Ads (Reels)",
          description: "Attention-grabbing vertical ads tailored for Meta Ads (Instagram/FB) that drive direct WhatsApp inquiries and site visits.",
          tag: "High Lead Conversion",
          details: ["Hooks & Urgency Triggers", "Price & EMI Breakdown", "Location Highlights", "Direct Call-to-Action"]
        },
        {
          id: "commercial-hubs",
          title: "Commercial & Office Space Walkthroughs",
          description: "Present IT parks, retail shops, showrooms, and warehouse developments with precision architecture.",
          tag: "Commercial",
          details: ["Floor Plate Previews", "Parking & Logistics Zones", "Facade Lighting CGI", "Anchor Tenant Displays"]
        },
        {
          id: "multilingual-voice",
          title: "Bilingual Property Commercials (EN & TA)",
          description: "Connect with NRI buyers and local homebuyers across Tamil Nadu and all of India with native voiceovers and localized subtitles.",
          tag: "High Reach",
          details: ["English & Tamil Voiceover", "Regional Dialect Accents", "Licensed Cinematic Music", "Tamil & English On-Screen Text"]
        }
      ]
    },
    howItWorks: {
      badge: "SIMPLE 3-STEP PROCESS",
      heading: "From Floor Plan to Finished Property Video in 3 Easy Steps",
      subheading: "No costly cameras, drone permissions, or weather delays. We create everything digitally.",
      step1: {
        num: "1",
        title: "Send Your Property Details",
        desc: "Share your 2D floor plans, elevation sketches, plot layout, photos, or rough brochure."
      },
      step2: {
        num: "2",
        title: "We Build 3D & AI Walkthrough",
        desc: "Our team models the architecture, applies realistic lighting, edits the footage, and adds professional voiceovers."
      },
      step3: {
        num: "3",
        title: "Receive Ready-to-Publish Video",
        desc: "Download your high-definition video ready for WhatsApp, Instagram, YouTube, and property portal listings."
      },
      note: "100% digital production with zero physical shoot hassle or construction dust."
    },
    showreel: {
      badge: "Real Estate Showreel",
      heading: "Explore Our Property Walkthroughs",
      subheading: "Click on any project to experience full-screen virtual tours with custom sound design and voiceover.",
      duration: "Duration",
      rate: "₹2,999/min"
    },
    valueProposition: {
      tagline: "The Smarter Alternative To Physical Film Crews",
      headline: "No Expensive Film Crews. No Construction Delays. Instant Visuals.",
      subtext: "Traditional real estate shoots cost ₹50,000–₹2,00,000 per property and require finished construction and perfect weather. We produce studio-quality 3D walkthroughs from blue-prints in days at a fraction of the cost.",
      pillar1Title: "Sell Under-Construction Units",
      pillar1Desc: "Start pre-booking and selling apartments or plots even before the foundation is laid using photorealistic 3D visualization.",
      pillar1Badge: "Boost Pre-Launch Sales",
      pillar2Title: "Fast 48–72h Delivery",
      pillar2Desc: "Receive complete edited property videos in 2 to 3 days instead of waiting weeks for physical videographers and drone teams.",
      pillar2Badge: "10x Faster Turnaround",
      pillar3Title: "Save Up To 80% Cost",
      pillar3Desc: "Eliminate camera rentals, actor fees, drone hiring, and post-production studio charges with our transparent ₹2,999/min rate.",
      pillar3Badge: "Transparent Pricing"
    },
    pricing: {
      badge: "Transparent Real Estate Video Pricing",
      heading: "Complete Property Video Production. One Simple Rate.",
      subheading: "No need to coordinate between 3D modelers, voiceover artists, video editors, and scriptwriters. We handle the entire property video from start to finish.",
      pricePrefix: "Just",
      price: "₹2,999",
      priceSuffix: "per finished minute",
      cta: "Order Property Video",
      subnote: "Starting at ₹2,999 per finished minute. Zero hidden fees. Includes 3D rendering and professional voiceover.",
      features: [
        {
          title: "3D & AI Property Modeling",
          desc: "Architectural 3D interiors, exteriors, and landscape generation from your floor plans."
        },
        {
          title: "Professional Editing & Color Grading",
          desc: "Cinematic camera transitions, smooth panning, and crisp architectural cuts."
        },
        {
          title: "Tamil & English Voiceover",
          desc: "Clear, persuasive voice narration highlighting amenities, square footage, and pricing."
        },
        {
          title: "Licensed Cinematic Music",
          desc: "Upbeat or luxury ambient background score customized for your property's target audience."
        },
        {
          title: "Text Highlights & RERA Badges",
          desc: "Clear on-screen graphic callouts for amenities, distance to landmarks, and RERA registration."
        },
        {
          title: "Multi-Format Export",
          desc: "Optimized 16:9 widescreen for YouTube & TV, plus 9:16 vertical reel format for Instagram & WhatsApp."
        }
      ]
    },
    testimonials: {
      badge: "BUILDER & BROKER REVIEWS",
      heading: "Trusted by Real Estate Developers & Agents Across India",
      subheading: "See how our walkthrough videos help property sellers close bookings faster.",
      items: [
        {
          quote: "We sold out our 3BHK luxury floor units during pre-launch entirely through these 3D walkthrough videos before the model apartment was ready. Inquiries on Meta ads doubled!",
          author: "S. K. Ramesh",
          role: "Managing Director, Sri Krishna Builders, Chennai",
          rating: 5
        },
        {
          quote: "The plot layout 3D drone CGI gave our customers a crystal-clear picture of the upcoming clubhouse and road network. Site visits increased by 70%. Outstanding quality and fast delivery.",
          author: "Anand Natarajan",
          role: "Sales Head, Greenfield Developers, Coimbatore",
          rating: 5
        },
        {
          quote: "Our Instagram real estate ad reels made by this team generated high-quality NRI investor inquiries from Dubai and Singapore. Having both Tamil and English voiceovers was a huge game-changer.",
          author: "Vignesh Sundaram",
          role: "Principal Broker, Prime Realty, Bangalore",
          rating: 5
        }
      ]
    },
    faq: {
      badge: "FREQUENTLY ASKED QUESTIONS",
      heading: "Frequently Asked Questions About Property Videos",
      subheading: "Everything you need to know about our ₹2,999/min real estate video production workflow.",
      items: [
        {
          question: "Can you create a walkthrough video if our building is still under construction?",
          answer: "Yes, absolutely! That is our specialty. You only need to provide 2D floor plans, architectural drawings, or basic elevation sketches. We convert them into photorealistic 3D virtual walkthroughs so you can start selling before construction even starts."
        },
        {
          question: "How does the ₹2,999 per finished minute pricing work?",
          answer: "It is 100% transparent with no hidden costs. A 60-second video is ₹2,999; a 2-minute comprehensive property tour is 2 × ₹2,999 = ₹5,998. This includes 3D modeling, cinematic camera moves, professional voiceover, background music, graphic titles, and 2 rounds of revisions."
        },
        {
          question: "Can we get voiceovers in both English and Tamil?",
          answer: "Yes! We specialize in bilingual real estate commercials. You can receive the video with clear English narration for NRI/corporate buyers and expressive Tamil narration for regional buyers across Tamil Nadu."
        },
        {
          question: "Do you provide vertical video formats for Instagram Reels and WhatsApp?",
          answer: "Yes. Every project can be delivered in standard 16:9 widescreen (for YouTube, presentations, website embedding) as well as 9:16 vertical format (for Instagram Reels, Facebook Ads, and WhatsApp status updates)."
        },
        {
          question: "What is your typical turnaround time?",
          answer: "Standard property walkthrough videos up to 2–3 minutes are delivered within 48 to 72 hours. For larger township master plans, we provide initial storyboard previews within 24 hours."
        }
      ]
    },
    bottomCta: {
      heading: "Ready to Accelerate Your Property Sales?",
      description: "Give your apartment, villa, or plotting project the visual impact it deserves. Generate high-intent buyer inquiries and increase site visits with high-converting 3D property videos.",
      priceHighlight: "Your first property video starts at just ₹2,999 per minute.",
      buttonText: "Request Property Video",
      subtext: "Share your floor plan or property photos, and let's bring it to life."
    },
    footer: {
      tagline: "India's premier AI & 3D real estate video production service. High-converting walkthroughs, aerial CGI, and social media reels for builders, developers, and property agents at ₹2,999/min.",
      col1Title: "Property Video Types",
      col2Title: "Solutions",
      col3Title: "Get Started",
      col3Desc: "Ready to showcase your new property? Send us your floor plan or layout details to get started today.",
      cta: "Order Property Video",
      rights: "© 2026 The Editing Crew — Real Estate Media. All rights reserved."
    },
    modal: {
      stepOf: "Step {step} of 3",
      pricePerMin: "₹2,999 / Finished Minute",
      step1Title: "Select Property Video Type",
      step1Desc: "Which type of property video do you need? Every video includes 3D modeling, cinematic camera movements, professional voiceover, and music.",
      step1Btn: "Continue to Duration & Price",
      step2Title: "Choose Duration & Voiceover Language",
      step2DurationLabel: "Select Video Length (Finished Minutes):",
      step2LangLabel: "Preferred Voiceover Language:",
      step2LangDesc: "Native pronunciation in English or Tamil with localized on-screen text.",
      totalInvestment: "Total Investment",
      allInclusive: "All inclusive",
      turnaround: "48–72h Delivery",
      revisions: "2 Revisions Included",
      step2Btn: "Continue to Project Details",
      back: "Back",
      step3Title: "Tell Us About Your Property Project",
      step3BriefLabel: "Property Details / Location / Project Highlights:",
      step3BriefPlaceholder: "e.g. We have a 2BHK & 3BHK gated apartment project in Chennai with 40+ amenities. Need a 60-second Instagram Reel walkthrough video...",
      step3NameLabel: "Your Name / Company:",
      step3EmailLabel: "Email Address:",
      step3CompanyLabel: "Builder / Agency Name:",
      submitting: "Submitting Property Brief...",
      submitBtn: "Submit Property Enquiry",
      successTitle: "Property Brief Received Successfully!",
      successDesc: "Thank you, {name}. Our real estate video production team is reviewing your property project.",
      successNote1: "We will contact you via WhatsApp / Phone within 12 hours with initial sample concepts.",
      successNote2: "Target delivery timeline: 48–72 hours from concept approval.",
      done: "Done"
    }
  },
  ta: taTranslation
};
