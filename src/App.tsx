import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import { INDUSTRIES, FAQS, CASE_STUDIES, CLIENT_REVIEWS } from "./data";
import { ClientBlueprint, ROIinputs, ROIresults } from "./types";
import { 
  Cpu, 
  Mail, 
  Phone, 
  MapPin, 
  Loader2, 
  Sparkles, 
  Calculator, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Send,
  Calendar,
  DollarSign,
  TrendingUp,
  UserCheck,
  Instagram,
  Linkedin,
  MessageCircle,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  
  // Interactive Blueprint states
  const [formData, setFormData] = useState({
    businessName: "",
    industry: "Real Estate",
    growthGoal: "Generate 100+ High-Quality Qualified MQLs (Marketing Leads)",
    targetAudience: "",
    currentChallenges: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [blueprint, setBlueprint] = useState<ClientBlueprint | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [blueprintTab, setBlueprintTab] = useState<"persona" | "meta" | "creative" | "metrics">("persona");

  // ROI Calculator states
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [roiInputs, setRoiInputs] = useState<ROIinputs>({
    monthlyAdSpend: 150000,
    averageValuePerSale: 75000,
    expectedCpl: 450,
    closeRate: 3.5 // percentage
  });
  const [roiResults, setRoiResults] = useState<ROIresults>({
    leadsGenerated: 0,
    salesGenerated: 0,
    totalRevenue: 0,
    netProfit: 0,
    roiPercentage: 0
  });

  // Client Consultation form
  const [consultForm, setConsultForm] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    serviceInterested: "Performance Marketing",
    customMessage: ""
  });
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [whatsAppText, setWhatsAppText] = useState("");

  // Accordion FAQ states
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Testimonial Selection & Auto-Play States
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);
  const [isReviewHovered, setIsReviewHovered] = useState(false);

  useEffect(() => {
    if (isReviewHovered) return;
    const interval = setInterval(() => {
      setActiveReviewIdx((prev) => (prev + 1) % CLIENT_REVIEWS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isReviewHovered]);

  // Auto Scroll Navigation helper
  const navigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Perform continuous dynamic ROI estimations
  useEffect(() => {
    const { monthlyAdSpend, averageValuePerSale, expectedCpl, closeRate } = roiInputs;
    
    // Safety checks
    if (!monthlyAdSpend || !expectedCpl) {
      setRoiResults({ leadsGenerated: 0, salesGenerated: 0, totalRevenue: 0, netProfit: 0, roiPercentage: 0 });
      return;
    }

    const leads = Math.floor(monthlyAdSpend / expectedCpl);
    const sales = Number(((leads * closeRate) / 100).toFixed(1));
    const totalRevenue = Math.round(sales * averageValuePerSale);
    const netProfit = totalRevenue - monthlyAdSpend;
    const roiPercentage = monthlyAdSpend > 0 ? Number(((totalRevenue / monthlyAdSpend) * 100).toFixed(0)) : 0;

    setRoiResults({
      leadsGenerated: leads,
      salesGenerated: sales,
      totalRevenue,
      netProfit,
      roiPercentage
    });
  }, [roiInputs]);

  // Terminal logging simulator for premium look-and-feel during AI generation
  const runLogSequence = async () => {
    setLogs([]);
    const logMessages = [
      "Connecting to ScaleWithPC secure AI gateway...",
      "Parsing specified business archetype and audience profiles...",
      "Analyzing baseline regional customer acquisition costs for Pune & global clusters...",
      "Running predictive cost-per-lead simulation using Meta Ads framework parameters...",
      "Formulating custom messaging hook patterns & multi-layer funnel sequencing...",
      "Structuring high-converting campaign blueprint configurations..."
    ];

    for (let i = 0; i < logMessages.length; i++) {
      setLogs(prev => [...prev, `[SYSTEM] ${logMessages[i]}`]);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
  };

  // call the real server side Gemini API wrapper!
  const generateBusinessBlueprint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.industry || !formData.growthGoal) {
      alert("Please provide your Business Name, Industry, and Primary Growth Goal.");
      return;
    }

    setIsGenerating(true);
    setApiError(null);
    setBlueprint(null);

    try {
      // Start fake loading terminal sequence
      const logJob = runLogSequence();
      
      const response = await fetch("/api/generate-blueprint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      // Wait for log sequence to finish so loading feels highly tactile
      await logJob;

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.details || errorData.error || "Temporary gateway error while contacting Pandurang Chalak's AI System. Please try again.");
      }

      const data = await response.json();
      setBlueprint(data);
      setLogs(prev => [...prev, "[SUCCESS] Strategy Blueprint generated successfully. Rendering viewport components."]);
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || "Unable to reach the server context. Verify GEMINI_API_KEY value.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Submit contact lead info
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultForm.name || !consultForm.email || !consultForm.phone) {
      alert("Please fill out your Name, Email and Contact Phone Number.");
      return;
    }

    setIsSubmittingInquiry(true);

    const baseMessage = `Hello Pandurang! I would like to book a Marketing Session. Here are my details:

• Name: ${consultForm.name}
• Email: ${consultForm.email}
• Phone: ${consultForm.phone}
• Company: ${consultForm.businessName || "N/A"}
• Service Interest: ${consultForm.serviceInterested}
• Details & Objectives: ${consultForm.customMessage || "N/A"}

Please audit my specifications and confirm my priority strategy session.`;

    const encodedText = encodeURIComponent(baseMessage);
    setWhatsAppText(encodedText);

    const targetUrl = `https://wa.me/918275807179?text=${encodedText}`;

    setTimeout(() => {
      setIsSubmittingInquiry(false);
      setInquirySuccess(true);
      try {
        window.open(targetUrl, "_blank");
      } catch (err) {
        console.error("Popup blocker prevented automatic redirection", err);
      }
      setConsultForm({
        name: "",
        email: "",
        phone: "",
        businessName: "",
        serviceInterested: "Performance Marketing",
        customMessage: ""
      });
    }, 1000);
  };

  const handleSelectServiceFromSuite = (serviceName: string) => {
    setConsultForm(prev => ({
      ...prev,
      serviceInterested: serviceName
    }));
    navigateToSection("founder");
  };

  // Helper formatting numbers with regional separators (USD $ vs INR ₹)
  const formatCurrencyValue = (val: number) => {
    if (currency === "INR") {
      return `₹${val.toLocaleString("en-IN")}`;
    }
    return `$${val.toLocaleString("en-US")}`;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-orange-500/30 overflow-x-hidden">
      
      {/* Dynamic Navigation Header */}
      <Navbar onNavigate={navigateToSection} activeSection={activeSection} />

      {/* Hero Header */}
      <Hero 
        onViewTestimonials={() => navigateToSection("testimonials")}
        onNavigateToContact={() => navigateToSection("founder")}
      />

      {/* Our Core Services Section */}
      <Services onSelectService={handleSelectServiceFromSuite} />



      {/* ROI Calculator Section */}
      <section id="roi-calculator" className="py-24 bg-[#050505] border-b border-white/10 relative">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-orange-600/5 rounded-full blur-[130px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#FF6B00] font-mono text-xs uppercase tracking-[0.4em] font-bold block mb-3">
              PREDICTIVE PERFORMANCE ALGORITHM
            </span>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-4">
              Return on Investment Estimator
            </h2>
            <p className="text-sm text-white/50 font-sans leading-relaxed">
              Ditch arbitrary metrics and vanity followers. Adjust budget variables to see exactly how scale, lead-flow cost optimization, and dynamic agent conversions translate to cumulative top-line revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Input Variables Panel */}
            <div className="lg:col-span-5 bg-[#0a0a0a] border border-white/10 p-8 flex flex-col justify-between rounded-sm">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
                  <span className="text-xs font-mono tracking-widest text-[#888]">
                    PARAMETERS CONTROL PANEL
                  </span>
                  <div className="flex bg-white/5 border border-white/10 p-1 rounded-sm">
                    <button
                      onClick={() => setCurrency("INR")}
                      className={`px-2.5 py-1 text-xs font-mono transition duration-200 ${
                        currency === "INR" ? "bg-[#FF6B00] text-black font-bold" : "text-white/60 hover:text-white"
                      }`}
                    >
                      INR (₹)
                    </button>
                    <button
                      onClick={() => setCurrency("USD")}
                      className={`px-2.5 py-1 text-xs font-mono transition duration-200 ${
                        currency === "USD" ? "bg-[#FF6B00] text-black font-bold" : "text-white/60 hover:text-white"
                      }`}
                    >
                      USD ($)
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Spend slider */}
                  <div>
                    <div className="flex justify-between text-xs font-mono text-white/60 uppercase tracking-wider mb-2">
                       <span>Monthly Ad Spend</span>
                       <span className="text-white font-bold">
                        {formatCurrencyValue(roiInputs.monthlyAdSpend)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={currency === "INR" ? 30000 : 500}
                      max={currency === "INR" ? 1500000 : 20000}
                      step={currency === "INR" ? 10000 : 250}
                      value={roiInputs.monthlyAdSpend}
                      onChange={(e) => setRoiInputs({ ...roiInputs, monthlyAdSpend: Number(e.target.value) })}
                      className="w-full accent-[#FF6B00] cursor-pointer h-1.5 bg-white/10"
                    />
                  </div>

                  {/* Avg value per sale */}
                  <div>
                    <div className="flex justify-between text-xs font-mono text-white/60 uppercase tracking-wider mb-2">
                      <span>AVERAGE SALE / LIFETIME DEAL VALUE</span>
                      <span className="text-white font-bold">
                        {formatCurrencyValue(roiInputs.averageValuePerSale)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={currency === "INR" ? 5000 : 100}
                      max={currency === "INR" ? 500000 : 15000}
                      step={currency === "INR" ? 5000 : 100}
                      value={roiInputs.averageValuePerSale}
                      onChange={(e) => setRoiInputs({ ...roiInputs, averageValuePerSale: Number(e.target.value) })}
                      className="w-full accent-[#FF6B00] cursor-pointer h-1.5 bg-white/10"
                    />
                  </div>

                  {/* Expected CPL slider */}
                  <div>
                    <div className="flex justify-between text-xs font-mono text-white/60 uppercase tracking-wider mb-2">
                      <span>Estimated Cost-Per-Lead (CPL)</span>
                      <span className="text-white font-bold font-mono">
                        {formatCurrencyValue(roiInputs.expectedCpl)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={currency === "INR" ? 100 : 2}
                      max={currency === "INR" ? 2500 : 100}
                      step={currency === "INR" ? 20 : 1}
                      value={roiInputs.expectedCpl}
                      onChange={(e) => setRoiInputs({ ...roiInputs, expectedCpl: Number(e.target.value) })}
                      className="w-full accent-[#FF6B00] cursor-pointer h-1.5 bg-white/10"
                    />
                    <span className="text-[10px] text-white/40 mt-1 font-mono block">
                      Pune Local Averages: Real Estate (₹350-₹800), Education (₹150-₹300), Healthcare (₹250-₹600)
                    </span>
                  </div>

                  {/* Team Close Rate slider */}
                  <div>
                    <div className="flex justify-between text-xs font-mono text-white/60 uppercase tracking-wider mb-2">
                      <span>LEAD CLOSE RATE %</span>
                      <span className="text-white font-bold">
                        {roiInputs.closeRate}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0.5}
                      max={15}
                      step={0.5}
                      value={roiInputs.closeRate}
                      onChange={(e) => setRoiInputs({ ...roiInputs, closeRate: Number(e.target.value) })}
                      className="w-full accent-[#FF6B00] cursor-pointer h-1.5 bg-white/10"
                    />
                    <span className="text-[10px] text-white/40 mt-1 font-mono block">
                      ScaleWithPC dynamic automation templates historically raise closing margins by up to 2.5%.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 mt-8 flex items-center justify-between">
                <span className="text-xs text-white/50">Estimator values based on realistic average campaign deliverables.</span>
              </div>
            </div>

            {/* Live Outputs Metrics Panel */}
            <div className="lg:col-span-7 bg-[#050505] border border-white/10 p-8 flex flex-col justify-between relative shadow-2xl rounded-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 rounded-full blur-[80px] pointer-events-none" />
              
              <div>
                <span className="text-xs font-mono tracking-widest text-[#888] uppercase block mb-6">
                  ESTIMATED SYSTEM VELOCITY
                </span>

                <div className="grid grid-cols-2 gap-6 mb-12">
                  <div className="p-5 border border-white/5 bg-[#0a0a0a]">
                    <span className="text-white/40 uppercase tracking-widest text-[9px] font-mono">
                      High-Intent Leads / Month
                    </span>
                    <span className="text-3xl font-black text-white mt-1 block font-mono">
                      {roiResults.leadsGenerated}
                    </span>
                  </div>

                  <div className="p-5 border border-white/5 bg-[#0a0a0a]">
                    <span className="text-white/40 uppercase tracking-widest text-[9px] font-mono">
                      Closed Deals / Sales
                    </span>
                    <span className="text-3xl font-black text-white mt-1 block font-mono">
                      {roiResults.salesGenerated}
                    </span>
                  </div>

                  <div className="p-5 border border-white/5 bg-[#0a0a0a]">
                    <span className="text-white/40 uppercase tracking-widest text-[9px] font-mono">
                      Predicted Return on Spend (RoAS)
                    </span>
                    <span className="text-3xl font-black text-orange-400 mt-1 block font-mono">
                      {roiResults.roiPercentage}%
                    </span>
                  </div>

                  <div className="p-5 border border-white/5 bg-[#0a0a0a]">
                    <span className="text-white/40 uppercase tracking-widest text-[9px] font-mono">
                      Net Incremental Revenue
                    </span>
                    <span className="text-3xl font-black text-white mt-1 block font-mono">
                      {formatCurrencyValue(roiResults.totalRevenue)}
                    </span>
                  </div>
                </div>

                {/* Net profitability projection indicator bar */}
                <div className="border border-white/15 bg-white/5 p-6 rounded-sm mb-6">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-xs font-mono uppercase text-white/50 tracking-wider">
                      Net Return/Profit Incremental Value:
                    </span>
                    <span className="text-xl font-bold font-mono text-orange-400">
                      {formatCurrencyValue(roiResults.netProfit)}
                    </span>
                  </div>
                  <div className="w-full h-1 bg-white/10 overflow-hidden relative">
                    <div 
                      className="absolute left-0 top-0 h-full bg-[#FF6B00] transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.max(1, (roiResults.netProfit / (roiInputs.monthlyAdSpend * 10)) * 100))}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <span className="text-xs text-white/40 font-mono">
                  SCALE_SYS V2 // PUNE REGIONAL META SIMULATION ENGINE
                </span>
                <button
                  onClick={() => navigateToSection("founder")}
                  className="px-5 py-3 bg-white hover:bg-[#FF6B00] text-black text-xs font-mono font-bold uppercase tracking-widest transition-all text-center rounded-sm"
                >
                  Book Priority Strategy Audit
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Grid of Industry Heuristics */}
      <section id="industries" className="py-24 bg-[#0a0a0a] border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#FF6B00] font-mono text-xs uppercase tracking-[0.4em] font-bold block mb-3">
              GEOGRAPHICAL & INDUSTRY EXPERTISE
            </span>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-4">
              Whom We Build Systems For
            </h2>
            <p className="text-sm text-white/50 leading-relaxed font-sans">
              Deploying tailored local lead templates, customized audience retargeting parameters, and robust auto-response sequences across high-impact industry sectors.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {INDUSTRIES.map((ind, i) => (
              <div
                key={i}
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    industry: ind.name,
                    growthGoal: `Scale lead pipeline and increase overall brand ROI for ${ind.name}`
                  }));
                  navigateToSection("ai-engine");
                }}
                className="p-6 border border-white/10 bg-[#050505] hover:border-orange-500/50 transition-all group cursor-pointer text-left rounded-sm"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono text-orange-400 text-xs">
                    VERT_0{i + 1}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20 transition-colors group-hover:bg-[#FF6B00] group-hover:shadow-[0_0_8px_rgba(255,107,0,0.8)]" />
                </div>
                <h4 className="text-md font-bold text-white uppercase tracking-wider mb-2 font-sans group-hover:text-orange-400">
                  {ind.name}
                </h4>
                <p className="text-[10px] font-mono tracking-widest text-[#888] inline-flex items-center gap-1 group-hover:text-white transition">
                  Load Config Preset <span className="text-xs transition-transform group-hover:translate-x-0.5">&rarr;</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highly Visually Prominent Indian Client Feedbacks, Case Studies & Growth Marquee */}
      <section id="testimonials" className="py-24 bg-[#050505] border-b border-white/10 relative overflow-hidden">
        {/* Local Scope Style Injector for Hardware-Accelerated Infinite Scrolling Marquee */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-track {
            display: flex;
            width: max-content;
            animation: marquee 40s linear infinite;
          }
          .animate-marquee-track:hover {
            animation-play-state: paused;
          }
        `}} />

        {/* Ambient background aura */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-orange-600/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          
          {/* Main Display Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#FF6B00] font-mono text-xs uppercase tracking-[0.4em] font-bold block mb-3">
              VERIFIED INDIAN FOUNDERS & PARTNER FEEDBACKS
            </span>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-4">
              Performance Proof Engine
            </h2>
            <p className="text-sm text-white/50 leading-relaxed font-sans">
              Authentic performance reports, return-on-ad-spend (RoAS) analytics, and automated conversion feedback from Pune, Mumbai, and national business hubs.
            </p>
          </div>

          {/* Core Interactive Showcase: Premium Testimonial Card Carousel */}
          <div 
            className="mb-16 bg-[#0a0a0a] border border-white/10 relative p-6 md:p-10 lg:p-12 shadow-2xl rounded-sm transition-all duration-300"
            onMouseEnter={() => setIsReviewHovered(true)}
            onMouseLeave={() => setIsReviewHovered(false)}
          >
            {/* Ambient accent borders and markers */}
            <div className="absolute top-0 left-0 w-12 h-[1px] bg-[#FF6B00]" />
            <div className="absolute top-0 left-0 w-[1px] h-12 bg-[#FF6B00]" />
            <div className="absolute bottom-0 right-0 w-12 h-[1px] bg-[#FF6B00]" />
            <div className="absolute bottom-0 right-0 w-[1px] h-12 bg-[#FF6B00]" />
            
            {/* Top row feedback state and tags */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6 mb-8">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono text-[#888] tracking-widest uppercase">
                  ACTIVE CASE STUDY &bull; CLIENT FEEDBACK 0{activeReviewIdx + 1} OF 0{CLIENT_REVIEWS.length}
                </span>
              </div>
              
              <div className="inline-flex items-center gap-2 py-1 px-3 bg-[#111] border border-white/10 rounded-sm">
                <span className="text-[9px] font-mono uppercase tracking-widest text-orange-400 font-bold">
                  {CLIENT_REVIEWS[activeReviewIdx].tag}
                </span>
                <span className="text-white/20">|</span>
                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest">
                  ROAS AUDITED ✅
                </span>
              </div>
            </div>

            {/* Main Interactive Row - Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Premium Profile aspect & Meta details */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
                <div className="relative">
                  {/* Decorative rotating accent ring around profile avatar */}
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 scale-105 opacity-80 blur-[2px]" />
                  <img 
                    src={CLIENT_REVIEWS[activeReviewIdx].avatar} 
                    alt={CLIENT_REVIEWS[activeReviewIdx].name}
                    referrerPolicy="no-referrer"
                    className="relative w-24 h-24 rounded-full object-cover border-2 border-[#0a0a0a]"
                  />
                  <div className="absolute bottom-0 right-1 w-6 h-6 bg-[#FF6B00] rounded-full border-2 border-[#0a0a0a] flex items-center justify-center shadow-lg">
                    <Quote className="w-3.5 h-3.5 text-black" />
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white tracking-tight uppercase font-sans">
                    {CLIENT_REVIEWS[activeReviewIdx].name}
                  </h4>
                  <p className="text-xs text-orange-400 font-mono tracking-wider font-semibold mt-0.5">
                    {CLIENT_REVIEWS[activeReviewIdx].role}
                  </p>
                  <p className="text-[11px] text-white/50 font-sans uppercase tracking-widest mt-0.5">
                    {CLIENT_REVIEWS[activeReviewIdx].company}
                  </p>
                </div>

                {/* Rating score and location metadata block */}
                <div className="space-y-1.5 font-mono text-[10px] border-t border-white/5 pt-3 w-full">
                  <div className="flex justify-center lg:justify-start gap-1">
                    {[...Array(CLIENT_REVIEWS[activeReviewIdx].rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                    ))}
                  </div>
                  <div className="text-white/40 flex items-center justify-center lg:justify-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span>{CLIENT_REVIEWS[activeReviewIdx].location}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Testimony Quote context & High Visual Impact Metrics */}
              <div className="lg:col-span-8 space-y-6 text-left relative">
                
                {/* Visual Quote block */}
                <div className="relative bg-[#111111]/40 border border-white/5 p-6 rounded-sm">
                  <p className="text-sm md:text-base text-white/80 leading-relaxed font-sans font-light italic relative z-10">
                    &ldquo;{CLIENT_REVIEWS[activeReviewIdx].quote}&rdquo;
                  </p>
                </div>

                {/* Performance Metrics Bento Display Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-orange-950/15 border border-orange-500/10 rounded-sm flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center font-mono text-orange-400 text-sm font-bold shrink-0">
                      METRIC
                    </div>
                    <div>
                      <div className="text-xl font-black text-orange-400 tracking-tight font-mono">
                        {CLIENT_REVIEWS[activeReviewIdx].metric}
                      </div>
                      <div className="text-[10px] uppercase font-mono tracking-widest text-[#aaa]">
                        {CLIENT_REVIEWS[activeReviewIdx].metricLabel}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#111] border border-white/5 rounded-sm flex items-center gap-4 hover:border-white/10 transition-colors">
                    <div className="w-10 h-10 bg-white/5 flex items-center justify-center text-white/40 font-mono text-sm shrink-0">
                      SYS
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                        STATUS: OPTIMIZED
                      </div>
                      <div className="text-[9px] uppercase font-mono tracking-widest text-emerald-400 font-bold">
                        ACTIVE METRIC VALIDATED ✓
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Slider Navigation & Trigger Controls overlay row */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-white/5 pt-6 mt-8">
              
              {/* Dots Progress indicators */}
              <div className="flex gap-2">
                {CLIENT_REVIEWS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveReviewIdx(idx)}
                    className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                      activeReviewIdx === idx ? "w-8 bg-[#FF6B00]" : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                    title={`Jump to testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Next & Previous Navigation Button Group */}
              <div className="flex items-center gap-3 font-mono">
                <button
                  onClick={() => {
                    setActiveReviewIdx((prev) => (prev - 1 + CLIENT_REVIEWS.length) % CLIENT_REVIEWS.length);
                  }}
                  className="w-10 h-10 border border-white/15 hover:border-orange-500 hover:bg-orange-500/10 text-white hover:text-orange-400 transition-all flex items-center justify-center rounded-sm shrink-0 cursor-pointer"
                  title="Previous Lead Feedback"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-[10px] text-white/30 px-1 select-none">
                  0{activeReviewIdx + 1} / 0{CLIENT_REVIEWS.length}
                </span>
                <button
                  onClick={() => {
                    setActiveReviewIdx((prev) => (prev + 1) % CLIENT_REVIEWS.length);
                  }}
                  className="w-10 h-10 border border-white/15 hover:border-orange-500 hover:bg-orange-500/10 text-white hover:text-orange-400 transition-all flex items-center justify-center rounded-sm shrink-0 cursor-pointer"
                  title="Next Lead Feedback"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>

          </div>

          {/* Scrolling Marque Banner Intro Title */}
          <div className="text-left mb-6 flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em] font-bold block">
              &darr; REAL-TIME HORIZONTAL METRICS STREAM // HOVER TO PAUSE &darr;
            </span>
            <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
              VERIFIED IN Pune & Mumbai Hubs
            </span>
          </div>

          {/* Infinite Ribbon Scrolling Marquee Track */}
          <div className="w-full relative overflow-hidden py-4 border-t border-b border-white/5 bg-[#080808]/50 select-none">
            {/* Soft shadow gradients masking the sides of the marquee track */}
            <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee-track">
              {/* Twin identical segments mapping testimonials to make a seamless loop */}
              {[...CLIENT_REVIEWS, ...CLIENT_REVIEWS].map((rev, cardIdx) => (
                <div 
                  key={cardIdx}
                  onClick={() => {
                    // map duplicated array indices correctly to physical 0-5 indices
                    setActiveReviewIdx(cardIdx % CLIENT_REVIEWS.length);
                    const el = document.getElementById("testimonials");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mx-4 w-[280px] md:w-[320px] bg-[#0c0c0c] border border-white/10 hover:border-orange-500/50 p-5 shrink-0 rounded-sm relative flex flex-col justify-between transition-all duration-300 cursor-pointer text-left group hover:bg-[#111]"
                >
                  {/* Top segment with avatar and badge */}
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2.5">
                        <img 
                          src={rev.avatar} 
                          alt={rev.name}
                          referrerPolicy="no-referrer"
                          className="w-9 h-9 rounded-full object-cover border border-white/10 group-hover:border-orange-500 transition-all"
                        />
                        <div>
                          <div className="text-xs font-bold text-white uppercase tracking-tight group-hover:text-orange-400 font-sans transition-all">
                            {rev.name}
                          </div>
                          <div className="text-[8px] text-white/40 uppercase font-mono tracking-wider mt-0.5">
                            {rev.company}
                          </div>
                        </div>
                      </div>
                      
                      <span className="text-[8px] font-mono text-orange-400 font-bold uppercase tracking-wider bg-orange-500/5 py-1 px-1.5 border border-orange-500/10">
                        {rev.tag}
                      </span>
                    </div>

                    {/* Highly compressed visual quote snippet */}
                    <p className="text-[11px] text-white/55 leading-relaxed font-sans font-light line-clamp-2 md:line-clamp-3 mb-4">
                      &ldquo;{rev.quote}&rdquo;
                    </p>
                  </div>

                  {/* Bottom segment with giant performance tag */}
                  <div className="border-t border-white/5 pt-3 mt-1 flex justify-between items-center">
                    <div>
                      <span className="text-[7px] text-white/30 uppercase font-mono block">GROWTH AUDITED</span>
                      <span className="text-xs font-semibold text-[#FF6B00] font-mono tracking-tight block">
                        {rev.metric}
                      </span>
                    </div>
                    
                    <span className="text-[8px] text-emerald-400 font-mono flex items-center gap-1 bg-emerald-500/5 px-1.5 py-0.5 border border-emerald-500/10 rounded-sm font-bold uppercase">
                      ✓ Audit
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* About the Founder & Consultation */}
      <section id="founder" className="py-24 bg-[#0a0a0a] border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Founder Description column */}
            <div className="lg:col-span-6 text-left">
              <span className="text-[#FF6B00] font-mono text-xs uppercase tracking-[0.4em] font-bold block mb-3">
                MEET THE STRATEGIST
              </span>
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-1">
                Pandurang Chalak
              </h2>
              <span className="text-sm font-mono text-white/40 uppercase tracking-[0.1em] block mb-6">
                Founder & Performance Marketing Consultant
              </span>
              
              <p className="text-sm text-white/60 leading-relaxed font-sans mb-6">
                As a performance marketing consultant, I focus exclusively on outcomes that transform your bottom-line balance sheet. I construct ROI-driven Meta campaigns, formulate automated lead nurseries, and design conversion-optimized landing environments that attract qualifying client volumes.
              </p>

              <div className="space-y-4 border-t border-white/10 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded bg-orange-500/10 flex items-center justify-center text-[#FF6B00]">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs font-semibold text-white/80">Meta Core Advertising Heuristics</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded bg-orange-500/10 flex items-center justify-center text-[#FF6B00]">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs font-semibold text-white/80">End-to-End Consumer Funnel Mapping</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded bg-orange-500/10 flex items-center justify-center text-[#FF6B00]">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs font-semibold text-white/80">AI Strategy, Research Heuristics & Automation Workflows</span>
                </div>
              </div>

              {/* Founder location info & Social Links footer row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 p-4 border border-white/10 bg-[#050505] rounded-none">
                <div>
                  <div className="text-[10px] text-white/40 uppercase tracking-[0.1em] mb-1 font-mono">HEADQUARTERS LOCATION</div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    Pune, Maharashtra, India
                  </div>
                </div>
                <div className="border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-4">
                  <div className="text-[10px] text-white/40 uppercase tracking-[0.1em] mb-1 font-mono">OFFICIAL PROFILES</div>
                  <div className="flex gap-4 font-mono text-xs">
                    <a 
                      href="https://www.instagram.com/scalewithpc/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-white hover:text-[#FF6B00] transition flex items-center gap-1"
                    >
                      <Instagram className="w-3.5 h-3.5 text-orange-400" /> Instagram
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/pandurangchalak/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-white hover:text-[#FF6B00] transition flex items-center gap-1"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-orange-400" /> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Inbound Booking Lead capture Panel on Right */}
            <div className="lg:col-span-6 bg-[#050505] border border-white/10 p-8 shadow-2xl relative rounded-sm">
              <div className="absolute top-0 left-0 w-8 h-[1px] bg-[#FF6B00]" />
              <div className="absolute top-0 left-0 w-[1px] h-8 bg-[#FF6B00]" />

              <span className="text-xs font-mono tracking-widest text-[#888] uppercase block mb-2">
                ACQUISITION INTAKE
              </span>
              <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-6">
                Book Your Marketing Session
              </h3>

              {inquirySuccess ? (
                <div className="p-8 border border-orange-500/30 bg-orange-500/5 text-center transition-all space-y-5">
                  <span className="text-2xl font-bold block mb-2 text-[#FF6B00]">📩 Specification Compiled!</span>
                  <p className="text-xs text-white/70 leading-relaxed font-sans">
                    Thank you! Your information has been generated. Tap the direct button below to submit your marketing session specifications to Pandurang instantly on WhatsApp.
                  </p>
                  
                  <div className="py-1">
                    <a
                      href={`https://wa.me/918275807179?text=${whatsAppText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full py-4.5 bg-[#25D366] hover:bg-[#20ba5a] text-black text-xs font-mono font-bold uppercase tracking-widest transition-all justify-center items-center gap-2 rounded-sm shadow-[0_0_20px_rgba(37,211,102,0.15)] hover:scale-[1.01] cursor-pointer"
                    >
                      💬 Click to Send via WhatsApp
                    </a>
                  </div>

                  <div>
                    <button
                      onClick={() => setInquirySuccess(false)}
                      className="text-[10px] font-mono text-white/40 hover:text-white uppercase tracking-wider cursor-pointer bg-transparent border-0 hover:underline"
                    >
                      &larr; Start New Consultation Form
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-white/50 mb-1.5">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={consultForm.name}
                        onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#111] border border-white/15 focus:border-[#FF6B00] focus:outline-none text-white text-xs transition rounded-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-white/50 mb-1.5">Business Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. rahul@brand.com"
                        value={consultForm.email}
                        onChange={(e) => setConsultForm({ ...consultForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#111] border border-white/15 focus:border-[#FF6B00] focus:outline-none text-white text-xs transition rounded-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-white/50 mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 9876543210"
                        value={consultForm.phone}
                        onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#111] border border-white/15 focus:border-[#FF6B00] focus:outline-none text-white text-xs transition rounded-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-white/50 mb-1.5">Business / Company Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Acme Agency Services"
                        value={consultForm.businessName}
                        onChange={(e) => setConsultForm({ ...consultForm, businessName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#111] border border-white/15 focus:border-[#FF6B00] focus:outline-none text-white text-xs transition rounded-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-white/50 mb-1.5">Core Growth Service Interested</label>
                    <select
                      value={consultForm.serviceInterested}
                      onChange={(e) => setConsultForm({ ...consultForm, serviceInterested: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#111] border border-white/15 focus:border-[#FF6B00] focus:outline-none text-white text-xs transition rounded-none"
                    >
                      <option value="Performance Marketing">Performance Marketing (Meta Ads)</option>
                      <option value="AI-Powered Marketing Solutions">AI-Powered Marketing Solutions</option>
                      <option value="Funnel Marketing">Funnel Marketing (High-Converting Pages)</option>
                      <option value="Video Editing & Motion Graphics">Video Editing & Motion Graphics</option>
                      <option value="Graphic Design Services">Graphic Design Services</option>
                      <option value="Branding & Positioning">Branding & Positioning</option>
                      <option value="Marketing Automation">Marketing Automation (CRM/WhatsApp)</option>
                      <option value="SEO & Organic Growth">SEO & Organic Growth</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-white/50 mb-1.5">Campaign Objectives & Details</label>
                    <textarea
                      placeholder="Specify monthly budgets, audience locations, and current metrics..."
                      rows={3}
                      value={consultForm.customMessage}
                      onChange={(e) => setConsultForm({ ...consultForm, customMessage: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#111] border border-white/15 focus:border-[#FF6B00] focus:outline-none text-white text-xs transition rounded-none resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmittingInquiry}
                      className="w-full py-4 bg-white hover:bg-[#FF6B00] text-black text-xs font-mono font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer rounded-sm"
                    >
                      {isSubmittingInquiry ? (
                        <>
                          <Loader2 className="w-4.5 h-4.5 animate-spin" />
                          Submitting Specifications...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-black shrink-0" />
                          Acquire Consultation Call
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Accordion FAQs Section */}
      <section className="py-24 bg-[#050505] border-b border-white/10 relative">
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-left">
          <div className="text-center mb-16">
            <span className="text-[#FF6B00] font-mono text-xs uppercase tracking-[0.4em] font-bold block mb-3">
              FAQ SCHEDULING
            </span>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4 border-t border-white/10 pt-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx} className="border-b border-white/5 pb-4 last:border-0">
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full py-4 text-left flex items-start justify-between gap-4 cursor-pointer text-white hover:text-orange-400 group focus:outline-none"
                  >
                    <span className="text-sm font-bold uppercase tracking-wide leading-relaxed">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 shrink-0 text-orange-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 shrink-0 text-white/40 group-hover:text-orange-400 transition" />
                    )}
                  </button>
                  {isOpen && (
                    <p className="text-xs md:text-sm text-white/60 leading-relaxed font-sans max-w-3xl pb-2 transition-all">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Elegant International Standard Footer */}
      <footer className="bg-[#030303] border-t border-white/10 pt-20 pb-12 px-6 lg:px-12 relative overflow-hidden">
        {/* Subtle decorative grid background in footer */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none op-40" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          
          {/* Column 1: Brand & Purpose Statement */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center font-mono font-black text-black text-lg tracking-tighter">
                S/PC
              </div>
              <div>
                <span className="text-sm font-black text-white uppercase tracking-wider block">SCALEWITHPC</span>
                <span className="text-[9px] font-mono text-[#FF6B00] uppercase tracking-widest block font-bold">PERFORMANCE MATRIX SYSTEMS</span>
              </div>
            </div>
            
            <p className="text-xs text-white/55 leading-relaxed font-sans max-w-sm">
              We engineer conversion-optimized direct response frameworks, high-ROAS Meta funnels, and business acceleration pipelines designed for high-intensity actual growth. Secure your digital dominance.
            </p>

            <div className="space-y-2 font-mono text-[10px]">
              <div className="text-white/40 uppercase tracking-widest">Global Headquarters</div>
              <div className="text-white/80 flex items-center gap-1.5 font-sans font-semibold">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                Pune, Maharashtra, India — Operational Worldwide
              </div>
            </div>
          </div>

          {/* Column 2: Scale Solutions (Interactive Navigation) */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] font-bold block">
              Scale Solutions
            </span>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById("services");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    setConsultForm(prev => ({ ...prev, serviceInterested: "Performance Marketing" }));
                  }}
                  className="text-white/60 hover:text-[#FF6B00] transition-colors duration-200 text-left font-sans cursor-pointer"
                >
                  &rarr; Performance Marketing (Meta Ads)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById("services");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    setConsultForm(prev => ({ ...prev, serviceInterested: "AI-Powered Marketing Solutions" }));
                  }}
                  className="text-white/60 hover:text-[#FF6B00] transition-colors duration-200 text-left font-sans cursor-pointer"
                >
                  &rarr; AI-Driven Scaling Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById("services");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    setConsultForm(prev => ({ ...prev, serviceInterested: "Funnel Marketing" }));
                  }}
                  className="text-white/60 hover:text-[#FF6B00] transition-colors duration-200 text-left font-sans cursor-pointer"
                >
                  &rarr; High-Converting Landing Funnels
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById("services");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    setConsultForm(prev => ({ ...prev, serviceInterested: "Marketing Automation" }));
                  }}
                  className="text-white/60 hover:text-[#FF6B00] transition-colors duration-200 text-left font-sans cursor-pointer"
                >
                  &rarr; WhatsApp Automated CRM Flows
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById("services");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    setConsultForm(prev => ({ ...prev, serviceInterested: "Video Editing & Motion Graphics" }));
                  }}
                  className="text-white/60 hover:text-[#FF6B00] transition-colors duration-200 text-left font-sans cursor-pointer"
                >
                  &rarr; Scroll-Stopping Direct Response Video
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Direct Handshake Pipelines */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] font-bold block">
              Direct Pipelines
            </span>
            
            <div className="space-y-3.5">
              <div>
                <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest block mb-0.5">ESTABLISH CHAT SYNC</span>
                <a 
                  href="https://wa.me/918275807179?text=Hello%20Pandurang!%20I%20found%20your%20agency%20on%2520your%20website%20and%20want%20to%20audit%20my%20performance%20ads."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:text-white transition duration-200 font-mono text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
                  💬 WhatsApp: +91 82758 07179
                </a>
              </div>

              <div>
                <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest block mb-0.5">DIRECT HELPLINE</span>
                <a 
                  href="tel:+918275807179"
                  className="text-white hover:text-orange-400 transition font-sans text-xs font-bold"
                >
                  📞 Call: +91 82758 07179
                </a>
              </div>

              <div>
                <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest block mb-0.5">OFFICIAL COMMUNICATIONS</span>
                <a 
                  href="mailto:scalewithpc@gmail.com"
                  className="text-white hover:text-orange-400 transition font-mono text-xs"
                >
                  📩 scalewithpc@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Social Amplification Channels */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] font-bold block">
              Social Channels
            </span>
            
            <div className="flex flex-col gap-3 font-mono text-xs">
              <a 
                href="https://www.instagram.com/scalewithpc/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-orange-400 transition flex items-center gap-2"
              >
                <Instagram className="w-4 h-4 text-orange-500" /> 
                <span>Instagram</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/pandurangchalak/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-orange-400 transition flex items-center gap-2"
              >
                <Linkedin className="w-4 h-4 text-orange-500" /> 
                <span>LinkedIn</span>
              </a>
            </div>

            <div className="pt-3 border-t border-white/5">
              <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest block mb-1">STRATEGIST DIRECT</span>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 grayscale hover:grayscale-0 transition-all cursor-pointer" />
                <span className="text-[10px] text-white/80 font-bold font-sans">Pandurang Chalak</span>
              </div>
            </div>
          </div>

        </div>

        {/* Global baseline copyright/system state mapping */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-white/30 font-mono">
          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4">
            <span>&copy; {new Date().getFullYear()} SCALEWITHPC. ALL RIGHTS SECURED.</span>
            <span className="hidden md:inline text-white/10">|</span>
            <span>PRESERVED AND POWERED IN PUNE LABS.</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-[#25D366]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping"></span>
              <span className="font-bold text-[9px] uppercase tracking-widest">LIVE INBOUND DISPATCH</span>
            </div>
            <span className="uppercase tracking-widest text-[#FF6B00]/60">SYSTEM VERSION 3.2 // HIGH_INTENSITY_ROAS</span>
          </div>
        </div>
      </footer>

      {/* Persistent Floating WhatsApp Direct Contact Action Badge */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 group">
        {/* Subtle hover tooltip */}
        <div className="bg-[#0b0b0b] text-white border border-white/10 px-3 py-1.5 rounded-sm shadow-xl text-[10px] font-mono uppercase tracking-widest opacity-0 transform translate-x-3 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          Book Session on WhatsApp
        </div>
        
        <a
          href="https://wa.me/918275807179?text=Hello%20Pandurang!%20I%20visited%20your%20website%20and%20would%20like%20to%20book%20a%20marketing%20consultation%20session."
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#25D366] text-black rounded-full flex items-center justify-center shadow-[0_4px_24px_rgba(37,211,102,0.4)] pointer-events-auto hover:bg-[#20ba5a] hover:scale-110 active:scale-95 transition-all duration-300 relative border border-white/15 cursor-pointer"
          title="Direct WhatsApp Strategy Sync"
        >
          {/* Pulsing ring indicator around floating element */}
          <span className="absolute inset-x-0 inset-y-0 rounded-full bg-[#25D366]/40 -z-10 animate-ping" />
          <MessageCircle className="w-7 h-7 fill-black text-black shrink-0" />
        </a>
      </div>

    </div>
  );
}
