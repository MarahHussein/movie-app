// https://nuxt.com/docs/api/configuration/nuxt-config
const apiBaseUrl = "https://movies-proxy.vercel.app";


export default defineNuxtConfig({
	devtools: { enabled: true },
	ssr: false,
	app: {
		head: {
			title: "Movies Recommender",
			meta: [
				{ charset: "utf-8" },
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ name: "author", content: "Marah Hussein" },
				{ name: "description", content: "Movie app with recommendation system" },
			],
		},
	},
	modules: [
        "@nuxtjs/tailwindcss",
        "@pinia/nuxt",
        "@vee-validate/nuxt",
        "@vueuse/nuxt",
        "nuxt-appwrite",
        "@nuxtjs/google-fonts",
        "@nuxt/image"
    ],
	tailwindcss: {
		cssPath: ["~/assets/css/tailwind.css", { injectPosition: "first" }],
		configPath: "~/tailwind.config.js",
		exposeConfig: true,
		editorSupport: true,
		viewer: true,
		config: {},
	},
	alias: {
		pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs",
	},
	appwrite: {
		endpoint: "https://cloud.appwrite.io/v1",
		project: "662f926a0038b392019b",
	},
	veeValidate: {
		autoImports: true,
	},
	imports: {
		dirs: [
			// Scan top-level modules
			"utils",
			// ... or scan modules nested one level deep with a specific name and file extension
			"utils/*/index.{ts,js,mjs,mts}",
			// ... or scan all modules within given directory
			"utils/**",
		],
	},
	googleFonts: {
		download: false,
		families: {
			Outfit: [100, 200, 300, 400, 500, 600, 700, 800, 900],
		},
	},
	image: {
		provider: "proxy",
		providers: {
			proxy: {
				provider: "ipx",
				options: {
					baseURL: `${apiBaseUrl}/ipx`,
				},
			},
		},
	},
	// runtimeConfig: {
	// 	public: {
	// 		apiBaseUrl,
	// 	},
	// },
});