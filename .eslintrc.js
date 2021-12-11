module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 13,
		sourceType: "module",
	},
	plugins: ["@typescript-eslint"],
	rules: {
		indent: [
			"error",
			"tab",
			{
				SwitchCase: 1,
			},
		],
		"linebreak-style": ["error", "unix"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-extra-semi": "off",
		"@typescript-eslint/ban-types": "off",
	},
};
