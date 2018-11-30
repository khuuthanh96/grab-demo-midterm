var checkStatus = false;
$(document).ready(function()
{
    setCookie("accesstoken","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmU1NWViYWU4MGRhYzE0MmViZWNkN2IiLCJlbWFpbCI6InRhaXhlMkBnbWFpbC5jb20iLCJuYW1lIjoidGFpeGUgMiIsImFkZHJlc3MiOiI1NDMgc2ZhcywgUDMsIFEuMTAiLCJwaG9uZSI6IjAxMjM0NTYiLCJfX3YiOjAsImxvbmciOjEwNi42ODQwOTI4LCJsYXQiOjEwLjc1OTM0NzksInN0YXR1cyI6dHJ1ZSwiYWN0aXZlIjp0cnVlLCJyb2xlcyI6ImRyaXZlciIsInNleCI6Im1hbGUiLCJpYXQiOjE1NDM0MTk5NzYsImV4cCI6MTU0MzQyMzU3Nn0.I7pXanNRhEHm9ul44w6CHGdlvKkyWVNL5-bJJHk05PE",1);
    setCookie("refreshtoken","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjViZTU1ZWJhZTgwZGFjMTQyZWJlY2Q3YiIsImVtYWlsIjoidGFpeGUyQGdtYWlsLmNvbSIsIm5hbWUiOiJ0YWl4ZSAyIiwiYWRkcmVzcyI6IjU0MyBzZmFzLCBQMywgUS4xMCIsInBob25lIjoiMDEyMzQ1NiIsIl9fdiI6MCwibG9uZyI6MTA2LjY4NDA5MjgsImxhdCI6MTAuNzU5MzQ3OSwic3RhdHVzIjp0cnVlLCJhY3RpdmUiOnRydWUsInJvbGVzIjoiZHJpdmVyIiwic2V4IjoibWFsZSJ9LCJydCI6dHJ1ZSwiaWF0IjoxNTQzNDE5OTc2LCJleHAiOjE1NDQwMjQ3NzZ9.b_MAWXpSEPPBMYPOGm_qVJ_EdaaAT9-dFpI4kg_PMJA",7);
    $(window).bind('beforeunload', function() {
        $.ajax({
            type: "PUT",
            url: "http://localhost:8000/api/request/delete/" + myRequest._id,
            data: {},
            dataType: "json",
            contentType: "application/json",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + getCookie("accesstoken"))
            },
            success: function(data) {
                if(data.success) {
                    console.log(data.success);
                } else {
                    console.log(data.success);
                }
            }
        })
    })
    $(".btn-signin").click(function(event){
        event.stopPropagation();
        $(".btn-signin").removeClass("active");
        $(".title_signin").removeClass("none");
        $(".form").removeClass("none");
        $(".content").addClass("none");
    });
    $(".signup_avatar").click(function(event){
        event.stopPropagation();
        $(".container_signin").removeClass("none");
        $(".screenWelcome").removeClass("none");
    });   
    if(typeof getCookie("accesstoken") != "string") {
 
    }
    $("#signin-button").click(function(event)
    {
        event.preventDefault();
        var data = {
            "email": $("#name").val(),
            "password": $("#password").val()
        }

        //request api login -> có được user, accesstoken, refreshtoken
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/auth/login",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function(data, status) {
                $(".container_signin").addClass("none");
                $(".screenWelcome").addClass("none");
                $(".wrapper").addClass("none");
                setCookie("accesstoken", data.accessToken, 1);
                setCookie("refreshtoken", data.refreshToken, 7);
                setCookie("user", JSON.stringify(data.user), 7);

                //set default data
                $("#clientName").val(data.user.name),
                $("#address").val(data.user.address),
                $("#phone").val(data.user.phone)
            },
            error: function(jqXhr) {
                $(".btn-signin").addClass("active");
                $(".title_signin").addClass("none");
                $(".form").addClass("none");
                $(".content").removeClass("none");
                $("#msg").text(jqXhr.responseJSON.message.message);
                setTimeout(() => {
                    $("#msg").text("");
                }, 3000)
            }
        })
    });
    //console.log(getCookie("accesstoken"));
    $("#status").click(function(event)
    {
        if(checkStatus === false)
        {
            $("#status").addClass("statusClicked");
            checkStatus = true;
            var data = {
                "status": true
            }
            $.ajax({
                type: "PUT",
                url: "http://localhost:8000/api/user/status",
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + getCookie("accesstoken"))
                },
                success: function(data, status) {

                },
                error: function(jqXhr) {
                    console.log(JSON.stringify(jqXhr));
                    if (jqXhr.status === 401)
                    {
                        getAccessToken(function(status) {
                            if (status){
                                $.ajax({
                                    type: "PUT",
                                    url: "http://localhost:8000/api/user/status",
                                    data: JSON.stringify(data),
                                    dataType: "json",
                                    contentType: "application/json",
                                    beforeSend: function(xhr) {
                                        xhr.setRequestHeader("Authorization", "Bearer " + getCookie("accesstoken"))
                                    },
                                    success: function(data, status) {
                    
                                    },
                                });
                            
                            }
                            else {
                                alert("logout nhe")
                            }
                        })
                    }
                }
            })
        }
        else
        {
            $("#status").removeClass("statusClicked");
            checkStatus = false;
        }
    });
});
var map; // Khởi tạo các biến global mã mình sẽ sử dụng.
var directionsDisplay;
var directionsService;
var yourLocation;
var userLocation;
var markers = [];
function initMap() 
{  
    var lat_lng = {lat: 10.763292, lng: 106.682172};
    map = new google.maps.Map(document.getElementById('map'), 
    {    // Khởi tạo map với trong id html là map (lát nữa sẽ tạo <div id="map">)
        zoom: 16,    // tỉ lệ phóng bản đồ
        center: lat_lng   
    });
    var checkOnLocation = false;
    while (checkOnLocation === false)
    {
        if (navigator.geolocation)
        {
            checkOnLocation = true;
        }
        else
        {
            alert("Please turn on your location!");
        }
    }
    var nav = navigator.geolocation;
    var pos = nav.getCurrentPosition(fn_ok);

    function fn_ok(position)
    {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        yourLocation = new google.maps.LatLng(lat, lng);
    }

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
        //clearMarkers();
        if (checkStatus === true)
        {
            userLocation = document.getElementById('destination').value;
            calculateAndDisplayRoute(directionsService, directionsDisplay);    // Hàm xử lý và hiển thị kết quả chỉ đường  
        }
        else
        {
            userLocation = yourLocation;
            calculateAndDisplayRoute(directionsService, directionsDisplay);    // Hàm xử lý và hiển thị kết quả chỉ đường  
        }
    };    

    //document.getElementById('source').addEventListener('change', onChangeHandler);    // Tạo sự kiện khi chọn điểm xuất phát
    document.getElementById('destination').addEventListener('change', onChangeHandler);    // Tạo sự kiện khi chọn điểm đích
    document.getElementById('mode').addEventListener('change', onChangeHandler);    
    document.getElementById('signin-button').addEventListener('click', onChangeHandler);    
} 

