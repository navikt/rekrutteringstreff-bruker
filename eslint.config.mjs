import nextConfig from 'eslint-config-next';

const eslintConfig = [
  ...nextConfig,
  {
    ignores: ['node_modules/**', '.next/**', 'playwright-report/**', 'test-results/**'],
  },
  {
    rules: {
      //TODO Temp rule
      '@typescript-eslint/no-explicit-any': 'off',
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
];

export default eslintConfig;
