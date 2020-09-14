class Model {
    constructor() {
        this.cityData = [ ]
    }

    getDataFromDB = async () => {
        this.cityData = await $.get("/cities")
        return this.cityData;
    }
    getLocation = async () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(resolve, reject)
            }
        })
    }
    getCurrentCity = async () => {
        let position = await this.getLocation()
        const lat = position.coords.latitude
        const long = position.coords.longitude
        await this.getCityData('', lat, long)
    }

    getCityData = async (cityName, lat, lon) => {
        const cityData = {
            cityName: cityName,
            lat: lat,
            lon: lon
        }
        const selectedCity = await $.get(`/city`, cityData)
        selectedCity.new = true;
        this.cityData.push(selectedCity);
    }

    saveCity = async (cityName) => {
        this.cityData.forEach(c => {
            if (c.name === cityName && c.new) {
                c.new = false;
                $.post(`/city`, c)
            }
        })
    }
    
     removeCity=async(cityName)=> {
        this.cityData.forEach((c, i) => {
            if (c.name === cityName) {
                this.cityData.splice(i, 1);
            }
        })
        await $.ajax({
            type: 'DELETE',
            url: `/city/${cityName}`,
        })
    }

    async updateCity(cityName) {
        const data = await $.ajax({
            type: 'PUT',
            url: `/city/${cityName}`,
        })
        this.cityData.forEach((c, i) => {
            if (c.name === cityName) {
                this.cityData[i] = data;
            }
        })
    }
}