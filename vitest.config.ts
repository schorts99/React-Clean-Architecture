import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],

  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: [
      "modules/**/*.{test,spec}.{ts,tsx}",
      "app/**/*.{test,spec}.{ts,tsx}",
      "di/**/*.{test,spec}.{ts,tsx}",
    ],
    exclude: [
      "node_modules",
      "dist",
      ".git",
      "coverage",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: [
        "modules/**/*.{ts,tsx}",
        "app/**/*.{ts,tsx}",
      ],
      exclude: [
        "**/*.{test,spec}.{ts,tsx}",
        "**/index.ts",
        "**/*.d.ts",
        "**/types.ts",
      ],
    },
    testTimeout: 10_000,
    clearMocks: true,
    restoreMocks: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
