import js from "@eslint/js"
import globals from "globals"
import prettierConfig from "eslint-config-prettier"
import tseslint from "typescript-eslint"
import { defineConfig } from "eslint/config"
import simpleImportSort from "eslint-plugin-simple-import-sort"

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: { globals: globals.browser },
  },
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  tseslint.configs.recommended,
  prettierConfig,
])
