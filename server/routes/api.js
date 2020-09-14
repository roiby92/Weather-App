const express = require('express')
const router = express.Router()
const City = require('./../model/city')
const axios = require('axios')
const moment = require('moment')

const getURL = function (city) {
    return `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b480793f85b72213c6dc2bf55559e01e`
}
const getLLURL = (lat,lon)=>{
   return `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=b480793f85b72213c6dc2bf55559e01e`
}

router.get('/city', async (req, res) => {
    const { cityName, lat, lon } = req.query
    let response =null
    if (cityName) {
         response = await axios.get(getURL(cityName)).catch(e=>console.log(e));
    }else{
         response = await axios.get(getLLURL(lat,lon)).catch(e=>console.log(e));  
    }
        const cityData = {
            name: response.data.name,
            temperature: (response.data.main.temp),
            condition: response.data.weather[0].description,
            conditionPic: response.data.weather[0].icon,
            lat: response.data.coord.lat,
            lon: response.data.coord.lon
        }
        res.send(cityData)
})

router.get('/cities', async (req, res) => {
    const allCities = await City.find({})
    res.send(allCities)
})

router.post('/city', (req, res) => {
    const newCity = new City(req.body)
    newCity.save()
    res.send(`${newCity.name} has been saved to the DB`)

})

router.delete('/city/:cityName', async (req, res) => {
    const { cityName } = req.params
    const deletedCity = await City.findOneAndDelete({ name: cityName })
    res.send(`${deletedCity.name} was deleted from DB`)
})

router.put('/city/:cityName', async (req, res) => {
    const { cityName } = req.params
    const response = await axios.get(getURL(cityName));
    const cityUpdate = await City.findOneAndUpdate({ name: cityName }, {
        $set:
        {
            temperature: response.data.main.temp,
            condition: response.data.weather[0].description,
            conditionPic: response.data.weather[0].icon,
        }
    }, { new: true })
    res.send(cityUpdate)
})
module.exports = router