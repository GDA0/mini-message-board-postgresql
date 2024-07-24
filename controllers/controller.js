const queries = require('../database/queries')
const { formatDistanceToNow } = require('date-fns')

function sortMessagesByDate (messages) {
  return messages.sort((a, b) => new Date(b.added) - new Date(a.added))
}

async function getAllMessages (req, res) {
  const messages = await queries.getAllMessages()
  const sortedMessages = sortMessagesByDate(messages)

  res.render('index', {
    title: 'Messages',
    messages: sortedMessages,
    formatDistanceToNow
  })
}

async function getMessage (req, res) {
  const messages = await queries.getAllMessages()
  const message = messages.find((msg) => msg.id === req.params.id)
  if (message) {
    res.render('message', {
      message,
      title: 'Message detail',
      formatDistanceToNow
    })
  } else {
    res.status(404).send('Message not found')
  }
}

async function addMessageGet (req, res) {
  res.render('form', { title: 'Add new message' })
}

async function addMessagePost (req, res) {
  const { user, text } = req.body
  const message = { user, text, added: Date.now() }
  queries.addMessage(message)
  res.redirect('/')
}

module.exports = {
  getAllMessages,
  getMessage,
  addMessageGet,
  addMessagePost
}
