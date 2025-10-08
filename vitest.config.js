/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.jsx"],
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/test/",
        "**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
        "**/*{.,-}test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
        "**/*{.,-}spec.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
        "**/coverage/**",
        "**/dist/**",
        "**/.{eslint,mocha,prettier}rc.{js,cjs,yml}",
        "vite.config.js",
        "vitest.config.js",
        "tailwind.config.js",
        "postcss.config.js",
        "eslint.config.js",
      ],
      include: ["src/**/*.{js,jsx}"],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
});
