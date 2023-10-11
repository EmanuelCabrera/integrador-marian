const express = require('express')
const app = express()

const userRoutes = require('./routes/userRoutes')
const { Sequelize } = require('sequelize')
const { sequelize } = require('./models')


app.use(express.static('public'))
app.use(express.json())

app.set('view engine', 'ejs')

sequelize.sync().then( result =>{

  app.listen(4000, async() => {
      console.log('El servidor se esta ejecutando')
  })
}).catch(error =>{
  console.log(error);
})

//routes
app.get('/', (request, response) => {
  response.send('TASK APP')
})

app.use(userRoutes)
