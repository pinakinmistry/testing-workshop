## Writing a React unit test using `ReactDOM`:

```js
test('...', () => {
  const container = document.createElement('div')
  ReactDOM.render(<ComponentToBeTest />, container)
  expect(container.textContent).toMatch('<expected text content>')
})
```
