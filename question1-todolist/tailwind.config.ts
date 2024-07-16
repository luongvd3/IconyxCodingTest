import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        'only-content': 'auto',
        'sidebar-content': '15rem auto',
        'sidebar-content-charts': '15rem auto 30rem',
        'lgSidebar-content-charts': '20rem auto 30rem',
        'sidebar-content-miniCharts': '15rem auto 20rem',
        'miniSidebar-content': '5rem auto',
      },
    },
  },
  plugins: [],
};
export default config;
