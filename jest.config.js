const { defaults } = require('jest-config');

module.exports = {
    // ...
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'js', 'jsx'],
    moduleDirectories: ['node_modules/', 'src/js'],
    setupFiles: ['./jest-setup.js'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy'
    },
    testRegex: '(__tests__)/unit/.*\\.test\\.js$',
    collectCoverageFrom: ['**/src/**/*.{js,jsx}', '!**/node_modules/**', '!**/__tests__/**'],
    globals: {
        GA_ID: 'test',
        ENVIRONMENT: 'development',
        IS_TEST_MODE: true
    }
    // ...
};
