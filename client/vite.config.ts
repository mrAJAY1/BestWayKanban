import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  resolve: {
    // Aliases allow to create shortcuts to import or require certain modules easily.
    alias: [
      // Defines an alias for "@" pointing to the "src" directory using path.resolve method.
      // "__dirname" is a global property that returns the current working directory path.
      { find: "@", replacement: path.resolve(__dirname, "src") },
    ],
  },
});
