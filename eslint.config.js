import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default defineConfig([
  {
    // Apply these ESLint rules to all JavaScript and JSX files
    files: ["**/*.{js,mjs,cjs,jsx}"],

    languageOptions: {
      // Define global browser-specific variables (e.g., window, document)
      globals: globals.browser,

      parserOptions: {
        // Use the latest ECMAScript version
        ecmaVersion: "latest",
        sourceType: "module", // Enable ES module support
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
      },
    },

    plugins: ["react"], // Include the React plugin for additional rules

    extends: [
      "eslint:recommended", // Use the default recommended ESLint rules
      "plugin:react/recommended", // Enforce best practices for React development
      "plugin:react/jsx-runtime", // Allow JSX without explicitly importing React (React 17+)
    ],

    rules: {
      "react/prop-types": "warn", // Warn when PropTypes are missing in components
      "react/react-in-jsx-scope": "off", // React import is not required in JSX files (React 17+)
    },
  },
]);
