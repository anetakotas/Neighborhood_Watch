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
            console.log(Object.keys(data['articles']).length);

            for(var i = 0; i < Object.keys(data['articles']).length; i++) {

                var link = document.createElement('a');
                var cardItem = document.createElement('div');
                var image = document.createElement('img');
                var cardItemText = document.createElement('div');
                var cardHeading = document.createElement('h3');
                var cardDesc = document.createElement('p');

                link.href = data.articles[i].url;
                link.className = 'links';
                cardItem.className = 'cardItem';
                image.src = data.articles[i].urlToImage;
                cardItemText.className = 'cardItemText';
                cardHeading.innerHTML = data.articles[i].title;
                cardDesc.innerHTML = data.articles[i].description;

                cardItemText.appendChild(cardHeading);
                cardItemText.appendChild(cardDesc);
                cardItem.appendChild(image);
                cardItem.appendChild(cardItemText);
                link.appendChild(cardItem);

                document.body.appendChild(link);
            }
        });
}
getData();