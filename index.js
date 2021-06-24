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
    const adminPanelCollection = client.db("mobileService").collection("adminPanel");
    const reviewCollection = client.db("mobileService").collection("review");
    const bookedCollection = client.db("mobileService").collection("booked");
    // perform actions on the collection object
    app.post('/addBookedAbc', (req, res) => {
        const booked = req.body;
        console.log(booked);
        bookedCollection.insertOne(booked)
            .then(result => {
                console.log(result)
                res.send(result.insertedCount > 0);
            })
    })
    // app.get('/getBooked', (req, res) => {
    //     bookedCollection.find()
    //         .toArray((err, review) => {
    //             res.send(review)
    //             // console.log('from database', review);
    //         })
    // })


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


    app.post('/addReview', (req, res) => {
        const review = req.body;
        // console.log(review);
        reviewCollection.insertOne(review)
            .then(result => {
                console.log(result)
                res.send(result.insertedCount > 0);
            })
    })
    app.get('/getReview', (req, res) => {
        reviewCollection.find()
            .toArray((err, review) => {
                res.send(review)
                // console.log('from database', review);
            })
    })









    app.post('/addAdminPanel', (req, res) => {
        const adminPanel = req.body;
        console.log(adminPanel);
        adminPanelCollection.insertOne(adminPanel)
            .then(result => {
                console.log(result)
                res.send(result.insertedCount > 0);
            })
    })
    app.get('/getAdminPanel', (req, res) => {
        adminPanelCollection.find()
            .toArray((err, review) => {
                res.send(review)
                // console.log('from database', review);
            })
    })



});





app.listen(process.env.PORT || port)
