import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import { fileURLToPath } from "url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { visualizer } from "rollup-plugin-visualizer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));


export default defineConfig({
  base: "/",
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    visualizer({
      open: false,
      filename: "bundle-analysis.html",
      gzipSize: true,
      brotliSize: true,
    }),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    mainFields: ['module', 'jsnext:main', 'jsnext', 'main'],
  },
  optimizeDeps: {
    include: ['pdf-lib'],
    esbuildOptions: {
      resolveExtensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: false,
    hmr: {
      clientPort: 443,
      protocol: 'wss'
    }
  },
  preview: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: false,
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("src/tools")) {
            return "tools";
          }
        },
      },
    },
  },
});
