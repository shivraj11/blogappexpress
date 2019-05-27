    const express = require('express')
const appConfig = require('./config/appConfig')
const fs = require('fs')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')


//declaring instance
const app = express()


//bootstarp models
let modelsPath = './models'
fs.readdirSync(modelsPath).forEach(function (file) {
    if (file.indexOf('.js')) {
        console.log(file)
        require(modelsPath + '/' + file)
    }
})


// bootstrap route
let routesPath = './routes'
fs.readdirSync(routesPath).forEach(function (file) {

    if (file.indexOf('.js')) {
        console.log('including the following file')
        console.log(routesPath + '/' + file)
        let route = require(routesPath + '/' + file)
        route.setRouter(app);
    }
});


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// listening the server-creating the local server
app.listen(appConfig.port, () => {

    console.log(`Example app listening on port ${appConfig.port}!`)
    // creating mongodb connection here
    let db = mongoose.connect(appConfig.db.uri, { useNewUrlParser: true });

})

//handling mongoose connection error
mongoose.connection.on('error', function (err) {

    console.log('database connection error');
    console.log(err);
});

//handling mongoose connection sucess event 

mongoose.connection.on('open', function (err) {
    if (err) {
        console.log('database error');
        console.log(err);
    } else {
        console.log('database connection open successfully');
    }
});  // end mongoose connection open handler 