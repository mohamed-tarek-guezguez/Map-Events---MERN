const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const { readdirSync } = require('fs')
const connectDB = require('./config/db')

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

readdirSync('./routes').map((r) => {
    app.use('/api', require(`./routes/${r}`))
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})