## Writing a React unit test using `ReactDOM`:

```js
test('...', () => {
  const container = document.createElement('div')
  ReactDOM.render(<ComponentToBeTest />, container)
  expect(container.textContent).toMatch('<expected text content>')
})
```

## Test Configuration

### Install plugins

```
npm install --save-dev jest identity-obj-proxy babel-plugin-dynamic-import-node
```

### Setup Scripts

#### package.json

```json
{
  ...
  "scripts": {
    "test": "jest --coverage",
    "test:watch": "jest --watch",
  }
  ...
}
```

### Transpile `import`s in test mode

#### babelrc.js

```js
const isTest = String(process.env.NODE_ENV) === 'test'
module.exports = {
  presets: [['env', {modules: isTest ? 'commonjs' : false}], 'react'],
  plugins: [
    'syntax-dynamic-import',
    'transform-class-properties',
    'transform-object-rest-spread',
    isTest ? 'dynamic-import-node' : null,
  ].filter(Boolean),
}
```

#### package.json

```js
...
"babel": {
  "presets": "./.babelrc.js"
}
...
```

### Replace CSS imports with style mock

#### test/style-mock.js

```js
module.exports = {}
```

#### jest.config.js

```js
module.exports = {
  displayName: 'calculator',
  testEnvironment: 'jsdom',
  setupTestFrameworkScriptFile: require.resolve(
    './test/setup-test-framework.js',
  ),
  moduleNameMapper: {
    // module must come first
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock.js'),
    // can also map files that are loaded by webpack with the file-loader
  },
  // normally you'd put this here
  // collectCoverageFrom: ['**/src/**/*.js'],
}

// however, that kinda messes up my setup in this workshop repo
// so I'm doing this weird thing. Basically ignore this and just
// do it inline like I show above :)
if (process.cwd() === __dirname) {
  Object.assign(module.exports, {
    collectCoverageFrom: ['**/src/**/*.js'],
    coverageThreshold: {
      global: {
        statements: 17,
        branches: 8,
        functions: 20,
        lines: 17,
      },
    },
  })
}
```
