const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.40hja.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express()

app.use(bodyParser.json());
app.use(cors());

const port = 5000;

app.get('/', (req, res) => {
    res.send("hello from db it's working working")
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const servicesCollection = client.db("mobileService").collection("services");
    // perform actions on the collection object
    app.post('/addServices', (req, res) => {
        const services = req.body;
        console.log(services);
        servicesCollection.insertOne(services)
            .then(result => {
                console.log(result)
                res.send(result.insertedCount > 0);
            })
    })


    app.get('/getServices', (req, res) => {
        servicesCollection.find()
            .toArray((err, review) => {
                res.send(review)
                // console.log('from database', review);
            })
    })
});





app.listen(process.env.PORT || port)
