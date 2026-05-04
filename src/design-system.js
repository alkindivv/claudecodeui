/**
 * CloudCLI Design System
 * Based on UI/UX Pro Max recommendations for SaaS Dashboard
 * 
 * Style: Dark Mode (OLED) + Minimalism
 * Typography: Poppins (headings) + Open Sans (body)
 * Color Palette: Trust Blue + Dark OLED
 */

module.exports = {
  colors: {
    // Primary - Trust Blue (SaaS standard)
    primary: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#3B82F6',  // Secondary
      600: '#2563EB',  // Primary
      700: '#1D4ED8',
      800: '#1E40AF',
      900: '#1E3A8A',
    },
    
    // CTA - Orange (High contrast)
    cta: {
      50: '#FFF7ED',
      100: '#FFEDD5',
      200: '#FED7AA',
      300: '#FDBA74',
      400: '#FB923C',
      500: '#F97316',  // CTA
      600: '#EA580C',
      700: '#C2410C',
      800: '#9A3412',
      900: '#7C2D12',
    },
    
    // Dark Mode OLED
    dark: {
      bg: {
        primary: '#000000',    // Deep Black (OLED)
        secondary: '#0A0A0A',  // Card background
        tertiary: '#121212',   // Elevated surfaces
        hover: '#1A1A1A',      // Hover states
      },
      text: {
        primary: '#FFFFFF',    // High contrast
        secondary: '#A1A1AA',  // Muted text
        tertiary: '#71717A',   // Disabled text
      },
      border: {
        primary: '#27272A',    // Subtle borders
        secondary: '#3F3F46',  // Elevated borders
        focus: '#3B82F6',      // Focus ring
      },
    },
    
    // Status colors
    status: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
    },
  },
  
  typography: {
    fonts: {
      heading: ['Poppins', 'sans-serif'],
      body: ['Open Sans', 'sans-serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
    },
    
    // Font sizes (rem)
    sizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem',// 30px
      '4xl': '2.25rem', // 36px
    },
    
    // Line heights
    leading: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
    
    // Font weights
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  
  spacing: {
    // 8px base unit
    0: '0',
    1: '0.25rem',  // 4px
    2: '0.5rem',   // 8px
    3: '0.75rem',  // 12px
    4: '1rem',     // 16px
    5: '1.25rem',  // 20px
    6: '1.5rem',   // 24px
    8: '2rem',     // 32px
    10: '2.5rem',  // 40px
    12: '3rem',    // 48px
    16: '4rem',    // 64px
  },
  
  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    DEFAULT: '0.5rem', // 8px
    md: '0.75rem',   // 12px
    lg: '1rem',      // 16px
    xl: '1.5rem',    // 24px
    full: '9999px',
  },
  
  shadows: {
    // Minimal glow for dark mode
    sm: '0 0 10px rgba(59, 130, 246, 0.1)',
    DEFAULT: '0 0 20px rgba(59, 130, 246, 0.15)',
    lg: '0 0 30px rgba(59, 130, 246, 0.2)',
    glow: '0 0 40px rgba(59, 130, 246, 0.3)',
  },
  
  animation: {
    // Respect prefers-reduced-motion
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  
  accessibility: {
    // WCAG AAA compliant
    focusRing: {
      width: '2px',
      offset: '2px',
      color: '#3B82F6',
    },
    minTouchTarget: '44px', // iOS/Android minimum
    minContrastRatio: 7,    // AAA standard
  },
};
