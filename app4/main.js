function initMap() 
{
    if (navigator.geolocation)
    {
        var mapDiv = document.getElementById('map');
        var nav = navigator.geolocation;
        var pos = nav.getCurrentPosition(fn_ok);

        function fn_ok(position)
        {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            var gLatLng = new google.maps.LatLng(lat, lng);
            var ojbConfig = 
            {
                zoom: 18,
                center: gLatLng
            }

            var gMap = new google.maps.Map(mapDiv, ojbConfig);

            var gMarkerConfig = 
            {
                position: gLatLng,
                map: gMap,
                title: "My Location",
                icon: 
                { 
                    url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOASURBVGhD7ZZPSJNxGMctMusSRnmOzHMhEtUhJLfZyM06WGzOFN3booOo0SGIGBYkIbmtYyloh4I6CCXbSMNTtneTgqCTefLQzf5YbO/I9+155iO8rqftdU73M94vfNi79/f8+T7v7927t8yUKVOlkfbScVCNOAfUsHMmAx5PXjhAy9tD2kRTNRhf0CJOTQ+eUyfOHaIw8QU7EM0eYhU17IhQmNiC3divRhzL3BBIZm38fCWFiys16qzhBtCDMRQurtSwvQJunyVuAAR25If2/OJuChdbMMg9bggEfj93KUx84RWHJ9TY34M4RrVZXzmFbR+p4eZa2J2+FZpr6bSpkqjO5ys/65FOW9xSO4LH9fX+XbQsvk629O21ub23rW7voq1V0vTgOeBWfUfHHgoXU/aWziownMgeIBtrqzeGsZQmluz27go0yBnngNi3ePtRujiyuq/0cIZzYXFJ3ZQujmxuaZ4zmwurW5qjdDHU2Oat4Ywaok06TGVKL5tLamBNGgFyqUzpZXF1NbEmDYC5VKb0MgcBzEE2Q//NIHaPZx+8Qw2DMTXbaA5UzMFcKiOOLC6vHcwtMKbXgDEYS2liytoq3eHM68EYChdXRt65MIbCxVWjW/Jw5vVgDIWLI03TdoQSySPBRNIWjCudPY+iTzjzenofR8YwFnMwF2tQua2Tf1rbNRRLNgRkZTAoK9OBeOo7mNJW6Z+YY83rwRh9TlBOfVuppdwPxZJnsAe1K74expRj0HAE+LrGRBYDU19Y83owhstdBS7OYqbXO+Uotd+4cOvh6r/mGnI8mFlizevBGC73H0SH4slqslOYQrJyKSCnfjHFc2K/fI0dAME1LicncuoneiFb61Mwnj4OBRS2cB6cvhvsEAiucTn5gNstGYql68ieccFOPOMKGqGlt58dAsE1LscI6InsGRckjmcXMor75iA7BIJrXI4hZOUF2TMufMbDdv5mC+bh+sgbzTswyoJrXE4+0Av86K1kb30KycnuQocpJughkEhfJVuFKSCnT8Ef1SeuwZYgpz7CECfIzsbk17SdQ/GUEwaagsLLbMNigj1kZRI+HdibbBRXofdqFTTpyDzVZGWeNVIA8Kf7GYw/DcSUduxB7bZOgQ9aZebdK650BeMpP9zPw3D8iq5oDL7PIniM53ANYzAWBujEdyusQeVMmTK1KSor+wNB8sD7zDJmAwAAAABJRU5ErkJggg==",
                    scaledSize: new google.maps.Size(48,48)
                },
                animation: google.maps.Animation.DROP
            }
            var gMarket = new google.maps.Marker(gMarkerConfig);
        }
    }
    else
    {
        alert("No")
    }
    /*
    var location = {lat: -25, lng: 131};
    map = new google.maps.Map(document.getElementById('map'), {
        //center: {lat: -34.397, lng: 150.644},
        zoom: 8,
        center: location
    });
    var marker = new google.maps.Marker({
        position: location,
        map: map
    })
    */
}