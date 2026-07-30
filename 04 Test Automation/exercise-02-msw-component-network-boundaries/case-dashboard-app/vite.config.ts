import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["./src/test/setup.ts"],
    environmentOptions: {
      jsdom: {
        url: "http://localhost:3000",
      },
    },
  },
  server: {
    port: 5173,
  },
});
