const pool = require('./pool')
const { format } = require('date-fns')

async function getAllMessages () {
  const { rows } = await pool.query('SELECT * FROM messages')
  return rows
}

async function addMessage (message) {
  const formattedDate = format(message.added, 'yyyy-MM-dd HH:mm:ss')
  await pool.query(
    'INSERT INTO messages ("user", text, added) VALUES ($1, $2, $3)',
    [message.user, message.text, formattedDate]
  )
}

module.exports = {
  getAllMessages,
  addMessage
}
