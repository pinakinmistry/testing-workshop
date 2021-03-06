import React from 'react'
import ReactDOM from 'react-dom'
import Editor from '../editor.todo'
import * as utilMocks from '../../utils/api'

jest.mock('../../utils/api', () => ({
  posts: {
    create: jest.fn(() => Promise.resolve()),
  },
}))

const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0))

test('calls onSubmit with editor form data when submitted', async () => {
  //Arrange
  const container = document.createElement('div')
  const fakeUser = {id: 'foobar'}
  const fakeHistory = {
    push: jest.fn(),
  }
  ReactDOM.render(<Editor user={fakeUser} history={fakeHistory} />, container)
  const form = container.querySelector('form')
  const {title, content, tags} = form.elements

  title.value = 'I like twix'
  content.value = 'Lot of text area here'
  tags.value = 'twix,   like  , lot'

  //Act
  const submit = new Event('submit')
  form.dispatchEvent(submit)

  await flushPromises()

  //Assert
  expect(fakeHistory.push).toHaveBeenCalledTimes(1)
  expect(fakeHistory.push).toHaveBeenCalledWith('/')
  expect(utilMocks.posts.create).toHaveBeenCalledTimes(1)
  expect(utilMocks.posts.create).toHaveBeenCalledWith({
    authorId: fakeUser.id,
    title: title.value,
    content: content.value,
    tags: ['twix', 'like', 'lot'],
    date: expect.any(String),
  })

  // Arrange
  // create a fake user, post, history, and api
  //
  // use ReactDOM.render() to render the editor to a div
  //
  // fill out form elements with your fake post
  //
  // Act
  // submit form
  //
  // wait for promise to settle
  //
  // Assert
  // ensure the create function was called with the right data
})

// TODO later...
test('snapshot', () => {})
