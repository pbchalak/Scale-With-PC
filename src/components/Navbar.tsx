import { useState } from "react";
import { Mail, Phone, Menu, X, ArrowRight, Instagram, Linkedin, MessageCircle } from "lucide-react";
import BrandLogo from "./BrandLogo";

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Solutions", target: "services" },
    { label: "ROI Estimator", target: "roi-calculator" },
    { label: "Industries", target: "industries" },
    { label: "Testimonials", target: "testimonials" },
    { label: "Founder", target: "founder" }
  ];

  const handleLinkClick = (target: string) => {
    onNavigate(target);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#050505]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo component replacing simple S/PC text */}
          <div className="flex items-center cursor-pointer" onClick={() => handleLinkClick("home")}>
            <BrandLogo size="md" />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => handleLinkClick(link.target)}
                className={`text-xs font-semibold uppercase tracking-[0.15em] transition-all cursor-pointer hover:scale-105 duration-200 ${
                  activeSection === link.target
                    ? "text-[#FF6B00]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop Right (Contact CTAs Aligning to International Standards) */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex flex-col text-right">
              <a
                href="mailto:scalewithpc@gmail.com"
                className="text-[10px] uppercase tracking-[0.15em] text-white/45 hover:text-[#FF6B00] transition-colors duration-200 font-mono"
              >
                scalewithpc@gmail.com
              </a>
              <a
                href="https://wa.me/918275807179?text=Hello%20Pandurang!%20I%20visited%20your%20website%20and%20would%20like%20to%20book%20a%20marketing%20consultation%20session."
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-white/80 hover:text-[#25D366] transition-colors duration-200 font-mono mt-1 flex items-center justify-end gap-1.5"
                title="Direct WhatsApp Helpline"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span>
                +91 82758 07179
              </a>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/scalewithpc/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/50 hover:text-[#FF6B00] hover:scale-115 transition-all duration-250"
                title="Official Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/in/pandurangchalak/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/50 hover:text-[#FF6B00] hover:scale-115 transition-all duration-250"
                title="Official LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            <div className="w-px h-8 bg-white/10" />
            
            {/* Direct Instant WhatsApp Chat Button */}
            <a
              href="https://wa.me/918275807179?text=Hello%20Pandurang!%20I%20visited%20your%20website%20and%20would%20like%20to%20book%20a%20marketing%20consultation%20session."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-transparent border border-[#25D366]/30 hover:border-[#25D366] text-[#25D366] hover:bg-[#25D366]/5 text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300 rounded-sm flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-[#25D366]/10" />
              WhatsApp Session
            </a>

            <button
              onClick={() => handleLinkClick("founder")}
              className="px-5 py-2.5 bg-white text-black text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-[#FF6B00] hover:text-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer rounded-sm"
            >
              Get Free Audit
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white/60 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#050505] border-b border-white/10 px-6 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => handleLinkClick(link.target)}
              className={`block w-full text-left py-2 text-xs font-bold uppercase tracking-wider ${
                activeSection === link.target
                  ? "text-[#FF6B00]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-4 border-t border-white/10 space-y-4">
            <div className="flex flex-col space-y-2 text-xs font-mono">
              <span className="text-white/40 uppercase tracking-widest text-[10px]">Direct Channels</span>
              <a href="mailto:scalewithpc@gmail.com" className="text-white/90 hover:text-[#FF6B00] font-bold transition">
                📩 scalewithpc@gmail.com
              </a>
              <a 
                href="https://wa.me/918275807179?text=Hello%20Pandurang!%20I%20visited%20your%20website%20and%20would%20like%20to%20book%20a%2520marketing%20consultation%20session." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#25D366] hover:text-white font-bold transition flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
                💬 WhatsApp Chat: +91 82758 07179
              </a>
            </div>
            
            <div className="flex gap-5 pt-1.5 border-t border-white/5">
              <a 
                href="https://www.instagram.com/scalewithpc/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/75 hover:text-[#FF6B00] font-bold flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider transition"
              >
                <Instagram className="w-4 h-4 text-orange-400" /> Instagram
              </a>
              <a 
                href="https://www.linkedin.com/in/pandurangchalak/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/75 hover:text-[#FF6B00] font-bold flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider transition"
              >
                <Linkedin className="w-4 h-4 text-orange-400" /> LinkedIn
              </a>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href="https://wa.me/918275807179?text=Hello%20Pandurang!%20I%20visited%20your%20website%20and%20would%20like%20to%20book%20a%20marketing%20consultation%20session."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#25D366] text-black text-xs font-mono font-bold uppercase tracking-widest hover:bg-[#20ba5a] transition-all text-center rounded-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                WhatsApp Consultation
              </a>
              
              <button
                onClick={() => handleLinkClick("founder")}
                className="w-full py-3 bg-white text-black text-xs font-mono font-bold uppercase tracking-widest hover:bg-[#FF6B00] hover:text-black transition-all text-center rounded-sm"
              >
                Get Free Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
