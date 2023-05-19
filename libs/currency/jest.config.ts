/* eslint-disable */
export default {
	displayName: 'currency',
	preset: '../../jest.preset.js',
	transform: {
		'^.+\\.[tj]sx?$': ['@swc/jest', { jsc: { transform: { react: { runtime: 'automatic' } } } }],
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
