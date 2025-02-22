import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		fontFamily: {
  			sans: [
  				'var(--font-sans)',
                    ...defaultTheme.fontFamily.sans
                ],
  			heading: [
  				'var(--font-heading)',
                    ...defaultTheme.fontFamily.sans
                ]
  		},
  		keyframes: {
  			'shine-pulse': {
  				'0%': {
  					'background-position': '0% 0%'
  				},
  				'50%': {
  					'background-position': '100% 100%'
  				},
  				to: {
  					'background-position': '0% 0%'
  				}
  			},
  			'slow-spin': {
  				'from': {
  					'transform': 'rotate(0deg)'
  				},
  				'to': {
  					'transform': 'rotate(360deg)'
  				}
  			},
  			'border-beam': {
  				'100%': {
  					'offset-distance': '100%'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'meteor': {
  				'0%': {
  					transform: 'rotate(215deg) translateX(0)',
  					opacity: '1'
  				},
  				'70%': {
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'rotate(215deg) translateX(-500px)',
  					opacity: '0'
  				}
  			},
  			'shimmer': {
  				'100%': {
  					transform: 'translateX(100%)'
  				}
  			},
  			'gradient': {
  				'0%, 100%': { 'background-position': '0% 50%' },
  				'50%': { 'background-position': '100% 50%' },
  			},
  			'gradient-xy': {
  				'0%, 100%': {
  					'background-size': '400% 400%',
  					'background-position': 'left center'
  				},
  				'50%': {
  					'background-size': '200% 200%',
  					'background-position': 'right center'
  				}
  			},
  			'pulse': {
  				'0%, 100%': {
  					opacity: '1'
  				},
  				'50%': {
  					opacity: '.5'
  				}
  			},
  			'slow-drift': {
  				'0%, 100%': {
  					'transform': 'translate(0%, 0%) scale(1)'
  				},
  				'50%': {
  					'transform': 'translate(2%, 2%) scale(1.05)'
  				}
  			},
  			'slow-drift-delay': {
  				'0%, 100%': {
  					'transform': 'translate(0%, 0%) scale(1.05)'
  				},
  				'50%': {
  					'transform': 'translate(-2%, 2%) scale(1)'
  				}
  			},
  			'slow-drift-alt': {
  				'0%, 100%': {
  					'transform': 'translate(0%, 0%) scale(1)'
  				},
  				'50%': {
  					'transform': 'translate(-1%, 1%) scale(1.02)'
  				}
  			},
  			'pulse-glow': {
  				'0%, 100%': {
  					'transform': 'rotate(0deg)',
  					'opacity': '0.1'
  				},
  				'50%': {
  					'transform': 'rotate(180deg)',
  					'opacity': '0.2'
  				}
  			},
  			'float': {
  				'0%, 100%': {
  					'transform': 'translate(0%, 0%)'
  				},
  				'33%': {
  					'transform': 'translate(2%, -2%)'
  				},
  				'66%': {
  					'transform': 'translate(-1%, 1%)'
  				}
  			},
  			'pulse-subtle': {
  				'0%, 100%': {
  					'opacity': '0.03'
  				},
  				'50%': {
  					'opacity': '0.05'
  				}
  			},
  			'sparkle-fade': {
  				'0%, 100%': {
  					opacity: '0',
  					transform: 'scale(0.4)'
  				},
  				'50%': {
  					opacity: '1',
  					transform: 'scale(1)'
  				}
  			},
  		},
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
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
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'meteor-effect': 'meteor 5s linear infinite',
  			'slow-spin': 'slow-spin 20s linear infinite',
  			'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
  			'shimmer': 'shimmer 2s linear infinite',
  			'gradient': 'gradient 3s linear infinite',
  			'gradient-xy': 'gradient-xy 15s ease infinite',
  			'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			'slow-drift': 'slow-drift 20s ease-in-out infinite',
  			'slow-drift-delay': 'slow-drift-delay 25s ease-in-out infinite',
  			'slow-drift-alt': 'slow-drift-alt 22s ease-in-out infinite',
  			'pulse-slow': 'pulse-glow 20s linear infinite',
  			'float-particles': 'float 20s ease-in-out infinite',
  			'float-delay': 'float 15s ease-in-out infinite',
  			'pulse-subtle': 'pulse-subtle 10s ease-in-out infinite',
  			'sparkle-fade': 'sparkle-fade 3s ease-in-out infinite',
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    plugin(({ addUtilities }) => {
      addUtilities({
        ".text-balance": {
          "text-wrap": "balance",
        },
        ".text-pretty": {
          "text-wrap": "pretty",
        },
        ".bg-grid": {
          "background-size": "100px 100px",
          "background-image": `
            linear-gradient(to right, rgb(var(--foreground) / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(var(--foreground) / 0.1) 1px, transparent 1px)
          `,
        },
        ".mask-radial": {
          "mask-image": "radial-gradient(circle at center, black, transparent 80%)",
        },
        ".bg-noise": {
          "background-image": "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')",
          "background-repeat": "repeat",
        },
      });
    }),
  ],
} satisfies Config;

export default config;
