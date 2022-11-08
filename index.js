const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;


//middle wares

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.eivtc4s.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const serviceName = client.db('docMike').collection('services')

        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = serviceName.find(query);
            const services = await cursor.limit(3).toArray();
            res.send(services)
        })

        app.get('/servicesAll', async (req, res) => {
            const query = {};
            const cursor = serviceName.find(query);
            const services = await cursor.toArray();
            res.send(services)
        })
    }
    finally {

    }
}
run().catch(err => console.error(err))


// -------------------------


app.get('/', (req, res) => {
    res.send('asho abar')
})

app.listen(port, () => {
    console.log(`another port: ${port}`)
})