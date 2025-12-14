// import the express library
const express = require('express')
// create an express application
const app = express()
//port number the server will run on
const port = 3010


//serve static files from the public folder
app.use(express.static('public'))
app.use(express.json())

//api routes
app.use("/api/v1/menu", require("./routes/api/v1/menu"));
app.use("/api/v1/events", require("./routes/api/v1/events"));


const url = 'http://localhost:3010/'
const message = `Server is running on port ${port}. Visit ${url} in your browser.`
//start server
app.listen(port, () => console.log(message))