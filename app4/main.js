var map; // Khởi tạo các biến global mã mình sẽ sử dụng.
var directionsDisplay;
var directionsService;

function initMap() 
{  
    var lat_lng = {lat: 20.9769427, lng: 105.8921285};  // Latitude (Kinh độ) và Longtitude (Vĩ độ) - cho biết bản đồ của bạn sẽ ở khu vực nào, khu vực mình demo là quanh Hà Nội.
    map = new google.maps.Map(document.getElementById('map'), {    // Khởi tạo map với trong id html là map (lát nữa sẽ tạo <div id="map">)
        zoom: 16,    // tỉ lệ phóng bản đồ
        center: lat_lng    
    });

    

    directionsService = new google.maps.DirectionsService();    // Khởi tạo DirectionsService - thằng này có nhiệm vụ tính toán chỉ đường cho chúng ta.
    directionsDisplay = new google.maps.DirectionsRenderer({map: map});    // Khởi tạo DirectionsRenderer - thằng này có nhiệm vụ hiển thị chỉ đường trên bản đồ sau khi đã tính toán.
    directionsDisplay.setOptions({
        polylineOptions: {
                    strokeWeight: 5,
                    strokeOpacity: 1,
                    strokeColor:  "#25c481" 
                },
                suppressMarkers: true,
        });
    //directionsDisplay.setOptions( { suppressMarkers: true } );
    var onChangeHandler = function() 
    {    
        calculateAndDisplayRoute(directionsService, directionsDisplay);    // Hàm xử lý và hiển thị kết quả chỉ đường
    };    
    document.getElementById('source').addEventListener('change', onChangeHandler);    // Tạo sự kiện khi chọn điểm xuất phát
    document.getElementById('destination').addEventListener('change', onChangeHandler);    // Tạo sự kiện khi chọn điểm đích
    document.getElementById('mode').addEventListener('change', onChangeHandler);    
} 
function calculateAndDisplayRoute(directionsService, directionsDisplay) 
{    

    var start = document.getElementById('source').value;
    var stop = document.getElementById('destination').value;
    //directionsDisplay.setMap(map);

    var startMarker = new google.maps.Marker
    ({ 
        position: start, 
        map: map, 
        //icon: 'start.png' 
        title: "My Location",
        icon: 
        { 
            url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOASURBVGhD7ZZPSJNxGMctMusSRnmOzHMhEtUhJLfZyM06WGzOFN3booOo0SGIGBYkIbmtYyloh4I6CCXbSMNTtneTgqCTefLQzf5YbO/I9+155iO8rqftdU73M94vfNi79/f8+T7v7927t8yUKVOlkfbScVCNOAfUsHMmAx5PXjhAy9tD2kRTNRhf0CJOTQ+eUyfOHaIw8QU7EM0eYhU17IhQmNiC3divRhzL3BBIZm38fCWFiys16qzhBtCDMRQurtSwvQJunyVuAAR25If2/OJuChdbMMg9bggEfj93KUx84RWHJ9TY34M4RrVZXzmFbR+p4eZa2J2+FZpr6bSpkqjO5ys/65FOW9xSO4LH9fX+XbQsvk629O21ub23rW7voq1V0vTgOeBWfUfHHgoXU/aWziownMgeIBtrqzeGsZQmluz27go0yBnngNi3ePtRujiyuq/0cIZzYXFJ3ZQujmxuaZ4zmwurW5qjdDHU2Oat4Ywaok06TGVKL5tLamBNGgFyqUzpZXF1NbEmDYC5VKb0MgcBzEE2Q//NIHaPZx+8Qw2DMTXbaA5UzMFcKiOOLC6vHcwtMKbXgDEYS2liytoq3eHM68EYChdXRt65MIbCxVWjW/Jw5vVgDIWLI03TdoQSySPBRNIWjCudPY+iTzjzenofR8YwFnMwF2tQua2Tf1rbNRRLNgRkZTAoK9OBeOo7mNJW6Z+YY83rwRh9TlBOfVuppdwPxZJnsAe1K74expRj0HAE+LrGRBYDU19Y83owhstdBS7OYqbXO+Uotd+4cOvh6r/mGnI8mFlizevBGC73H0SH4slqslOYQrJyKSCnfjHFc2K/fI0dAME1LicncuoneiFb61Mwnj4OBRS2cB6cvhvsEAiucTn5gNstGYql68ieccFOPOMKGqGlt58dAsE1LscI6InsGRckjmcXMor75iA7BIJrXI4hZOUF2TMufMbDdv5mC+bh+sgbzTswyoJrXE4+0Av86K1kb30KycnuQocpJughkEhfJVuFKSCnT8Ef1SeuwZYgpz7CECfIzsbk17SdQ/GUEwaagsLLbMNigj1kZRI+HdibbBRXofdqFTTpyDzVZGWeNVIA8Kf7GYw/DcSUduxB7bZOgQ9aZebdK650BeMpP9zPw3D8iq5oDL7PIniM53ANYzAWBujEdyusQeVMmTK1KSor+wNB8sD7zDJmAwAAAABJRU5ErkJggg==",
            scaledSize: new google.maps.Size(48,48)
        },
        animation: google.maps.Animation.DROP
    });
    var stopMarker = new google.maps.Marker
    ({ 
        position: stop, 
        map: map, 
        //icon: 'stop.png' 
        title: "My Location",
        icon: 
        { 
            url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOASURBVGhD7ZZPSJNxGMctMusSRnmOzHMhEtUhJLfZyM06WGzOFN3booOo0SGIGBYkIbmtYyloh4I6CCXbSMNTtneTgqCTefLQzf5YbO/I9+155iO8rqftdU73M94vfNi79/f8+T7v7927t8yUKVOlkfbScVCNOAfUsHMmAx5PXjhAy9tD2kRTNRhf0CJOTQ+eUyfOHaIw8QU7EM0eYhU17IhQmNiC3divRhzL3BBIZm38fCWFiys16qzhBtCDMRQurtSwvQJunyVuAAR25If2/OJuChdbMMg9bggEfj93KUx84RWHJ9TY34M4RrVZXzmFbR+p4eZa2J2+FZpr6bSpkqjO5ys/65FOW9xSO4LH9fX+XbQsvk629O21ub23rW7voq1V0vTgOeBWfUfHHgoXU/aWziownMgeIBtrqzeGsZQmluz27go0yBnngNi3ePtRujiyuq/0cIZzYXFJ3ZQujmxuaZ4zmwurW5qjdDHU2Oat4Ywaok06TGVKL5tLamBNGgFyqUzpZXF1NbEmDYC5VKb0MgcBzEE2Q//NIHaPZx+8Qw2DMTXbaA5UzMFcKiOOLC6vHcwtMKbXgDEYS2liytoq3eHM68EYChdXRt65MIbCxVWjW/Jw5vVgDIWLI03TdoQSySPBRNIWjCudPY+iTzjzenofR8YwFnMwF2tQua2Tf1rbNRRLNgRkZTAoK9OBeOo7mNJW6Z+YY83rwRh9TlBOfVuppdwPxZJnsAe1K74expRj0HAE+LrGRBYDU19Y83owhstdBS7OYqbXO+Uotd+4cOvh6r/mGnI8mFlizevBGC73H0SH4slqslOYQrJyKSCnfjHFc2K/fI0dAME1LicncuoneiFb61Mwnj4OBRS2cB6cvhvsEAiucTn5gNstGYql68ieccFOPOMKGqGlt58dAsE1LscI6InsGRckjmcXMor75iA7BIJrXI4hZOUF2TMufMbDdv5mC+bh+sgbzTswyoJrXE4+0Av86K1kb30KycnuQocpJughkEhfJVuFKSCnT8Ef1SeuwZYgpz7CECfIzsbk17SdQ/GUEwaagsLLbMNigj1kZRI+HdibbBRXofdqFTTpyDzVZGWeNVIA8Kf7GYw/DcSUduxB7bZOgQ9aZebdK650BeMpP9zPw3D8iq5oDL7PIniM53ANYzAWBujEdyusQeVMmTK1KSor+wNB8sD7zDJmAwAAAABJRU5ErkJggg==",
            scaledSize: new google.maps.Size(48,48)
        },
        animation: google.maps.Animation.DROP
    });
    var icons = {
        start: new google.maps.MarkerImage(
            // URL
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOASURBVGhD7ZZPSJNxGMctMusSRnmOzHMhEtUhJLfZyM06WGzOFN3booOo0SGIGBYkIbmtYyloh4I6CCXbSMNTtneTgqCTefLQzf5YbO/I9+155iO8rqftdU73M94vfNi79/f8+T7v7927t8yUKVOlkfbScVCNOAfUsHMmAx5PXjhAy9tD2kRTNRhf0CJOTQ+eUyfOHaIw8QU7EM0eYhU17IhQmNiC3divRhzL3BBIZm38fCWFiys16qzhBtCDMRQurtSwvQJunyVuAAR25If2/OJuChdbMMg9bggEfj93KUx84RWHJ9TY34M4RrVZXzmFbR+p4eZa2J2+FZpr6bSpkqjO5ys/65FOW9xSO4LH9fX+XbQsvk629O21ub23rW7voq1V0vTgOeBWfUfHHgoXU/aWziownMgeIBtrqzeGsZQmluz27go0yBnngNi3ePtRujiyuq/0cIZzYXFJ3ZQujmxuaZ4zmwurW5qjdDHU2Oat4Ywaok06TGVKL5tLamBNGgFyqUzpZXF1NbEmDYC5VKb0MgcBzEE2Q//NIHaPZx+8Qw2DMTXbaA5UzMFcKiOOLC6vHcwtMKbXgDEYS2liytoq3eHM68EYChdXRt65MIbCxVWjW/Jw5vVgDIWLI03TdoQSySPBRNIWjCudPY+iTzjzenofR8YwFnMwF2tQua2Tf1rbNRRLNgRkZTAoK9OBeOo7mNJW6Z+YY83rwRh9TlBOfVuppdwPxZJnsAe1K74expRj0HAE+LrGRBYDU19Y83owhstdBS7OYqbXO+Uotd+4cOvh6r/mGnI8mFlizevBGC73H0SH4slqslOYQrJyKSCnfjHFc2K/fI0dAME1LicncuoneiFb61Mwnj4OBRS2cB6cvhvsEAiucTn5gNstGYql68ieccFOPOMKGqGlt58dAsE1LscI6InsGRckjmcXMor75iA7BIJrXI4hZOUF2TMufMbDdv5mC+bh+sgbzTswyoJrXE4+0Av86K1kb30KycnuQocpJughkEhfJVuFKSCnT8Ef1SeuwZYgpz7CECfIzsbk17SdQ/GUEwaagsLLbMNigj1kZRI+HdibbBRXofdqFTTpyDzVZGWeNVIA8Kf7GYw/DcSUduxB7bZOgQ9aZebdK650BeMpP9zPw3D8iq5oDL7PIniM53ANYzAWBujEdyusQeVMmTK1KSor+wNB8sD7zDJmAwAAAABJRU5ErkJggg==",
            // (width,height)
            new google.maps.Size( 48, 48 ),
            // The origin point (x,y)
            new google.maps.Point( 0, 0 ),
            // The anchor point (x,y)
            new google.maps.Point( 24, 24 )
        ),
        end: new google.maps.MarkerImage(
            // URL
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOASURBVGhD7ZZPSJNxGMctMusSRnmOzHMhEtUhJLfZyM06WGzOFN3booOo0SGIGBYkIbmtYyloh4I6CCXbSMNTtneTgqCTefLQzf5YbO/I9+155iO8rqftdU73M94vfNi79/f8+T7v7927t8yUKVOlkfbScVCNOAfUsHMmAx5PXjhAy9tD2kRTNRhf0CJOTQ+eUyfOHaIw8QU7EM0eYhU17IhQmNiC3divRhzL3BBIZm38fCWFiys16qzhBtCDMRQurtSwvQJunyVuAAR25If2/OJuChdbMMg9bggEfj93KUx84RWHJ9TY34M4RrVZXzmFbR+p4eZa2J2+FZpr6bSpkqjO5ys/65FOW9xSO4LH9fX+XbQsvk629O21ub23rW7voq1V0vTgOeBWfUfHHgoXU/aWziownMgeIBtrqzeGsZQmluz27go0yBnngNi3ePtRujiyuq/0cIZzYXFJ3ZQujmxuaZ4zmwurW5qjdDHU2Oat4Ywaok06TGVKL5tLamBNGgFyqUzpZXF1NbEmDYC5VKb0MgcBzEE2Q//NIHaPZx+8Qw2DMTXbaA5UzMFcKiOOLC6vHcwtMKbXgDEYS2liytoq3eHM68EYChdXRt65MIbCxVWjW/Jw5vVgDIWLI03TdoQSySPBRNIWjCudPY+iTzjzenofR8YwFnMwF2tQua2Tf1rbNRRLNgRkZTAoK9OBeOo7mNJW6Z+YY83rwRh9TlBOfVuppdwPxZJnsAe1K74expRj0HAE+LrGRBYDU19Y83owhstdBS7OYqbXO+Uotd+4cOvh6r/mGnI8mFlizevBGC73H0SH4slqslOYQrJyKSCnfjHFc2K/fI0dAME1LicncuoneiFb61Mwnj4OBRS2cB6cvhvsEAiucTn5gNstGYql68ieccFOPOMKGqGlt58dAsE1LscI6InsGRckjmcXMor75iA7BIJrXI4hZOUF2TMufMbDdv5mC+bh+sgbzTswyoJrXE4+0Av86K1kb30KycnuQocpJughkEhfJVuFKSCnT8Ef1SeuwZYgpz7CECfIzsbk17SdQ/GUEwaagsLLbMNigj1kZRI+HdibbBRXofdqFTTpyDzVZGWeNVIA8Kf7GYw/DcSUduxB7bZOgQ9aZebdK650BeMpP9zPw3D8iq5oDL7PIniM53ANYzAWBujEdyusQeVMmTK1KSor+wNB8sD7zDJmAwAAAABJRU5ErkJggg==",
            // (width,height)
            new google.maps.Size( 48, 48 ),
            // The origin point (x,y)
            new google.maps.Point( 0, 0 ),
            // The anchor point (x,y)
            new google.maps.Point( 24, 24 )
        )
    };
    directionsService.route(
    {    
        origin: start,    
        destination: stop,    
        travelMode: document.getElementById('mode').value,     
    }, function(response, status) 
    {    
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            var leg = response.routes[ 0 ].legs[ 0 ];
            makeMarker( leg.start_location, icons.start, "title" );
            makeMarker( leg.end_location, icons.end, 'title' );
            showSteps(response);
        } else {    
            window.alert('Request for getting direction is failed due to ' + status);    
        }    
    });  
    function makeMarker( position, icon, title ) {
        new google.maps.Marker({
            position: position,
            map: map,
            icon: icon,
            title: title
        });
    }  
}    