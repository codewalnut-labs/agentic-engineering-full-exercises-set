import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: process.env.WORKFLOW_RULES_API_URL ?? "http://127.0.0.1:8080",
        changeOrigin: true,
      },
    },
  },
});
