'user strict';
var express = require('express');
var Cors = require('cors');
var bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 6001;
app.use(Cors());
app.use(bodyParser.urlencoded({ extented: true }));
app.use(bodyParser.json());
var ObjectId = require('mongodb').ObjectID;
var MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'employeeDB';

app.get('/getUsers', async function (req, result) {
    client.connect();
    const db = client.db(dbName);
    const collection = db.collection('users');
    try {
        const findResult = await collection.find({}).toArray();
        result.send(findResult);
    } catch (error) {
        result.send(error);
    }

});

app.post('/findUser', async function (req, result) {
    client.connect();
    const db = client.db(dbName);
    const collection = db.collection('users');
    let findValue = { "username": req.body.name, "password": req.body.password }
    try {
        const findResult = await collection.find(findValue).toArray();
        result.send(findResult);
    } catch (error) {
        result.send(error);
    }

});

app.post('/insertUser', async function (req, result) {
    client.connect();
    const db = client.db(dbName);
    const collection = db.collection('users');
    let insertValues = { "email": req.body.email, "username": req.body.name, "password": req.body.password, "contactno": req.body.contactno }
    try {
        const insertResult = await collection.insertMany([insertValues]);
        result.send(insertResult);
    } catch (error) {
        result.send(error);
    }

});

app.post('/updateUser', async function (req, result) {
    client.connect();
    const db = client.db(dbName);
    const collection = db.collection('users');
    let findById = { "_id": ObjectId(req.body.id) }
    let updateValues = { "email": req.body.email, "username": req.body.name, "contactno": req.body.contactno }
    try {
        const updateResult = await collection.updateOne(findById, { $set: updateValues });
        result.send(updateResult);
    } catch (error) {
        result.send(error);
    }

});

app.post('/deleteUser', async function (req, result) {
    client.connect();
    const db = client.db(dbName);
    const collection = db.collection('users');
    let findById = { "_id": ObjectId(req.body.id) }
    try {
        const deltedResult = await collection.deleteOne(findById,);
        result.send(deltedResult);
    } catch (error) {
        result.send(error);
    }

});

app.listen(port);
console.log('Sample API server started on: ' + port);