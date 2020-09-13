const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost:27017/weaterDB', { useNewUrlParser: true } )

const citySchema = new Schema({
    name:String,
    temperature:Number,
    condition:String,
    conditionPic:String,
    lat:Number,
    lon:Number
})

const City = mongoose.model('City',citySchema)

module.exports = City