import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		`~/components/**/*.{vue,js,ts}`,
		`~/layouts/**/*.vue`,
		`~/pages/**/*.vue`,
		`~/composables/**/*.{js,ts}`,
		`~/app.vue`,
	],

	theme: {
		fontFamily: {
			Outfit: ["Outfit", "sans-serif"],
		},
		screens: {
			mobile: { max: "768px" },
			tablet: { min: "768px" },
			justTablet: {min: "768px", max: "992px"},
			notDesktop: {max: '992px'},
			desktop: { min: "992px" },
		},
		extend: {
			colors: {
				primary: "#161D2F",
				secondary: "#10141E",
				myred: "#FC4747",
				grey: "#5A698F",
			},
		},
	},
	plugins: [],
};
