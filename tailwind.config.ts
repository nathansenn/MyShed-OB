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
        myshed: {
          primary: "#009FB7",    // Teal
          secondary: "#194264",  // Dark Blue
          accent: "#E52844",     // Red
        },
      },
    },
  },
  plugins: [],
};
export default config;
