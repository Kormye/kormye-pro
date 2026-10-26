import React from 'react';

interface KormyeLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const KormyeLogo: React.FC<KormyeLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const sizeMap = {
    sm: { svg: 'w-7 h-7', text: 'text-base', sub: 'text-[9px]' },
    md: { svg: 'w-9 h-9', text: 'text-xl', sub: 'text-[10px]' },
    lg: { svg: 'w-12 h-12', text: 'text-2xl', sub: 'text-xs' },
    xl: { svg: 'w-16 h-16', text: 'text-3xl', sub: 'text-sm' },
  };

  const { svg, text } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Handcrafted Brand Logo Icon: Forest Green (#064E3B) + Emerald Green (#10B981) + Warm Amber (#F59E0B) */}
      <div className={`relative ${svg} flex-shrink-0 drop-shadow-md select-none`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <defs>
            {/* Forest Green to Emerald Green for 8-Point Geometric Star */}
            <linearGradient id="kormyeGreenEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#064E3B" />
              <stop offset="50%" stopColor="#047857" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>

            {/* Radiant Emerald Green for Crescent */}
            <linearGradient id="kormyeEmeraldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="60%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            {/* Ambient Radial Aura in Emerald Green */}
            <radialGradient id="kormyeAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#064E3B" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Ambient Aura */}
          <circle cx="50" cy="50" r="46" fill="url(#kormyeAura)" opacity="0.4" />

          {/* Outer Octagram (8-Pointed Star of Guidance) in Forest to Emerald Green */}
          <path
            d="M50 4 L61 24 L84 16 L76 39 L96 50 L76 61 L84 84 L61 76 L50 96 L39 76 L16 84 L24 61 L4 50 L24 39 L16 16 L39 24 Z"
            fill="url(#kormyeGreenEmerald)"
            stroke="#10B981"
            strokeWidth="1.5"
          />

          {/* Inner Radiant Emerald Crescent */}
          <path
            d="M58 24 A26 26 0 1 0 58 76 A21 21 0 1 1 58 24 Z"
            fill="url(#kormyeEmeraldGlow)"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
          />

          {/* Open Book of Wisdom at Center in Crisp Clean Soft Hue */}
          <path
            d="M36 62 Q50 56 50 44 Q50 56 64 62 L64 42 Q50 36 50 48 Q50 36 36 42 Z"
            fill="#E5F0E8"
            opacity="0.95"
          />

          {/* Central Shining Diamond Star in Warm Amber (#F59E0B) */}
          <polygon
            points="50,30 53,36 59,36 54,40 56,46 50,42 44,46 46,40 41,36 47,36"
            fill="#F59E0B"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-serif font-black tracking-wider ${text} bg-gradient-to-r from-emerald-200 via-white to-emerald-300 bg-clip-text text-transparent`}
            >
              KORMYE
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
              PRO
            </span>
          </div>
          <span className="text-emerald-100/90 font-medium tracking-tight text-[10px] sm:text-[11px]">
            Nidaamka Guusha & Nolol Wanaagga
          </span>
        </div>
      )}
    </div>
  );
};
