function findLocation() {
    var pos;
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        pos = [
            lat,
            long
        ];

        document.getElementById('location').innerHTML = "Your location is: " + pos[1] + ", " + pos[0];
    }
    getLocation();
    console.log(pos);
}