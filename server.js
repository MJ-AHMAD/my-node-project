const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const uri = 'your-mongodb-connection-string';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/collect', async (req, res) => {
try {
await client.connect();
const database = client.db('formdata');
const collection = database.collection('submissions');
const result = await collection.insertOne(req.body);
res.status(200).send(result);
} catch (error) {
res.status(500).send(error);
} finally {
await client.close();
}
});

app.listen(port, () => {
console.log(`Server is running on http://localhost:${port}`);
});