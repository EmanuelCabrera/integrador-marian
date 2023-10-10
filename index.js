const express = require('express')
const app = express()

const userRoutes = require('./routes/userRoutes')
const { Sequelize } = require('sequelize')


app.use(express.static('public'))
app.use(express.json())

app.set('view engine', 'ejs')


app.listen(4000, async() => {
    console.log('El servidor se esta ejecutando')
})

//routes
app.get('/', (request, response) => {
  response.send('TASK APP')
})

app.use(userRoutes)
