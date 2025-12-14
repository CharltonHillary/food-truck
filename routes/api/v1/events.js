const router  = require('express').Router()
const { getCollection, ObjectId } = require('../../../dbconnect')

//route return all events
router.get('/', async (request, response) => {

const collection = await getCollection('FoodTruckAPI', 'Events')
const found = await collection.find({}).toArray()
response.send(found)
})

//route add new event to database
router.post('/', async (request, response) => {
const {number, name, location, date, time } = request.body
const collection = await getCollection('FoodTruckAPI', 'Events')
const { acknowledged, insertedId } = await collection.insertOne({ number, name, location, date, time })
    response.send({ acknowledged, insertedId })
})

//route to return event by id
router.get('/:id', async (request, response) => {
    const { id } = request.params
    const collection = await getCollection('FoodTruckAPI', 'Events')
    const found = await collection.findOne({"number": parseInt(id)})
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find an event with this id: ${id}` }})
})


module.exports = router