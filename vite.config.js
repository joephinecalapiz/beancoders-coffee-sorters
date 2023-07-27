import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    host: true, // This should be true or omitted to bind to all available network interfaces.
  },
  plugins: [react()],
});
