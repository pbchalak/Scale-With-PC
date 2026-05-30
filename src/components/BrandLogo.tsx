import React from "react";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  layout?: "horizontal" | "vertical" | "icon-only";
  lightMode?: boolean;
}

export default function BrandLogo({
  className = "",
  size = "md",
  layout = "horizontal",
  lightMode = false,
}: BrandLogoProps) {
  // Color configuration aligning with the logo
  const orangeColor = "#FF6B00"; // Logo brand orange
  const sColor = lightMode ? "#1a1a1a" : "#F5F5F5"; // metallic white/silver for dark, charcoal for light
  const scaleTextColor = lightMode ? "text-neutral-900" : "text-white";

  // Dimensions based on size
  let width = "120";
  let height = "40";
  let iconSize = 36;

  if (size === "sm") {
    width = "100";
    height = "32";
    iconSize = 28;
  } else if (size === "lg") {
    width = "180";
    height = "60";
    iconSize = 48;
  } else if (size === "xl") {
    width = "240";
    height = "240"; // Vertical massive logo
    iconSize = 120;
  }

  // Beautiful SVG representing the visual emblem (The "S", diagonal trend arrow, & 3 bar columns)
  const Emblem = () => (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      {/* Dynamic gradients for premium feel */}
      <defs>
        <linearGradient id="s-gradient" x1="0" y1="0" x2="100" y2="100">
          <stop offset="0%" stopColor={sColor} />
          <stop offset="100%" stopColor={lightMode ? "#333333" : "#999999"} />
        </linearGradient>
        <linearGradient id="orange-gradient" x1="0" y1="100" x2="100" y2="0">
          <stop offset="0%" stopColor="#FF4B00" />
          <stop offset="100%" stopColor="#FF8B00" />
        </linearGradient>
      </defs>

      {/* The S Curve (charcoal or silver metallic) */}
      <path
        d="M 60 31 L 22 31 C 18 31 16 35 16 42 Q 16 49 28 49 C 34 49 54 49 54 61 Q 54 70 42 75 C 34 78 22 78 16 78 Q 23 71 31 65 C 38 61 44 61 44 57 C 44 53 36 53 28 53 C 20 53 22 41 38 41 L 60 41 Z"
        fill="url(#s-gradient)"
      />

      {/* 3 rising bar charts inside the right hook of the S */}
      <rect x="53" y="68" width="6" height="10" rx="1.5" fill="url(#orange-gradient)" />
      <rect x="61" y="60" width="6" height="18" rx="1.5" fill="url(#orange-gradient)" />
      <rect x="69" y="49" width="6" height="29" rx="1.5" fill="url(#orange-gradient)" />

      {/* Stylized high-intensity orange trend arrow cutting diagonally */}
      <path
        d="M 25 78 C 38 78 50 68 60 56 L 82 30"
        stroke="url(#orange-gradient)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Arrow Head pointing up and right */}
      <path
        d="M 70 28 L 84 28 L 84 42 Z"
        fill="url(#orange-gradient)"
      />
    </svg>
  );

  if (layout === "icon-only") {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <Emblem />
      </div>
    );
  }

  if (layout === "vertical") {
    return (
      <div className={`flex flex-col items-center text-center gap-4 ${className}`}>
        {/* Emblem on top */}
        <div className="p-3 bg-neutral-900/40 border border-white/5 rounded-md shadow-inner backdrop-blur-sm">
          <Emblem />
        </div>
        
        {/* Main Text branding */}
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight font-sans">
            <span className={scaleTextColor}>ScaleWith</span>
            <span style={{ color: orangeColor }}>PC</span>
          </h2>
          
          {/* Subtitle bordered line */}
          <div className="flex items-center gap-3 mt-3 justify-center">
            <div className="w-6 h-[1.5px]" style={{ backgroundColor: orangeColor }} />
            <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase">
              Performance Marketing
            </span>
            <div className="w-6 h-[1.5px]" style={{ backgroundColor: orangeColor }} />
          </div>
        </div>
      </div>
    );
  }

  // Default: Horizontal logo
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <Emblem />
      <div className="flex flex-col justify-center text-left">
        <div className="text-lg font-black tracking-tighter leading-none font-sans uppercase">
          <span className={scaleTextColor}>ScaleWith</span>
          <span style={{ color: orangeColor }}>PC</span>
        </div>
        <span className="text-[7.5px] font-mono tracking-[0.2em] text-white/40 uppercase mt-1">
          Performance Marketing
        </span>
      </div>
    </div>
  );
}
