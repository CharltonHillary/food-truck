
const router = require('express').Router() // create a router object from express.
const path = require('path')//require path module
const root = path.join(__dirname, '..','..','public')//path to public folder

router.get('/', (_, response) => response.sendFile('events.html', { root }))//send html file to browser. 

//export module
module.exports = router

