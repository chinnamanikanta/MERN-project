const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongo = require('../src/db/mongoose');
const userRoute = require('./routes/user-auth-route')
const taskRoute = require('./routes/tasks-route')
const questionRoute = require('./routes/questions-route')

const port = process.env.PORT || 3000
const app = express();

app.use(bodyParser.urlencoded({ extended:false}))
app.use(bodyParser.json())

app.use(userRoute)
app.use(taskRoute)
app.use(questionRoute)


mongo.then(()=> {
    app.listen(port, () => {
        console.log("!!!!!.......... The server connnected......!!!!!")
    })

})
.catch(error => {
    console.log(error)
})