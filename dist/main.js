const renderer = new Renderer();
const model = new Model();


const loadPage = async () => {
    await model.getDataFromDB()
    await model.getCurrentCity()
    renderer.render(model.cityData)
}
loadPage()

const handleSearch = async cityInput => {
    await model.getCityData(cityInput, "", "")
    renderer.render(model.cityData)
}


$('#city-butn').on('click', async function () {
    const cityInput = $('#city-input').val().toLocaleLowerCase()
    $('#city-input').val("")
    await handleSearch(cityInput)
})

$('#results').on('click', '.add', async function () {
    const cityName = $(this).closest('.city').find('p').text();
    await model.saveCity(cityName);
    renderer.render(model.cityData)
})
$('#results').on('click', '.delete', async function () {
    const cityName = $(this).closest('.city').find('p').text();
    await model.removeCity(cityName);
    renderer.render(model.cityData)
})


$('#results').on('click', '.fa-retweet', async function () {
    const cityName = $(this).closest('.city').find('p').text();
    await model.updateCity(cityName)
    renderer.render(model.cityData);
})
