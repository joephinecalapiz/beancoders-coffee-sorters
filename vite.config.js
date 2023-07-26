/** @format */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/public", // Change this path according to your Laravel public directory
  build: {
    outDir: "../public", // Output directory for production build
  },
});
