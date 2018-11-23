var lang = 1;
var myRequest;
$(document).ready(function(){
    if(typeof getCookie("refreshtoken") != "string") {
        $(".container_signin").removeClass("none");
        $(".screenWelcome").removeClass("none");
    }
    else {
        $(".container_signin").addClass("none");
        $(".screenWelcome").addClass("none");

        user = JSON.parse(getCookie("user"));
        if(user) {
            //set default data
            $("#clientName").val(user.name),
            $("#address").val(user.address),
            $("#phone").val(parseInt(user.phone))
        }
    }
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
})

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

$("#find-button").click(function(event)
{
	event.preventDefault();
	 
	$("form").fadeOut(500);
    $(".wrapper").addClass("form-success");

    var check = check_Form();
    if (check == false)
    {
        $("form").fadeIn(500);
        $(".wrapper").removeClass("form-success");
    }

    var data = {
        clientName: $("#clientName").val(),
        clientID: JSON.parse(getCookie("user"))._id,
        address: $("#address").val(),
        phone: $("#phone").val(),
        note: $("#note").val()
    }

    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/request",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + getCookie("accesstoken"))
        },
        success: function(data, status) {
            //nếu tạo request thành công: 
            if(data.success) {
                myRequest = data.data;
                //counting request
                var myCount = 60;
                var countInterval = setInterval(function() {
                    $("#result").text("Finding driver for you....." + myCount + "s left")
                    myCount -= 1
                }, 1000);
                count = 0;
                //tạo 1 request long polling để đợi server dữ liệu. tối đa 60s
                $.ajax({
                    type: "GET",
                    url: "http://localhost:8000/api/request/accepted/" + myRequest._id,
                    data: {},
                    dataType: "json",
                    contentType: "application/json",
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader("Authorization", "Bearer " + getCookie("accesstoken"))
                    },
                    success: function(data) {
                        clearInterval(countInterval)
                        if(data.success) {
                            $("#result").text("Success! Found driver " + data.data.driverName);
                        } else {
                            $.ajax({
                                type: "PUT",
                                url: "http://localhost:8000/api/request/delete/" + myRequest._id,
                                data: {},
                                dataType: "json",
                                contentType: "application/json",
                                beforeSend: function(xhr) {
                                    xhr.setRequestHeader("Authorization", "Bearer " + getCookie("accesstoken"))
                                },
                                success: function() {
                                    console.log("cancel request successful!")
                                }

                            })
                            $("form").fadeIn(500);
                            $(".wrapper").removeClass("form-success");
                            $("#result").text("Booking")
                        }
                    }
                })
            }

        },
        error: function(jqXhr) {
            console.log(jqXhr);
        }
    })
});

function check_Form()
{
    if( $('#clientName').val() == "" ) 
    {
        alert("Must not be empty <Full Name>.\nKhông được để trống <Họ và Tên>. ");
        return false;
    }
    if( $('#address').val() == "" ) 
    {
        alert("Must not be empty <Address>.\nKhông được để trống <Địa Chỉ Đón>. ");
        return false;
    }
    if( $('#phone').val() == "" ) 
    {
        alert("Must not be empty <Phone Number>.\nKhông được để trống <Số Điện Thoại>. ");
        return false;
    }
    else
    {
        var phone = $('#phone').val();
        for (i = 0; i < phone.length; i++)
        {
            if (phone[i] == ' ')
            {
                alert("<Phone Number> Do not enter spaces.\n<Số Điện Thoại> Không nhập dấu cách. ");
                return false;
            }
            if (phone[i] < '0' || phone[i] > '9')
            {
                alert("<Phone Number> Input value is wrong.\n<Số Điện Thoại> Không hợp lệ. ");
                return false;
            }
        }
        if (phone.length < 9 || phone.length > 12)
        {
            alert("<Phone Number> Input value is wrong.\n<Số Điện Thoại> Không hợp lệ. ");
            return false;
        }
    }
    return true;
}

$("#VI_language-button").click(function(event)
{
    event.preventDefault();
    lang = 0;
    $(".container #msg").text("Xin Chào");

    $(".container h1").text("Xin Chào");
    
    $("#name").attr("placeholder", "Họ và Tên");
    $("#address").attr("placeholder", "Địa Chỉ Đón");
    $("#phone").attr("placeholder", "Số Điện Thoại");
    $("#note").attr("placeholder", "Ghi Chú");
    $("#find-button").text("Tìm Xe");
});

$("#EN_language-button").click(function(event)
{
    event.preventDefault();
    lang = 1;
    $(".container #msg").text("Welcome");


    $(".container h1").text("Welcome");

    $("#name").attr("placeholder", "Full Name");
    $("#address").attr("placeholder", "Address");
    $("#phone").attr("placeholder", "Phone Number");
    $("#note").attr("placeholder", "Note");
    $("#find-button").text("Find");
});

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
    setCookie(name, "", -1);
}