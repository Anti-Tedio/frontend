import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import globals from 'globals'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores([
    '**/dist/**',
    '**/dist-ssr/**',
    '**/coverage/**',
    '**/node_modules/**',
    '**/public/mockServiceWorker.js',
    '**/src/tests/__screenshots__/**',
    '**/*.timestamp-*.mjs',
    '**/*.tsbuildinfo',
  ]),

  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,

  {
    ...pluginVitest.configs.recommended,
    files: ['src/tests/**/*.spec.ts'],
  },

  {
    files: ['src/**/*.{ts,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  {
    files: ['*.config.*', 'vite.config.*', 'vitest.config.*'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  {
    // Componentes gerados pelo shadcn/vue: nomes e props seguem o upstream.
    files: ['src/components/ui/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
    },
  },

  skipFormatting,
)
