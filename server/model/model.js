class model {
    constructor() {
        this.cityData = []
    }
    async getDataFromDB() {
        $.ajax({
            method: 'GET',
            url: '/cities',
            success: await function (data) {
                this.cityData.push(data)
            }
        })
    }
    async getCityData(){
        $.ajax({
            method: 'GET',
            url: '/city',
            success: await function (data) {
                this.cityData.push(data)
            }
        })
    }
    saveCity(){
        $.ajax({
            method: 'POST ',
            url: '/city',
            success: await function (data) {
                this.cityData.push(data)
            }
        })
    }
    async removeCity(){
        const cityName = this.cityData.find(c => c.nama === cityName)
        $.ajax({
            method: 'DELETE ',
            url: '/city',
            success: await function (data) {
                this.cityData.push(data)
            }
        })
    }
}

export default model;