import React from 'react'
import ReactDOM from 'react-dom'
import Login from '../login'

// Basic unit test
test('calls onSubmit with the username and password when submitted', () => {
  // Arrange
  // create a fake object to hold the form field values (username and password)
  // create a jest.fn() for your submit handler
  // render the Login component to a div
  // TIP: const div = document.createElement('div')
  //
  // get the field nodes
  // TIP: const inputs = div.querySelectorAll('input')
  // TIP: const form = div.querySelector('form')
  // fill in the field values
  const fakeUser = {username: 'lit', password: 'lit'}
  const handleSubmit = jest.fn()
  const container = document.createElement('div')
  ReactDOM.render(<Login onSubmit={handleSubmit} />, container)
  const form = container.querySelector('form')
  const {username, password} = form.elements
  username.value = fakeUser.username
  password.value = fakeUser.password
  const submitButtonNode = container.querySelector('button')
  const submitEvent = new window.Event('submit')

  //
  // Act
  // submit the form:
  // TIP: formNode.dispatchEvent(new window.Event('submit'))
  form.dispatchEvent(submitEvent)

  //
  // Assert
  // ensure your submit handler was called properly
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith(fakeUser)
  expect(submitButtonNode.type).toBe('submit')
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=login.step-1&em=pinakin.nmistry@gmail.com
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
