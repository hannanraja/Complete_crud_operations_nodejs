const express = require('express')
const app = new express();
const router = require('./router.js')
const port = 4300;

app.listen(port, () => {
    console.log("Port is listening at PORT: " + port)
})
app.get('/', (req, res) => {
    res.status(200).send(`
<h1> Simple crud operations in express and nedb </h1>
      <h3>  Endpoint1: </h3> <p>.src/operation/read to read all the data : Method : Get</p>
       <h3> Endpoint2: </h3> <p>.src/operation/readone/name to read data of specific name if exist: Method : Get </p>
        <h3>Endpoint3: </h3> <p>.src/operation/delete/id to delete the data of that id : Method : delete</p>
       <h3> Endpoint4: </h3> <p>.src/operation/update/id to update the data of id: Method : patch </p>
        <h3>Endpoint5: </h3> <p>.src/operation/add to add the data of new user : Method : Post</p>
<h3>Endpoint6: </h3> <p>.src/operation/deleteall to delete all the data in DB : Method : delete </p>
<h3>Endpoint7: </h3> <p>.src/operation/addAllaverage to print all the score of students : Method : get </p>

    `)
})
app.use('/operation', router)