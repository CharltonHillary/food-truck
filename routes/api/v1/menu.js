const router  = require('express').Router()
const { getCollection, ObjectId } = require('../../../dbconnect')

//route return all menu items
router.get('/', async (request, response) => {

const collection = await getCollection('FoodTruckAPI', 'Menu')
const found = await collection.find({}).toArray()
response.send(found)
})

//route add new menu item to database
router.post('/', async (request, response) => {
const {number, name, description, price, image } = request.body
const collection = await getCollection('FoodTruckAPI', 'Menu')
const { acknowledged, insertedId } = await collection.insertOne({ number, name, description, price, image})
    response.send({ acknowledged, insertedId })
})


//route to return menu item by id
router.get('/:id', async (request, response) => {
    const { id } = request.params
    const collection = await getCollection('FoodTruckAPI', 'Menu')
    const found = await collection.findOne({"number": parseInt(id)})
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find a menu item with this id: ${id}` }})
})

module.exports = router