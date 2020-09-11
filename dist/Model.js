class Model {
    constructor() {
        this.cityData = []
    }

    getDataFromDB = async () => {
        this.cityData = await $.get("/cities")
        return this.cityData;
    }

    getCityData = async (cityName) => {
        const selectedCity = await $.get(`/city/${cityName}`)
        selectedCity.new = true;
        this.cityData.push(selectedCity);
    }

    saveCity = async (cityName) => {
        this.cityData.forEach(c => {
            if (c.name === cityName) {
                c.new = false;
                $.post(`/city`, c)
            }
        })
    }

    async removeCity(cityName) {
        const cityIndex = this.cityData.indexOf(cityName);
        this.cityData.splice(cityIndex, 1);
        await $.ajax({
            type: 'DELETE',
            url: `/city/${cityName}`,
        })
    }
}