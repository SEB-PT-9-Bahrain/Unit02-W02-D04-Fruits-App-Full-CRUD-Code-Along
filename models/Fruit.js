const mongoose = require('mongoose')

// Schema
const fruitSchema = new mongoose.Schema({
    name:{
        type: String
    },
    isReadyToEat:{
        type: Boolean
    }
},{timestamps: true})

const Fruit = mongoose.model('Fruit',fruitSchema)


module.exports = Fruit