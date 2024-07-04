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
  //obtemos o nome enviado no request body
  const item = req.body.nome

  //inserimos o nome no final da lista
  lista.push(item)

//enviamos uma mensagem de sucesso 
  res.send('Item enviado com sucesso!')
})

//Read By Id - [GET] /item:id
app.get('/item/:id',function (req,res) {
  //acessamos o parametro de rota ID
  const id = req.params.id
  //acessamos o item na lista pelo item corrigido (id-1)
  const item = lista[id - 1]

  res.send(item)
})

//update - [PUT] /item:id
app.put('/item/:id', function (req,res){
  const id = req.params.id

//acesssamos o body da requisição com os dados a serem atual
const novoItem = req.body.nome

//atualizamos esse novoitem na lista usando indice
lista[id-1]=novoItem

//enviamos uma mensagem de sucesso 
  res.send('item atualizado com sucesso:' +id)
})
app.listen(3000)


