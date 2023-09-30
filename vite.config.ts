import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import dts from "vite-plugin-dts"

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "vue-promise-modals",
      formats: ["es", "cjs"],
      fileName: (format) => `vue-promise-modals.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      outDir: ["dist"],
      
    })
  ]
})