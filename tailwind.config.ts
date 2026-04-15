import type { Config } from "tailwindcss";
const config: Config = ({
	darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
    	extend: {
    		backgroundColor: {
    			bg: '#e9f4d6',
				bga: 'rgb(224, 235, 238)',
				bgg: '#1db39f',
				blackOverlay:'rgba(0,0,0,0.7)',
    		},
    		boxShadow: {
    			'custom-shadow': '0px 0px 8px -2px rgba(0,0.9,0,0.66)',
				'green-shadow': '0px 0px 8px -2px rgba(29, 179, 159, 0.66)'
    		},
			backgroundImage: {
				mixag: "linear-gradient(to right, rgb(224, 235, 238) 50%, #1db39f 100%)",
				mixgo: "linear-gradient(to right, #f59e0b 0%, #fde68a 0.1%, #1db39f 20%)",
				btn: "linear-gradient(to right, #34d399, #1db39f, #0ea5a4)"
			},
    		colors: { 
				green: "#1db39f",
				blue: '#061635',
				gray: '#ececec',
    			customYellow: '#ffc029',
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
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
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
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		keyframes: {
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
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		}
    	},
    	keyframes: {
    		shimmer: {
    			'100%': {
    				transform: 'translateX(100%)'
    			}
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
});


export default config;