const { Client } = require('pg')
const { format } = require('date-fns')
require('dotenv').config()

const startDate = new Date(2024, 0, 1)
const endDate = new Date()

const defaultMessages = [
  {
    user: 'Rick',
    text: 'Wubba lubba dub dub!',
    added: getRandomDate(startDate, endDate)
  },
  {
    user: 'Morty',
    text: 'Aw, jeez, Rick.',
    added: getRandomDate(startDate, endDate)
  },
  {
    user: 'Rick',
    text: 'I turned myself into a pickle, Morty!',
    added: getRandomDate(startDate, endDate)
  },
  {
    user: 'Morty',
    text: "Nobody exists on purpose, nobody belongs anywhere, everybody's gonna die. Come watch TV?",
    added: getRandomDate(startDate, endDate)
  },
  {
    user: 'Rick',
    text: "I'm sorry, but your opinion means very little to me.",
    added: getRandomDate(startDate, endDate)
  },
  {
    user: 'Morty',
    text: "That's planning for failure, Morty. Even dumber than regular planning.",
    added: getRandomDate(startDate, endDate)
  },
  {
    user: 'Rick',
    text: "You're young, you have your whole life ahead of you, and your anal cavity is still taut yet malleable.",
    added: getRandomDate(startDate, endDate)
  },
  {
    user: 'Morty',
    text: "Get your shit together. Get it all together and put it in a backpack, all your shit, so it's together.",
    added: getRandomDate(startDate, endDate)
  },
  {
    user: 'Rick',
    text: "I'm not looking for judgement, just a yes or no. Can you assimilate a giraffe?",
    added: getRandomDate(startDate, endDate)
  },
  {
    user: 'Morty',
    text: "I just want to go back to hell, where everyone thinks I'm smart and funny.",
    added: getRandomDate(startDate, endDate)
  }
]

function getRandomDate (start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}

async function populateDatabase () {
  const client = new Client({
    connectionString: process.env.CONNECTION_URL
  })

  try {
    await client.connect()

    // Create table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        "user" VARCHAR(255) NOT NULL,
        text TEXT NOT NULL,
        added TIMESTAMP NOT NULL
      )
    `)

    console.log('Table created successfully')

    // Insert default messages
    for (const message of defaultMessages) {
      const { user, text, added } = message
      const formattedDate = format(added, 'yyyy-MM-dd HH:mm:ss')

      await client.query(
        'INSERT INTO messages ("user", text, added) VALUES ($1, $2, $3)',
        [user, text, formattedDate]
      )
    }

    console.log('Database populated successfully')
  } catch (err) {
    console.error('Error populating database:', err)
  } finally {
    await client.end()
  }
}

populateDatabase()
  .then(() => console.log('Operation completed'))
  .catch((err) => console.error('Error during operation:', err))
