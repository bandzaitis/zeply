/* eslint-disable */
export default {
	displayName: 'ui-money',
	preset: '../../../jest.preset.js',
	transform: {
		'^.+\\.[tj]sx?$': ['@swc/jest', { jsc: { transform: { react: { runtime: 'automatic' } } } }],
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
