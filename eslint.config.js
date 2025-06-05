import js from "@eslint/js"
import globals from "globals"
import prettierConfig from "eslint-config-prettier"
import tseslint from "typescript-eslint"
import { defineConfig } from "eslint/config"
import ts from "typescript"

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
  tseslint.configs.recommended,
  prettierConfig,
])
