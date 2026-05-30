import { ArrowRight, Sparkles, Check } from "lucide-react";
import { motion } from "motion/react";
import BrandLogo from "./BrandLogo";

interface HeroProps {
  onViewTestimonials: () => void;
  onNavigateToContact: () => void;
}

export default function Hero({ onViewTestimonials, onNavigateToContact }: HeroProps) {
  const stats = [
    { value: "$120M+", label: "REVENUE MANAGED" },
    { value: "4.2x", label: "AVG. ROAS" },
    { value: "12k+", label: "LEADS MONTHLY" }
  ];

  const valueProps = [
    "Strong Brand Positioning",
    "High-Converting Advertising",
    "Custom Marketing Automation",
    "Professional Campaign Assets"
  ];

  return (
    <section id="home" className="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-28 bg-[#050505] flex flex-col justify-center border-b border-white/10">
      {/* Subtle top ambient grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      {/* Dynamic Warm flare representing the brand orange color */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content Column */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <span className="text-[#FF6B00] font-mono text-xs uppercase tracking-[0.4em] font-bold">
                ScaleWithPC // PERFORMANCE & AI
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] shadow-[0_0_8px_rgba(255,107,0,0.8)] animate-pulse" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.85] tracking-tighter mb-6 uppercase"
            >
              Scale <br />
              <span 
                className="text-transparent" 
                style={{ WebkitTextStroke: "1px rgba(255,107,0,0.85)" }}
              >
                Smarter.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-white/60 max-w-xl mb-8 leading-relaxed font-sans"
            >
              We don't just market businesses. We build proprietary revenue engines using AI-powered growth systems, premium direct-response campaign creative, and high-converting performance funnels.
            </motion.p>

            {/* Core Action CTAs with sharp Elegant corners */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12"
            >
              <button
                onClick={onNavigateToContact}
                className="inline-flex items-center justify-center px-6 py-4.5 bg-[#FF6B00] text-black text-xs font-mono font-bold uppercase tracking-widest hover:bg-orange-500 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer rounded-sm shadow-[0_0_20px_rgba(255,107,0,0.15)]"
              >
                Book Free Growth Audit
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button
                onClick={onViewTestimonials}
                className="inline-flex items-center justify-center px-6 py-4.5 border border-white/20 bg-white/5 text-white text-xs font-mono font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all cursor-pointer rounded-sm"
              >
                View Client Reviews
              </button>
            </motion.div>

            {/* Grid of Key Features & Proof elements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 gap-y-3 gap-x-4 border-t border-white/10 pt-8 max-w-md"
            >
              {valueProps.map((prop, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-orange-500/10 flex items-center justify-center text-[#FF6B00] shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span className="text-xs font-medium text-white/50">{prop}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero Right Interactive Core Panel (Branded Emblem + Stats Counter list) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-8 border border-white/10 bg-[#0d0d0d] relative shadow-2xl rounded-sm"
            >
              <div className="absolute top-0 left-0 w-8 h-[1px] bg-[#FF6B00]" />
              <div className="absolute top-0 left-0 w-[1px] h-8 bg-[#FF6B00]" />
              <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-[#FF6B00]" />
              <div className="absolute bottom-0 right-0 w-[1px] h-8 bg-[#FF6B00]" />
              
              {/* Incorporate gorgeous large layout of the user's uploaded logo */}
              <div className="mb-8 pb-8 border-b border-white/10 flex justify-center">
                <BrandLogo layout="vertical" size="xl" className="transform hover:scale-105 transition-transform duration-300" />
              </div>

              <span className="text-[10px] font-mono tracking-widest text-[#888] block mb-6">
                PROVEN BENCHMARKS // BY THE NUMBERS
              </span>

              {/* Three detailed massive Stats rows */}
              <div className="flex flex-col gap-8">
                {stats.map((st, i) => (
                  <div key={i} className="flex items-baseline justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <div>
                      <div className="text-4xl sm:text-5xl font-black text-white font-sans tracking-tight">
                        {st.value}
                      </div>
                      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mt-1">
                        {st.label}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#FF6B00]/70 font-bold">
                      (0{i + 1})
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
