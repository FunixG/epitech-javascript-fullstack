module.exports = {
    extends: [
        "airbnb",
        "airbnb/hooks",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "airbnb-typescript"
    ],
    env: {
        browser: true,
        jest: true,
    },
    rules: {
        'react/jsx-filename-extension': [
            1,
            {
                extensions: [
                '.js',
                '.jsx',
                ],
            },
        ],
    },
};
