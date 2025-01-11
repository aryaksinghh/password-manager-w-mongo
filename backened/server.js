const express = require('express')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser')
const cors = require("cors")
require('dotenv').config()
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())

const client = new MongoClient(process.env.MONGO_URI);
const dbName = 'getpass';
client.connect();

app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const finalresult = await collection.find({}).toArray();
  res.json(finalresult)
})
app.post('/', async (req, res) => {
  const password =  req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const insertresult = await collection.insertOne(password)
  res.send({success:true, result: insertresult})
})
app.delete('/', async (req, res) => {
  const password =  req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const insertresult = await collection.deleteOne(password)
  res.send({success:true, result: insertresult})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})