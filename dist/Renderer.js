class Renderer {

    render(data) {
        $("#results").empty()
        const source = $('#city-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template({data});
        $('#results').append(newHTML)
    }
}