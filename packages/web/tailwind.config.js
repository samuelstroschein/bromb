module.exports = {
  // mode: "jit",
  purge: {
    enabled: !process.env.ROLLUP_WATCH,
    content: ["./public/index.html", "./src/**/*.svelte"],
    options: {
      defaultExtractor: (content) => [
        ...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
        ...(content.match(/(?<=class:)[^=>\/\s]*/g) || []),
      ],
    },
    options: {
      safelist: [/data-theme$/],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        desktop: `0 12px 50px -10px rgba(0, 0, 0, 0.20)`,
        mobile: `0 12px 50px 10px rgba(0, 0, 0, 0.20)`,
      },
      // from highest to one layer down value
      zIndex: {
        top: 2147483647,
        "-top-1": 2147483646,
        "-top-2": 2147483645,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
};
