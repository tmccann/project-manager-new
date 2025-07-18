import { defineConfig as defineVitestConfig } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";

export default defineVitestConfig({
  plugins: [tailwindcss()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
    include: ["src/**/*.{test,spec}.{js,ts,jsx,tsx}"],
    typecheck: {
      tsconfig: "./tsconfig.app.json",
    },
  },
});
