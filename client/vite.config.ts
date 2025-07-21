import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import fs from "fs";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "../server/certs/key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "../server/certs/cert.pem")),
    },
    port: 5173,
  },
});
