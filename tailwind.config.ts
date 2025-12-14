import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'av-navy': '#0a1628',
        'av-blue': '#1a2f4f',
        'av-purple': '#8b5cf6',
        'av-pink': '#ec4899',
        'av-red': '#ef4444',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'av-gradient': 'linear-gradient(135deg, #1a2f4f 0%, #0a1628 100%)',
        'av-gradient-purple-pink': 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
        'av-gradient-multi': 'linear-gradient(to right, #8b5cf6, #ec4899, #ef4444)',
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.5)',
        'glow-purple-lg': '0 0 30px rgba(139, 92, 246, 0.6)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.5)',
        'glow-pink-lg': '0 0 30px rgba(236, 72, 153, 0.6)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      lineHeight: {
        'relaxed-plus': '1.75',
        'loose-plus': '2.25',
      },
    },
  },
  plugins: [],
};
export default config;
