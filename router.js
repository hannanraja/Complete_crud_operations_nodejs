const { Router } = require('express');
const express = require('express')
const router = express.Router();
const Datastore = require('nedb')
var db = new Datastore({ filename: 'database.db', autoload: true });
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));


router.post('/add', async(req, res) => {
    try {
        await db.insert(req.body)
        res.status(200).json({'Message':"Record added successfully ${req.body.name}"})
    }
    catch (err) {
        res.status(500).send('an error is created ${err}')
    }


    })

router.delete('/delete/:idtodelete', async(req, res) => {
    try {
        await db.remove({ _id: req.params.idtodelete}, (err, datatodelete) => {
            if (err) {
                res.status(200).json({ message: "error in database" })
            }
            datatodelete? res.status(200).json({ message: "data delete" }) : res.status(500).json({ message: "Student with this id doesnot exists" })
            
        })
    }
    catch (err) {
        res.status(500).json({ message: "error in async function" })
    }
});

router.patch('/update/:datatoupdate', async (req, res) => {
    try {
        await db.update({_id: req.params.datatoupdate}, req.body, { upsert: false }, (err, updateddata) => {
            if (err) {
                return
                res.status(500).json({ message: "error in db"})
            }
            if (updateddata) {
                res.send("data added successfully")
            }
            else {
                res.send("data not added ")
            }
        })
    }
    catch (err) {
        res.status(500).json({message: "API is not working"})
    }
})

router.get('/read', (req, res) => {
    db.find({}, function (err, docs) {
        x = docs;
        res.status(200).json(x);
    });
})

router.get('/readone/:name', (req, res) => {
    db.find({ lastname: req.params.name }, function (err, docs) {
        x = docs;
        res.status(200).json(x);
    });
})

module.exports = router; 