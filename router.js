const { Router } = require('express');
const express = require('express')
const router = express.Router();
const Datastore = require('nedb')
var db = new Datastore({ filename: 'database.db', autoload: true });
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));


router.post('/add', async (req, res) => {
    db.find({ name: req.body.name }, async function (err, docs) {
          if (docs.length >= 1) {
            res.status(202).send('data already present for name : ' + req.body.name)
        }
        else {
            await db.insert(req.body)
            res.status(200).json({message: "Data added successfully"})
        }
    })
})

router.get('/read', async (req, res) => {
    try {
        await db.find({}, function (err, docs) {
            x = docs;
            res.status(200).json(x)
        })
    }
    catch (err) {
        res.status(500).json({ message: "Error in API" })
    }
})


router.get('/readone/:name', async (req, res) => {
    try {
        await db.find({ name: req.params.name }, function (err, docs) {
            x = docs;
            res.status(200).json(x);
        });
    }
    catch (err) {
        res.status(500).json({ message: "Error connecting database" })
    }
})


router.patch('/update/:datatoupdate', async (req, res) => {
    db.find({ _id: req.params.datatoupdate }, async(err,docs) => {
        if (docs.length >= 1) {
            try {
                await db.update({ _id: req.params.datatoupdate }, req.body, { upsert: false }, (err, updateddata) => {
                    if (err) {
                        return
                        res.status(500).json({ message: "error in db" })
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
                res.status(500).json({ message: "API is not working" })
            }
        }
        else {
            res.send("Data with this ID : " + req.params.datatoupdate + " is not found in the database")
        }
    });
       
})


router.get('/averageCalulator', async(req, res) => {
    var x = 0;
    try {
       await db.find({}, function (err, docs) {
            docs.map((value) => {
                x += value.score
            })
            res.status(200).json({ "the calculated average is " :  x / docs.length })
        })
    }
    catch (err) {
        res.status(500).send("An error occured : " + err)
    }
})



router.delete('/delete/:idtodelete', async (req, res) => {
    try {
        await db.remove({ _id: req.params.idtodelete }, (err, datatodelete) => {
            if (err) {
                res.status(200).json({ message: "error in database" })
            }
            datatodelete ? res.status(200).json({ message: "data delete" }) : res.status(500).json({ message: "Student with this id doesnot exists" })

        })
    }
    catch (err) {
        res.status(500).json({ message: "error in async function" })
    }
});

router.delete('/deleteall', async (req, res) => {
    try {
        await db.remove({}, {multi:true}, (err, datatodelete) => {
            if (err) {
                res.status(200).json({ message: "error in database" })
            }
            datatodelete ? res.status(200).json({ message: "data delete" }) : res.status(500).json({ message: "No Student data present" })
        })
    }
    catch (err) {
        res.status(500).json({ message: "error in API ENdpoint" })
    }
});
module.exports = router; 