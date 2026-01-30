import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: "class",
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
        extend: {
                colors: {
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        card: {
                                DEFAULT: 'hsl(var(--card))',
                                foreground: 'hsl(var(--card-foreground))'
                        },
                        popover: {
                                DEFAULT: 'hsl(var(--popover))',
                                foreground: 'hsl(var(--popover-foreground))'
                        },
                        primary: {
                                DEFAULT: 'hsl(var(--primary))',
                                foreground: 'hsl(var(--primary-foreground))',
                                hover: 'hsl(var(--primary-hover))',
                                active: 'hsl(var(--primary-active))'
                        },
                        secondary: {
                                DEFAULT: 'hsl(var(--secondary))',
                                foreground: 'hsl(var(--secondary-foreground))',
                                hover: 'hsl(var(--secondary-hover))'
                        },
                        muted: {
                                DEFAULT: 'hsl(var(--muted))',
                                foreground: 'hsl(var(--muted-foreground))'
                        },
                        accent: {
                                DEFAULT: 'hsl(var(--accent))',
                                foreground: 'hsl(var(--accent-foreground))',
                                hover: 'hsl(var(--accent-hover))'
                        },
                        destructive: {
                                DEFAULT: 'hsl(var(--danger))',
                                foreground: 'hsl(var(--danger-foreground))'
                        },
                        success: {
                                DEFAULT: 'hsl(var(--success))',
                                foreground: 'hsl(var(--success-foreground))'
                        },
                        warning: {
                                DEFAULT: 'hsl(var(--warning))',
                                foreground: 'hsl(var(--warning-foreground))'
                        },
                        info: {
                                DEFAULT: 'hsl(var(--info))',
                                foreground: 'hsl(var(--info-foreground))'
                        },
                        status: {
                                completed: 'hsl(var(--status-completed))',
                                'in-progress': 'hsl(var(--status-in-progress))',
                                'not-started': 'hsl(var(--status-not-started))'
                        },
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                        chart: {
                                '1': 'hsl(var(--chart-1))',
                                '2': 'hsl(var(--chart-2))',
                                '3': 'hsl(var(--chart-3))',
                                '4': 'hsl(var(--chart-4))',
                                '5': 'hsl(var(--chart-5))'
                        }
                },
                borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)',
                        xl: 'calc(var(--radius) + 4px)',
                        '2xl': 'calc(var(--radius) + 8px)'
                },
                fontSize: {
                        'xs': 'var(--font-size-xs)',
                        'sm': 'var(--font-size-sm)',
                        'base': 'var(--font-size-base)',
                        'lg': 'var(--font-size-lg)',
                        'xl': 'var(--font-size-xl)',
                        '2xl': 'var(--font-size-2xl)',
                        '3xl': 'var(--font-size-3xl)',
                        '4xl': 'var(--font-size-4xl)',
                        '5xl': 'var(--font-size-5xl)'
                },
                spacing: {
                        '1': 'var(--space-1)',
                        '2': 'var(--space-2)',
                        '3': 'var(--space-3)',
                        '4': 'var(--space-4)',
                        '5': 'var(--space-5)',
                        '6': 'var(--space-6)',
                        '8': 'var(--space-8)',
                        '10': 'var(--space-10)',
                        '12': 'var(--space-12)',
                        '16': 'var(--space-16)',
                        '20': 'var(--space-20)',
                        '24': 'var(--space-24)'
                },
                boxShadow: {
                        'glow': 'var(--shadow-glow)',
                        'glass': 'var(--glass-shadow)'
                },
                animation: {
                        'fade-in': 'fadeIn var(--duration-normal) var(--ease-out)',
                        'slide-up': 'slideUp var(--duration-normal) var(--ease-out)',
                        'scale-in': 'scaleIn var(--duration-fast) var(--ease-out)',
                        'shimmer': 'shimmer 1.5s infinite'
                },
                keyframes: {
                        fadeIn: {
                                '0%': { opacity: '0' },
                                '100%': { opacity: '1' }
                        },
                        slideUp: {
                                '0%': { opacity: '0', transform: 'translateY(20px)' },
                                '100%': { opacity: '1', transform: 'translateY(0)' }
                        },
                        scaleIn: {
                                '0%': { opacity: '0', transform: 'scale(0.95)' },
                                '100%': { opacity: '1', transform: 'scale(1)' }
                        },
                        shimmer: {
                                '0%': { backgroundPosition: '-200% 0' },
                                '100%': { backgroundPosition: '200% 0' }
                        }
                },
                transitionDuration: {
                        'fast': 'var(--duration-fast)',
                        'normal': 'var(--duration-normal)',
                        'slow': 'var(--duration-slow)'
                },
                transitionTimingFunction: {
                        'out': 'var(--ease-out)',
                        'in-out': 'var(--ease-in-out)'
                }
        }
  },
  plugins: [tailwindcssAnimate],
};
export default config;
