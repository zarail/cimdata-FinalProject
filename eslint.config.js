import globals from 'globals';
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactCompiler from 'eslint-plugin-react-compiler';
// https://eslint.org/docs/latest/use/configure/configuration-files-new

export default [
	{
		languageOptions: {
			ecmaVersion: 'latest', // Erlaubt die neuesten JS-Features
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				/* 	Erlaube globale Werte wie window, die im Browser
				existieren, aber nicht zu JS selbst gehören.  */
				...globals.browser,
			},
		},
		files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.jsx', '**/*.cjs'],
		ignores: ['dist/**/*.js'], // Ignoriere kompiliertes JS
		rules: {
			// Empfohlene Regeln aus Plugins aktivieren
			...js.configs.recommended.rules,
			...react.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,
			...jsxA11y.configs.recommended.rules,
			/* 	Am Ende kann man selbst einzelne Regeln an- oder abschalten
			Übersicht zu den JavaScript-Regeln: https://eslint.org/docs/rules/ */
			'no-var': 'error', // "off", "warn" oder "error", alternativ 0,1 oder 2
			'prefer-const': 'error',
			'object-shorthand': 'warn',
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			'react/jsx-no-target-blank': 'off',
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			'react-compiler/react-compiler': 'error',
			'react/no-unknown-property': ['error', { ignore: ['xyz'] }],
		},
		/* Schlüsselname ist so wie der Teil nach eslint-plugin- im Modulname. */
		plugins: {
			react,
			'react-hooks': reactHooks,
			'jsx-a11y': jsxA11y,
			'react-refresh': reactRefresh,
			'react-compiler': reactCompiler,
		},
	},
];
