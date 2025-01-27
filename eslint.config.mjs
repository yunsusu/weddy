import { eslint } from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default [
  {
    root: true, // 프로젝트의 루트 설정
    parser: tsParser, // TypeScript ESLint 파서
    plugins: {
      "@typescript-eslint": ts,
      import: importPlugin,
      "simple-import-sort": simpleImportSort,
    },
    extends: [
      eslint.configs.recommended,
      ts.configs.recommended,
      importPlugin.configs.warnings,
      prettier,
    ],
    rules: {
      // simple-import-sort 규칙
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // import 관련 규칙
      "import/order": "off",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
    },
  },
];
