// File: eslint.config.js

import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
    {
        // Global ignores
        ignores: [
            "node_modules/",
            "public/build/",
            "vendor/",
            "bootstrap/cache/",
            "storage/framework/views/",
            "*.blade.php",
            "vite.config.js.timestamp",
        ],
    },
    {
        // Configurations for all JS/TS files
        files: ["resources/js/**/*.{js,mjs,cjs,ts,jsx,tsx}"],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {},
        rules: {
            // Your global rules
        },
    },
    // Apply TypeScript recommended rules
    ...tseslint.configs.recommended,
    // Apply React recommended rules
    {
        ...pluginReactConfig,
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            ...pluginReactConfig.rules,
            "react/react-in-jsx-scope": "off", // Not needed with modern React/Vite
            "react/prop-types": "off", // We use TypeScript for prop types
        },
    },
    // Apply Prettier configuration to disable conflicting rules
    prettierConfig,
);
