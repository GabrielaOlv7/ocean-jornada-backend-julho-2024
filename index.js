const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/oi', function (req, res) {
  res.send('olá mundo!')
})

//lista de personagens
const lista = ['Rick Sanchez','Morty Smith','Summer Smith']

//Read all - [GET] /item
app.get('/item', function (req,res) {
  //pegamos a lista e enviamos como resposta http 
  res.send(lista)
})

//Sinalizar para o express que vamos usar json no body
app.use(express.json())

//Create -[POST] /item
app.post('/item', function (req,res) {
  console.log(req.body)
  res.send('Create')
})

app.listen(3000)

