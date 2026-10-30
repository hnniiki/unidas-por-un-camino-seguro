import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  NaviCustomization, 
  naviCustomizationService, 
  NAVI_COLOR_PALETTES 
} from '../utils/naviCustomization';

interface NaviMascotProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  mood?: 'happy' | 'talking' | 'thinking' | 'protective' | 'neutral';
  showBadge?: boolean;
  onClick?: () => void;
  animated?: boolean;
  customization?: Partial<NaviCustomization>;
}

export const NaviMascot: React.FC<NaviMascotProps> = ({
  className = '',
  size = 'md',
  mood = 'happy',
  showBadge = true,
  onClick,
  animated = true,
  customization: explicitCustomization,
}) => {
  const [globalCustomization, setGlobalCustomization] = useState<NaviCustomization>(
    naviCustomizationService.getCustomization()
  );

  useEffect(() => {
    // Subscribe to wardrobe changes across all pages and components
    const unsubscribe = naviCustomizationService.subscribe(() => {
      setGlobalCustomization(naviCustomizationService.getCustomization());
    });
    return unsubscribe;
  }, []);

  const activeCustomization: NaviCustomization = {
    ...globalCustomization,
    ...(explicitCustomization || {}),
  };

  const palette = NAVI_COLOR_PALETTES[activeCustomization.color] || NAVI_COLOR_PALETTES.classic;
  const hat = activeCustomization.hat;
  const glasses = activeCustomization.glasses;
  const outfit = activeCustomization.outfit;

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
    hero: 'w-64 h-64 md:w-80 md:h-80',
  };

  const isTalking = mood === 'talking';
  const isThinking = mood === 'thinking';

  return (
    <motion.div
      className={`relative inline-flex items-center justify-center select-none ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.06, rotate: 2 } : {}}
      whileTap={onClick ? { scale: 0.96 } : {}}
      animate={
        animated
          ? {
              y: [0, -6, 0],
              rotate: [0, 1, -1, 0],
            }
          : {}
      }
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg
        viewBox="0 0 300 320"
        className="w-full h-full drop-shadow-xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Drop shadow / ground glow */}
        <ellipse cx="150" cy="305" rx="75" ry="12" fill="#523D5B" fillOpacity="0.25" />

        {/* 1. BACK ACCESORY: HERO CAPE (Behind body) */}
        {outfit === 'hero_cape' && (
          <g id="navi-layer-hero-cape-back">
            <path
              d="M75 160 C40 185, 30 270, 52 300 C78 280, 80 220, 80 180 Z"
              fill="#DC2626"
            />
            <path
              d="M225 160 C260 185, 270 270, 248 300 C222 280, 220 220, 220 180 Z"
              fill="#DC2626"
            />
            {/* Cape inner folds */}
            <path
              d="M60 210 C50 250, 48 290, 60 295 C68 285, 75 240, 75 210 Z"
              fill="#B91C1C"
            />
            <path
              d="M240 210 C250 250, 252 290, 240 295 C232 285, 225 240, 225 210 Z"
              fill="#B91C1C"
            />
          </g>
        )}

        {/* Backpack visible behind body */}
        <path
          d="M85 130 C70 110, 50 140, 55 200 C60 230, 80 240, 100 240 Z"
          fill="#421D46"
        />
        <path
          d="M80 145 C68 135, 55 160, 60 210 C65 230, 78 235, 95 235 Z"
          fill={palette.wing1}
        />

        {/* Back feather tufts / ears */}
        <path
          d="M75 80 C60 45, 95 40, 115 65 Z"
          fill={palette.tufts}
        />
        <path
          d="M225 80 C240 45, 205 40, 185 65 Z"
          fill={palette.tufts}
        />

        {/* Main Body (Dynamic Palette Color) */}
        <path
          d="M150 50 C95 50, 70 95, 75 180 C80 250, 105 290, 150 290 C195 290, 220 250, 225 180 C230 95, 205 50, 150 50 Z"
          fill={palette.body}
        />

        {/* Tail feathers */}
        <path
          d="M130 280 L115 305 L135 290 L150 308 L165 290 L185 305 L170 280 Z"
          fill={palette.tailFeet}
        />

        {/* Cute Feet / Claws */}
        <path
          d="M120 285 C115 295, 105 298, 100 300 C110 302, 120 300, 130 292 Z"
          fill={palette.tailFeet}
        />
        <path
          d="M180 285 C185 295, 195 298, 200 300 C190 302, 180 300, 170 292 Z"
          fill={palette.tailFeet}
        />

        {/* Left Wing */}
        <motion.path
          d="M78 140 C55 160, 48 210, 75 245 C95 230, 92 180, 78 140 Z"
          fill={palette.wing1}
          animate={isTalking ? { rotate: [0, -6, 0] } : {}}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        <path
          d="M75 160 C60 175, 56 210, 76 235 C88 220, 85 185, 75 160 Z"
          fill={palette.wing2}
        />

        {/* Right Wing */}
        <motion.path
          d="M222 140 C245 160, 252 210, 225 245 C205 230, 208 180, 222 140 Z"
          fill={palette.wing1}
          animate={isTalking ? { rotate: [0, 6, 0] } : {}}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        <path
          d="M225 160 C240 175, 244 210, 224 235 C212 220, 215 185, 225 160 Z"
          fill={palette.wing2}
        />

        {/* Owl Face Heart-Mask */}
        <path
          d="M150 145 C130 90, 80 85, 95 140 C105 175, 130 185, 150 185 C170 185, 195 175, 205 140 C220 85, 170 90, 150 145 Z"
          fill={palette.face}
        />

        {/* Eyes White Base */}
        <ellipse cx="115" cy="125" rx="28" ry="32" fill="#FFFFFF" />
        <ellipse cx="185" cy="125" rx="28" ry="32" fill="#FFFFFF" />

        {/* Eyes Irises (Teal / Turquoise) */}
        <ellipse cx="120" cy="125" rx="20" ry="24" fill="#0E8A94" />
        <ellipse cx="180" cy="125" rx="20" ry="24" fill="#0E8A94" />

        {/* Pupil Deep Dark */}
        <ellipse cx="123" cy="125" rx="14" ry="17" fill="#063E44" />
        <ellipse cx="177" cy="125" rx="14" ry="17" fill="#063E44" />

        {/* Cute Sparkles / Highlights in Eyes */}
        <circle cx="118" cy="116" r="7" fill="#FFFFFF" />
        <circle cx="128" cy="132" r="3" fill="#FFFFFF" />
        <circle cx="174" cy="116" r="7" fill="#FFFFFF" />
        <circle cx="184" cy="132" r="3" fill="#FFFFFF" />

        {/* Eyelashes / Eye accents */}
        <path
          d="M95 108 C102 100, 118 98, 132 104"
          stroke="#421D46"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M205 108 C198 100, 182 98, 168 104"
          stroke="#421D46"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path d="M92 114 L85 106" stroke="#421D46" strokeWidth="3" strokeLinecap="round" />
        <path d="M208 114 L215 106" stroke="#421D46" strokeWidth="3" strokeLinecap="round" />

        {/* Cute Yellow Beak */}
        <motion.path
          d="M142 138 C145 130, 155 130, 158 138 C160 152, 150 162, 150 162 C150 162, 140 152, 142 138 Z"
          fill="#F59E0B"
          animate={isTalking ? { scaleY: [1, 1.25, 1] } : {}}
          transition={{ duration: 0.4, repeat: Infinity }}
        />
        <path
          d="M146 142 C148 136, 152 136, 154 142 C155 148, 150 152, 150 152 C150 152, 145 148, 146 142 Z"
          fill="#FDE68A"
        />

        {/* Cute Cheeks (Blush) */}
        <ellipse cx="94" cy="148" rx="10" ry="6" fill="#F472B6" fillOpacity="0.45" />
        <ellipse cx="206" cy="148" rx="10" ry="6" fill="#F472B6" fillOpacity="0.45" />

        {/* Chest Light Area */}
        <path
          d="M115 190 C125 180, 175 180, 185 190 C195 230, 180 270, 150 275 C120 270, 105 230, 115 190 Z"
          fill={palette.chest}
        />

        {/* 2. BODY OUTFIT: PONCHO ANDINO */}
        {outfit === 'poncho' && (
          <g id="navi-layer-poncho">
            <path
              d="M100 185 L150 265 L200 185 C185 178, 115 178, 100 185 Z"
              fill="#B91C1C"
              stroke="#991B1B"
              strokeWidth="2.5"
            />
            {/* Geometric stripes */}
            <path
              d="M112 198 L150 248 L188 198"
              stroke="#FDE68A"
              strokeWidth="5"
              fill="none"
              strokeDasharray="6,4"
            />
            <path
              d="M120 214 L150 256 L180 214"
              stroke="#0D9488"
              strokeWidth="3.5"
              fill="none"
            />
            {/* Little fringe tassels */}
            <line x1="135" y1="250" x2="135" y2="260" stroke="#FDE68A" strokeWidth="2" />
            <line x1="145" y1="260" x2="145" y2="272" stroke="#FDE68A" strokeWidth="2.5" />
            <line x1="150" y1="265" x2="150" y2="276" stroke="#FDE68A" strokeWidth="3" />
            <line x1="155" y1="260" x2="155" y2="272" stroke="#FDE68A" strokeWidth="2.5" />
            <line x1="165" y1="250" x2="165" y2="260" stroke="#FDE68A" strokeWidth="2" />
          </g>
        )}

        {/* 3. BODY OUTFIT: SCARF / CHALINA */}
        {outfit === 'scarf' && (
          <g id="navi-layer-scarf">
            {/* Neck wrap */}
            <path
              d="M102 176 C124 168, 176 168, 198 176 C202 188, 98 188, 102 176 Z"
              fill="#523D5B"
              stroke="#421D46"
              strokeWidth="2.5"
            />
            <path
              d="M110 178 Q150 174 190 178"
              stroke="#E8DEF0"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4,3"
            />
            {/* Hanging scarf tail */}
            <path
              d="M152 182 L146 250 L172 246 L168 182 Z"
              fill="#523D5B"
              stroke="#421D46"
              strokeWidth="2"
            />
            <line x1="148" y1="230" x2="170" y2="227" stroke="#E8DEF0" strokeWidth="2.5" />
            <line x1="147" y1="240" x2="171" y2="237" stroke="#E8DEF0" strokeWidth="2.5" />
            {/* Fringes */}
            <line x1="149" y1="250" x2="149" y2="260" stroke="#E8DEF0" strokeWidth="2" />
            <line x1="156" y1="249" x2="156" y2="259" stroke="#E8DEF0" strokeWidth="2" />
            <line x1="163" y1="248" x2="163" y2="258" stroke="#E8DEF0" strokeWidth="2" />
            <line x1="170" y1="247" x2="170" y2="257" stroke="#E8DEF0" strokeWidth="2" />
          </g>
        )}

        {/* 4. BODY OUTFIT: BOWTIE */}
        {outfit === 'bowtie' && (
          <g id="navi-layer-bowtie">
            <polygon points="132,176 132,192 147,184" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
            <polygon points="168,176 168,192 153,184" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
            <circle cx="150" cy="184" r="4.5" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
          </g>
        )}

        {/* 5. BODY OUTFIT: HERO CAPE CLASP */}
        {outfit === 'hero_cape' && (
          <g id="navi-layer-cape-clasp">
            <circle cx="150" cy="180" r="7.5" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
            <polygon points="150,175 152,179 156,180 153,183 154,187 150,185 146,187 147,183 144,180 148,179" fill="#FFFBEB" />
          </g>
        )}

        {/* Speech Bubble Emblem on Chest (Shown when no poncho covers it) */}
        {showBadge && outfit !== 'poncho' && (
          <g>
            <motion.path
              d="M135 205 C130 205, 120 212, 120 226 C120 238, 130 246, 144 246 C148 246, 152 245, 156 243 L168 248 L164 238 C172 232, 176 226, 176 220 C176 208, 164 205, 148 205 Z"
              fill="#FFFFFF"
              stroke="#523D5B"
              strokeWidth="2.5"
              animate={
                isTalking || isThinking
                  ? {
                      scale: [1, 1.08, 1],
                    }
                  : {}
              }
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            {/* 3 Chat Dots inside the bubble */}
            <circle cx="138" cy="222" r="3.2" fill="#421D46" />
            <circle cx="148" cy="222" r="3.2" fill="#523D5B" />
            <circle cx="158" cy="222" r="3.2" fill="#8E65A0" />
          </g>
        )}

        {/* 6. EYE ACCESORY: READING GLASSES */}
        {glasses === 'reading_glasses' && (
          <g id="navi-layer-reading-glasses">
            <circle cx="116" cy="125" r="23" stroke="#D97706" strokeWidth="4" fill="rgba(255,255,255,0.18)" />
            <circle cx="184" cy="125" r="23" stroke="#D97706" strokeWidth="4" fill="rgba(255,255,255,0.18)" />
            {/* Bridge */}
            <path d="M139 125 C145 120, 155 120, 161 125" stroke="#D97706" strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* Lens Glare */}
            <line x1="106" y1="113" x2="114" y2="121" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.8" />
            <line x1="174" y1="113" x2="182" y2="121" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.8" />
          </g>
        )}

        {/* 7. EYE ACCESORY: SUNGLASSES */}
        {glasses === 'sunglasses' && (
          <g id="navi-layer-sunglasses">
            {/* Left Lens */}
            <path
              d="M93 112 C93 112, 118 108, 140 112 L138 138 C138 147, 98 147, 94 138 Z"
              fill="#18181B"
              stroke="#27272A"
              strokeWidth="2"
            />
            {/* Right Lens */}
            <path
              d="M160 112 C160 112, 182 108, 207 112 L206 138 C206 147, 162 147, 161 138 Z"
              fill="#18181B"
              stroke="#27272A"
              strokeWidth="2"
            />
            {/* Bridge */}
            <line x1="140" y1="114" x2="160" y2="114" stroke="#18181B" strokeWidth="4.5" strokeLinecap="round" />
            {/* Cool Sunglasses Glare lines */}
            <line x1="102" y1="116" x2="114" y2="138" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.5" />
            <line x1="168" y1="116" x2="180" y2="138" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.5" />
          </g>
        )}

        {/* 8. HAT: GRADUATION CAP (Birrete de 5.° Sec) */}
        {hat === 'graduation_cap' && (
          <g id="navi-layer-grad-cap">
            {/* Skull Cap base */}
            <path d="M108 55 C108 55, 105 85, 150 85 C195 85, 192 55, 192 55" fill="#27272A" />
            {/* Diamond Board */}
            <polygon points="150,20 228,48 150,75 72,48" fill="#18181B" stroke="#3F3F46" strokeWidth="2.5" />
            {/* Center Gold Button */}
            <circle cx="150" cy="48" r="4.5" fill="#F59E0B" />
            {/* Gold Tassel */}
            <path d="M150 48 Q188 44 204 70" stroke="#F59E0B" strokeWidth="3" fill="none" />
            <path d="M201 70 L208 95 L197 95 Z" fill="#F59E0B" />
          </g>
        )}

        {/* 9. HAT: CHULLO ANDINO */}
        {hat === 'chullo' && (
          <g id="navi-layer-chullo">
            {/* Main knitted dome */}
            <path
              d="M78 88 C74 30, 110 20, 150 20 C190 20, 226 30, 222 88 Z"
              fill="#DC2626"
              stroke="#B91C1C"
              strokeWidth="2"
            />
            {/* Left Earflap */}
            <polygon points="76,82 96,88 86,126 70,120" fill="#EA580C" stroke="#C2410C" strokeWidth="1.5" />
            {/* Right Earflap */}
            <polygon points="224,82 204,88 214,126 230,120" fill="#EA580C" stroke="#C2410C" strokeWidth="1.5" />
            {/* Andean Geometric Patterns */}
            <path d="M80 62 Q150 67 220 62" stroke="#FBBF24" strokeWidth="5.5" fill="none" strokeDasharray="6,4" />
            <path d="M82 74 Q150 79 218 74" stroke="#06B6D4" strokeWidth="4" fill="none" />
            {/* Top Pompom */}
            <circle cx="150" cy="16" r="13" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
            {/* Hanging Earflap Braids */}
            <path d="M78 123 Q74 140 76 150" stroke="#FBBF24" strokeWidth="2.5" fill="none" />
            <circle cx="76" cy="151" r="4" fill="#FFFFFF" />
            <path d="M222 123 Q226 140 224 150" stroke="#FBBF24" strokeWidth="2.5" fill="none" />
            <circle cx="224" cy="151" r="4" fill="#FFFFFF" />
          </g>
        )}

        {/* 10. HAT: FLOWER CROWN */}
        {hat === 'flower_crown' && (
          <g id="navi-layer-flower-crown">
            {/* Green vine */}
            <path d="M82 80 C110 68, 190 68, 218 80" stroke="#16A34A" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            {/* Flowers */}
            {/* Flower 1 (left) */}
            <circle cx="100" cy="74" r="7" fill="#F43F5E" />
            <circle cx="100" cy="74" r="3" fill="#FEF08A" />
            {/* Flower 2 (center-left) */}
            <circle cx="125" cy="70" r="8" fill="#F59E0B" />
            <circle cx="125" cy="70" r="3.5" fill="#78350F" />
            {/* Flower 3 (center) */}
            <circle cx="150" cy="68" r="9" fill="#EC4899" />
            <circle cx="150" cy="68" r="4" fill="#FEF08A" />
            {/* Flower 4 (center-right) */}
            <circle cx="175" cy="70" r="8" fill="#3B82F6" />
            <circle cx="175" cy="70" r="3.5" fill="#FEF08A" />
            {/* Flower 5 (right) */}
            <circle cx="200" cy="74" r="7" fill="#8B5CF6" />
            <circle cx="200" cy="74" r="3" fill="#FEF08A" />
          </g>
        )}

        {/* 11. HAT: ROYAL PREVENTIVE CROWN */}
        {hat === 'crown' && (
          <g id="navi-layer-crown">
            <polygon
              points="105,74 100,38 125,55 150,28 175,55 200,38 195,74"
              fill="#FBBF24"
              stroke="#D97706"
              strokeWidth="2.5"
            />
            <rect x="104" y="68" width="92" height="7" rx="2" fill="#D97706" />
            {/* Jewels */}
            <circle cx="150" cy="46" r="4.5" fill="#EF4444" stroke="#991B1B" strokeWidth="1" />
            <circle cx="125" cy="58" r="3.5" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1" />
            <circle cx="175" cy="58" r="3.5" fill="#10B981" stroke="#047857" strokeWidth="1" />
          </g>
        )}
      </svg>

      {/* Floating thought or speech indicator when talking */}
      {isThinking && (
        <motion.div
          className="absolute -top-3 -right-2 bg-[#421D46] text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg border border-purple-400"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          Pensando... 🦉
        </motion.div>
      )}
    </motion.div>
  );
};
