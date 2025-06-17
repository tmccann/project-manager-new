import { defineConfig as defineVitestConfig } from "vitest/config";

export default defineVitestConfig({
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
