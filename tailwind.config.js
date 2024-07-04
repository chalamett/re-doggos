/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      "open-sans": "Open Sans",
      graduate: "Graduate",
      caveat: "Caveat",
      ibm: "IBM Plex Mono",
      roboto: "Roboto",
    },
    extend: {
      colors: {
        "pale-white": "#F8F8F8",
        "pale-black": "#1A1A1A",
        "dark-green": "#8DA242",
        "light-green": "#A7BC5B",
        "dirty-green": "#6F7757",
        "dark-dirty-green": "#5a6147",
        "salad-green": "#8fd14f",
        "greenish-white": "#F2F0F0",
        "greenish-yellow": "#DCDFD4",
        "grayish-yellow": "#c0c2bb",
        "grayish-yellow-hover": "rgba(192, 194, 187, 0.5)",
        "concrete-gray": "#d2d1d3",
        "dimmed-blue": "#d4d8c7",
        "dimmed-green": "#eaefd2",
        "dimmed-gray": "#191C22",
        "dimmed-black": "#0D1117",
        navy: "#0F2557",
        "light-navy": "#28559A",
        "dirty-navy": "#18233a",
      },
    },
  },
  plugins: [],
};
