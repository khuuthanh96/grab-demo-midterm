$(document).ready(function(){
    var driver = true;
    var request = false;
    $("a.driver").click(function(event){
        event.stopPropagation();
        if (driver === false)
        {
            driver = true;
            request = false;
            $("a.driver").addClass("active");
            $("a.request").removeClass("active");
            $(".driver_form").addClass("active");
            $(".request_form").removeClass("active");
        }
    });
    $("a.request").click(function(event){
        event.stopPropagation();
        if (request === false)
        {
            request = true;
            driver = false;
            $("a.request").addClass("active");
            $("a.driver").removeClass("active");
            $(".request_form").addClass("active");
            $(".driver_form").removeClass("active");
        }
    });
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
});
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
            setCookie("accesstoken", data.accessToken, 1);
            setCookie("refreshtoken", data.refreshToken, 7);
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

    $.ajax({
        type: "GET",
        url: "http://localhost:8000/api/request",
        dataType: "json",
        data: {},
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + getCookie("accesstoken"))
        },
        success: function(data, status) {
            console.log(data)
            console.log(status)
        },
    })
});
$("#VI_language-button").click(function(event)
{
    event.preventDefault();
    $(".driver_form h1").text("Tài Xế");
    $(".request_form h1").text("Yêu Cầu");

    $(".driver_form tr th:nth-child(1)").text("Người Dùng");
    $(".driver_form tr th:nth-child(2)").text("Tài Xế");
    $(".driver_form tr th:nth-child(3)").text("Địa Chỉ Đón");
    $(".driver_form tr th:nth-child(4)").text("Số Điện Thoại");
    $(".driver_form tr th:nth-child(5)").text("Ghi Chú");
});

$("#EN_language-button").click(function(event)
{
    event.preventDefault();
    $(".driver_form h1").text("Driver");
    $(".request_form h1").text("Request");

    $(".driver_form tr th:nth-child(1)").text("User Name");
    $(".driver_form tr th:nth-child(2)").text("Driver Name");
    $(".driver_form tr th:nth-child(3)").text("Address");
    $(".driver_form tr th:nth-child(4)").text("Phone Number");
    $(".driver_form tr th:nth-child(5)").text("Note");
});

$(document).ready(function() {

    $.getJSON('data.json', function(data) 
    {
        console.log("It work!")
        $.each(data.users, function(key, val) {
            // alert(val[0].clientName);
            // alert(val[0].driverName);
         })
    });
});

/*
$(document).ready(function () {
    var data;
    $.ajax({
        dataType: "json",
        url: 'data.json',
        data: data,
        success: function (data) {
            // begin accessing JSON data here
            console.log(data[0].clientName);
        }
    });
});
*/
/*
$(document).ready(function () {
    var data;
    $.ajax({
        dataType: "json",
        url: './../data/data.json',
        data: data,
        success: function (data) {
            // begin accessing JSON data here
            var getData = $.parseJSON(data);
            console.log(getData[0].clientName);
            alert(getData[0].clientName);
        },
        error: function ()
        {
            alert("Error read file");
        }
    });
});
*/

function setCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
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
    createCookie(name, "", -1);
}