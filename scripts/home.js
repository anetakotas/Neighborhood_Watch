async function getData() {
    // var url = 'https://newsapi.org/v2/everything?' +
    // 'q=Coolock&' +
    // 'sortBy=popularity&' +
    // 'apiKey=9bef5dcab30442d39dd5ed0a29b51d90';

    fetch('https://newsapi.org/v2/everything?q=Coolock&sortBy=popularity&apiKey=9bef5dcab30442d39dd5ed0a29b51d90')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            var image = document.getElementById('cardImage');
            var title = document.getElementById('cardTitle');
            var desc = document.getElementById('cardDesc');
            var link = document.getElementById('cardLink');
            image.src = data.articles[0].urlToImage;
            title.innerHTML = data.articles[0].title;
            desc.innerHTML = data.articles[0].description;
            link.href = data.articles[0].url;
            
        });
}
getData();