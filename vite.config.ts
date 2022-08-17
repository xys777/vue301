import { fileURLToPath, URL } from "node:url";

// import { defineConfig } from "vite";
import { defineConfig } from 'vitest/config'
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      // with options
      "/api": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      },
      "/api-fmr": {
        target: "http://http.proxy.fmr.com:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),        
        configure: (proxy, options) => {
          // proxy will be an instance of 'http-proxy'
          proxy.on('proxyReq', function (proxyReq, req, res) {
            console.log('RAW  path   ', proxyReq.path);
            proxyReq.path = "http://jsonplaceholder.typicode.com"+proxyReq.path
            console.log('Real path',proxyReq.path);
          });
        }
      },
    },
  },
});
