const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const serviceName = client.db('docMike').collection('services');
        const reviewName = client.db('docMike').collection('reviews')

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

        app.get('/servicesAll/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const user = await serviceName.findOne(query);
            res.send(user)
        })

        // /review
        app.post('/reviews', async (req, res) => {
            const review = req.body;
            const sendReview = await reviewName.insertOne(review);
            res.send(sendReview)
        })

        app.get('/reviews', async (req, res) => {
            let query = {};
            if (req.query.service) {
                query = {
                    service: req.query.service
                }
            }
            const cursor = reviewName.find(query);
            const getReview = await cursor.toArray();
            res.send(getReview)
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