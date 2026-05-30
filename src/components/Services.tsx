import { useState } from "react";
import { SERVICES } from "../data";
import { 
  TrendingUp, 
  Cpu, 
  Layers, 
  Film, 
  Palette, 
  ShieldCheck, 
  GitMerge, 
  Search, 
  Check, 
  ArrowUpRight
} from "lucide-react";

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const [selectedId, setSelectedId] = useState<string>("perf-marketing");

  const renderIcon = (name: string, className: string = "w-5 h-5") => {
    switch (name) {
      case "TrendingUp": return <TrendingUp className={className} />;
      case "Cpu": return <Cpu className={className} />;
      case "Layers": return <Layers className={className} />;
      case "Film": return <Film className={className} />;
      case "Palette": return <Palette className={className} />;
      case "ShieldCheck": return <ShieldCheck className={className} />;
      case "GitMerge": return <GitMerge className={className} />;
      case "Search": return <Search className={className} />;
      default: return <TrendingUp className={className} />;
    }
  };

  const activeService = SERVICES.find(s => s.id === selectedId) || SERVICES[0];

  return (
    <section id="services" className="py-24 bg-[#050505] border-b border-white/10 overflow-hidden relative">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-orange-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 md:flex md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="text-[#FF6B00] font-mono text-xs uppercase tracking-[0.4em] font-bold block mb-3">
              Solutions & Marketing Systems
            </span>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-4">
              Our Core Services
            </h2>
            <p className="text-sm text-white/50 font-sans max-w-lg mt-2 leading-relaxed">
              We replace guesswork with science. Every system is built to maximize conversion rates, optimize acquisition budgets, and construct resilient scaling channels.
            </p>
          </div>
        </div>

        {/* 2-Column Setup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Horizontal & Vertical Selector list with 01 // format */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            {SERVICES.map((srv, idx) => {
              const isSelected = srv.id === selectedId;
              const formattedNum = String(idx + 1).padStart(2, "0");
              return (
                <button
                  key={srv.id}
                  onClick={() => setSelectedId(srv.id)}
                  className={`w-full text-left p-5 border transition-all flex items-center justify-between cursor-pointer group rounded-none ${
                    isSelected
                      ? "bg-[#111111] border-orange-500/50 shadow-[0_0_15px_rgba(255,107,0,0.1)] text-white"
                      : "bg-[#0b0b0b] border-white/10 text-white/50 hover:text-white hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[#FF6B00]/80 font-bold">
                      {formattedNum}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold font-sans uppercase tracking-wider">{srv.title}</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full transition-all ${
                      isSelected ? "bg-[#FF6B00] shadow-[0_0_8px_rgba(255,107,0,0.8)]" : "bg-white/10"
                    }`} />
                    <ArrowUpRight className={`w-4 h-4 shrink-0 transition-opacity ${
                      isSelected ? "opacity-100 text-orange-400" : "opacity-0 group-hover:opacity-50"
                    }`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Premium Active Detail panel in Elegant Dark Style */}
          <div className="lg:col-span-7 bg-[#0a0a0a] border border-white/10 p-8 shadow-2xl relative min-h-[480px] flex flex-col justify-between rounded-sm">
            
            {/* Top Orange Accent bar indicator */}
            <div className="absolute top-0 left-0 w-12 h-[1px] bg-[#FF6B00]" />
            <div className="absolute top-0 left-0 w-[1px] h-12 bg-[#FF6B00]" />

            <div>
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#888] uppercase">
                    01 // SYSTEM FOCUS
                  </span>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight mt-1">
                    {activeService.title}
                  </h3>
                </div>
                <div className="p-3 bg-white/5 text-orange-400 border border-white/10">
                  {renderIcon(activeService.iconName, "w-6 h-6")}
                </div>
              </div>

              {/* Description */}
              <p className="text-white/70 text-sm leading-relaxed font-sans mb-6">
                {activeService.description}
              </p>

              {/* Technical Methodology Insight */}
              {activeService.deepInfo && (
                <div className="mb-6 p-4.5 bg-white/[0.02] border-l-2 border-[#FF6B00] text-xs text-white/50 leading-relaxed font-sans italic">
                  <span className="text-[#FF6B00] font-mono not-italic font-bold block text-[10px] tracking-widest uppercase mb-1">
                    System Mechanism //
                  </span>
                  {activeService.deepInfo}
                </div>
              )}

              {/* Bullet points mapping */}
              <div className="mb-6">
                <span className="text-[9px] font-mono tracking-widest text-[#FF6B00] font-bold uppercase block mb-3">
                  CAPABILITIES & DELIVERABLES
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {activeService.bulletPoints.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-orange-500/10 flex items-center justify-center text-[#FF6B00] shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="text-xs text-white/60 font-sans leading-snug">
                        {b}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Works Highlights */}
              {activeService.clientWorks && activeService.clientWorks.length > 0 && (
                <div className="mb-6 border-t border-white/5 pt-6">
                  <span className="text-[9px] font-mono tracking-widest text-emerald-400 font-bold uppercase block mb-3">
                    ✓ ACTIVE CASE STUDY PROOFS // Local Highlights
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeService.clientWorks.map((work, idx) => (
                      <div key={idx} className="p-4 bg-black/40 border border-white/5 hover:border-orange-500/20 transition-all rounded-sm flex flex-col justify-between">
                        <div>
                          <span className="text-[11px] font-bold text-white uppercase tracking-tight block">
                            {work.client}
                          </span>
                          <p className="text-[10px] text-white/40 leading-relaxed font-sans mt-1">
                            {work.description}
                          </p>
                        </div>
                        <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between">
                          <span className="text-[8px] font-mono text-white/30 uppercase">VERIFIED RESULT</span>
                          <span className="text-[10px] font-mono text-[#FF6B00] font-bold uppercase bg-orange-500/5 px-1.5 py-0.5 border border-orange-500/10 rounded-sm shrink-0">
                            {work.result}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom section with action & goal statement */}
            <div className="border-t border-white/10 pt-6 mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block mb-1">
                  STRATEGIC OUTCOME
                </span>
                <span className="text-xs font-bold text-white uppercase tracking-wide">
                  {activeService.goal}
                </span>
              </div>
              <button
                onClick={() => onSelectService(activeService.title)}
                className="px-5 py-2.5 bg-white text-black text-xs font-mono font-bold uppercase tracking-widest hover:bg-[#FF6B00] hover:text-black transition-all cursor-pointer text-center rounded-sm"
              >
                Inquire Proposal
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
