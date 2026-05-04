import designSystem from './src/design-system.js';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Design System Colors
      colors: {
        // Keep existing shadcn/ui colors for compatibility
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          ...designSystem.colors.primary,
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // New Design System Colors
        cta: designSystem.colors.cta,
        dark: designSystem.colors.dark,
        status: designSystem.colors.status,
      },
      // Design System Typography
      fontFamily: {
        heading: designSystem.typography.fonts.heading,
        body: designSystem.typography.fonts.body,
        mono: designSystem.typography.fonts.mono,
        sans: designSystem.typography.fonts.body, // Default
      },
      fontSize: designSystem.typography.sizes,
      fontWeight: designSystem.typography.weights,
      lineHeight: designSystem.typography.leading,
      // Design System Spacing
      spacing: {
        ...designSystem.spacing,
        'safe-area-inset-bottom': 'env(safe-area-inset-bottom)',
        'mobile-nav': 'var(--mobile-nav-total)',
      },
      // Design System Border Radius
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        ...designSystem.borderRadius,
      },
      // Design System Shadows
      boxShadow: designSystem.shadows,
      // Design System Animations
      transitionDuration: designSystem.animation.duration,
      transitionTimingFunction: designSystem.animation.easing,
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'dialog-overlay-show': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'dialog-content-show': {
          from: { opacity: '0', transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s linear infinite',
        'dialog-overlay-show': 'dialog-overlay-show 150ms ease-out',
        'dialog-content-show': 'dialog-content-show 150ms ease-out',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}