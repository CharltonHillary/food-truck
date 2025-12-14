
const router = require('express').Router()
const path = require('path')
const root = path.join(__dirname, '..','..','public')

router.get('/', (_, response) => response.sendFile('index.html', { root }))

module.exports = router

