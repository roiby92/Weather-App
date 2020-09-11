const express = require('express')
const router = express.Router()
const City = require('./../model/city')
const axios = require('axios')

const getURL = function (city) {
    return `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b480793f85b72213c6dc2bf55559e01e`
}

router.get('/city/:cityName', async (req, res) => {
    const cityName = req.params.cityName
    const response = await axios.get(getURL(cityName));
    const cityData = {
        name: response.data.name,
        temperature: (response.data.main.temp),
        condition: response.data.weather[0].description,
        conditionPic: response.data.weather[0].icon
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
    const cityName = req.params.cityName
    const deletedCity = await City.findOneAndDelete({ name: cityName })
    res.send(`${deletedCity.name} was deleted from DB`)
})

module.exports = router