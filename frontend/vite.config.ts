import { defineConfig } from "vite"; 
import react from "@vitejs/plugin-react"; 
import tailwindcss from "tailwindcss";
import { configDefaults } from 'vitest/config.js'

export default defineConfig({   
    plugins: [react()],   
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },   
    }, 
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
        exclude: [...configDefaults.exclude, 'e2e/**'],
      }
});