function calculateAndDisplayRoute(directionsService, directionsDisplay) 
{    

    //var start = document.getElementById('source').value;
    var start = yourLocation;
    var stop = userLocation;

    var icons = {
        start: new google.maps.MarkerImage(
            // URL
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAQGSURBVGhD7VhHaBRhGP1tGPQgiiLiyajY8GCC2DYJNlCxHmIvB/Ek5KIGC1hOCuIWUKygRrBEQTEHwRbLwcwmWGLBrgfFXITYsjMbnd/3DV+CmG/WmZidFZwHj13mf9/73jfzz+wkKkSIECFC6BI13C5S68FDYBXzkF2s1tEay/5dIOw88IEuUjoTSYOh5nLZvwN7vOpjR9RlKXQmYqBLVMs2uYVdooYg0EspqBfiBLzQEZXPdrmBnqZ6YYhHUkA/xDD15MW2wQNDnJSCtYfwqmDbYIGbdSya21IoItZ+gFfBPQ4j6jodk7RErNnYYoVsHxzQvPL3MC2krQKOZGkrMPxoZxsJNUSsnWZpMMBvQR6afhHD0I2fYb/jrPeG5pVL7Wd7hurO0uwDDYulIEQvvw8YZr5U63CSirAs+0DYpWKIiGrUpaoLy1yhC1U3nIxPkgeu9GKWZR9oVuYSop4lfwS0D108yliSfaDZCpcQb1jyR+CKvBU9itQylmQf2FojpBBEe6IazDJXoH6oVEtE/TCWBQOcOfG1BMdPsMQV0Ig/pDj+jCXBAduoXApDRKBNLGsD1G2RaoioW8+y4IBA/dDYkgIRsVaNp1gpmM8sdY4JWqLjVaL6sn2wQPMKKVS7GFHH2DZ40I2NK9MsBvNBnJC0l4dEVoEQB6VwfgiPfWyXO+AvvIEI0iQF9EJc0a/2FNWf7XILhNkqhfRC1G5mm9yD3lgR6LkUNBNxJZ8G+rbrBfi1ni6FzUQMP5XLc4/d9+2eiZr0+HjSWt6wpOCeFFhiw9KCu1RDtQfrdA+2Cw676nSvWNJaFDPMCgR5Ekua3/GpiQdufNBfZw8Qg/9K0uy/2eDUEMkDno/xeSxhWAupB7frWGitO8VrU9PRrAoDpFsCSLxw/KLWxZ3EARxi7XxFlVjbQqeHYV2MJlPTqDfH+DtEa62CeNK8JzV048MNq+UhwPryNWKNG3GV6hJJawzHaR9ihrUGQzRLDTJx3+2PunH+oDZDNC7Id9akmsw0mykLx/KHaE1qyq/73y/Pnrmm7ZLOrUPYxV105ZlqUeuFlCVRk5rM8bwDZ+CcZOiHye3lrYMYOzaKGl80rLMczzvihnlaNPPBhNGk36+apN+tjDjfJY0f4iFwiuN5R7wuHcEwlmToh0euvHYorfkissSM9ASO5w8wWIy9mWpjGjjNJnz+3b+JYnfMETC61dY8GGI73cDJ7Lh/SDivIbhvYPxNatiRdHoY5slYbXoct+94HK3WefFacxaeIHvRrIYvuxjIKzk4vKwEzv5M6sHtgsO2at01alijoklzDl4p1uI1ZieGO4xQlXiEX8DAV4jOdxyjNdKQ1qlBLXmwXYgQIUL8F1DqJ5jgpLTWuD9XAAAAAElFTkSuQmCC",
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
        travelMode: document.getElementById('mode').value
    }, function(response, status) 
    {    
        if (status === google.maps.DirectionsStatus.OK) 
        {
            directionsDisplay.setDirections(response);
            var leg = response.routes[ 0 ].legs[ 0 ];
            for (i in markers) 
            {
                markers[i].setMap(null);
            }
            markers = [];
            makeMarker( leg.start_location, icons.start, "My Location:\n" + start);
            if (checkStatus === true)
            {
                makeMarker( leg.end_location, icons.end, stop );
            }
            else
            {
                makeMarker( leg.end_location, icons.start, "My Location:\n" + start );
            }
            for (i in markers) 
            {
                markers[i].setMap(map);
            }
        } 
        else 
        {    
            window.alert('Request for getting direction is failed due to ' + status);    
        }    
    });  
    function makeMarker( position, icon, title ) {
        var marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: icon,
            title: title,
            animation: google.maps.Animation.DROP
        });
        markers.push(marker);
    }  
}   
function setCookie(name, value, days) {
    var expires;
    
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }

    console.log(name, value, expires);
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
  
}

function getCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    setCookie(name, "", -1);
} 

function getAccessToken(cb)
{
    var data = {
        "refreshtoken" : getCookie("refreshtoken")
    }
    $.ajax({
        type: "POST",
        url: "http://192.168.1.36:8000/auth/refreshtoken",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        success: function(data, status) {
            setCookie("accesstoken",data.accesstoken,1);
            cb(true);
        },
        error: function(jqXhr) {
            console.log(JSON.stringify(jqXhr));
            if (jqXhr.status === 401)
            {
                cb(false);
            }
        }
    })
}