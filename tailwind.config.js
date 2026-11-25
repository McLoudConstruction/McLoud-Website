/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1C1B19',
        paper: '#EDE7DA',
        brass: '#9B773D',
        blueprint: '#2F4858',
        // No rust/orange color. Brand rule (Stachys, Nov 2026): every accent that
        // was rust (#A8471F) is tan, so use `brass`. The `rust` token was removed
        // on purpose so it can't be reused; don't add it back.
        concrete: '#8B8578',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  plugins: [],
};
