module.exports = {
    root: true,
    extends: ['plugin:vue/essential', '@vue/prettier', '@vue/typescript'],
    rules: {
        // 'prettier/prettier': 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    parserOptions: {
        parser: '@typescript-eslint/parser'
    }
}
