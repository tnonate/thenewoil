const plugin = require("tailwindcss/plugin");
const colors = require('tailwindcss/colors');

const twGradient = require("./plugins/tw-gradient/index.cjs");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		gradients: {
			primary: `linear-gradient(to bottom right, ${colors.purple[400]} 0%, ${colors.indigo[600]} 100%)`,
			secondary: `linear-gradient(to bottom right, ${colors.teal[400]} 0%, ${colors.blue[600]} 100%)`,
			warning: `linear-gradient(to bottom right, ${colors.orange[400]} 0%, ${colors.red[600]} 100%)`
		},
		extend: {
			colors: {
				gradient: {
					primary: {
						start: "#bb86fc",
						center: "#8a43fe",
						end: "#5800ff"
					},
					secondary: {
						start: "#03dac6",
						center: "#02a6e3",
						end: "#0072ff",
					},
					warning: {
						start: "#ed3b13",
						center: "#f6620a",
						end: "#ff8800",
					}
				},
				primary: {
					DEFAULT: colors.zinc[100],
					contrast: colors.zinc[900],

					dark: {
						DEFAULT: colors.zinc[900],
						contrast: colors.zinc[100]
					}
				},
				secondary: {
					DEFAULT: colors.zinc[800],
					contrast: colors.zinc[100],

					dark: {
						DEFAULT: colors.zinc[800],
						contrast: colors.zinc[100]
					}
				},
				tertiary: {
					DEFAULT: colors.zinc[200],
					contrast: colors.zinc[900],

					dark: {
						DEFAULT: colors.zinc[800],
						contrast: colors.zinc[100]
					}
				},
				warning: {
					DEFAULT: colors.orange[500],
					contrast: colors.zinc[100],
				},
			},
			fontFamily: {
				roboto: ["Roboto"],
				robotomono: ["Roboto Mono"],
			},
			screens: {
				"xs": "320px"
			}
		},
	},
	plugins: [
		twGradient,
		plugin(({ addVariant }) => {
			addVariant("where", ":where(&)");
			addVariant("is", ":is(&)");
		})
	],
};
