const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const app = express()

const dbUrl = 'mongodb+srv://admin:o5XbJLSccSkq0iuv@cluster0.hmugwjk.mongodb.net'
const dbName = 'ocean-jornada-backend'

const client = new MongoClient(dbUrl)

async function main() {
  console.log('conectando ao banco de dados')
  await client.connect()
  console.log('banco de dados conectado com sucesso!')

  app.get('/', function (req, res) {
    res.send('Hello World')
  })

  app.get('/oi', function (req, res) {
    res.send('olá mundo!')
  })

  //lista de personagens
  const lista = ['Rick Sanchez', 'Morty Smith', 'Summer Smith']
  const db = client.db(dbName)
  const collection = db.collection('item')

  //Read all - [GET] /item
  app.get('/item', async function (req, res) {
    //obter todos os documentos da collection

   const documentos = await collection.find().toArray()

    //pegamos os documentos e enviamos como resposta http 
    res.send(documentos)
  })

  //Sinalizar para o express que vamos usar json no body
  app.use(express.json())

  //Create -[POST] /item
  app.post('/item', async function (req, res) {
    //obtemos o objeto inteiro enviado no request body
    const item = req.body

    //inserimos o item na collection
    await collection.insertOne(item)

    //exibe o item que foi adicionado 
    res.send(item)
  })

  //Read By Id - [GET] /item:id
  app.get('/item/:id', async function (req, res) {
    //acessamos o parametro de rota ID
    const id = req.params.id

    //acessamos o item na collection pelo objectid
    const item =  await collection.findOne({_id: new ObjectId(id)})

    //enviamos o item obtido como resposta
    res.send(item)
  })

  //update - [PUT] /item:id
  app.put('/item/:id', async function (req, res) {
    //acessamos o id do parametro de rota
    const id = req.params.id

    //acesssamos o novoItem no body da requisição
    const novoItem = req.body

    //atualizamos a collection com a nova informação
    await collection.updateOne(
      {_id: new ObjectId(id)},
      {$set: novoItem}
    )

    //enviamos uma mensagem de sucesso 
    res.send('item atualizado com sucesso:' + id)
  })

  //delete [DELETE] /item/id:
  app.delete('/item/:id', async function (req,res){
    //acessamos o id do parametro de rota
    const id = req.params.id

    //remove o item da collection pelo objectid
    await collection.deleteOne({_id: new ObjectId(id)})

    //enviamos uma mensagem de sucesso 
    res.send('item removido com sucesso!')
  })
  app.listen(3000)
}

main()
