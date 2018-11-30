//var myVar = setInterval(requestFileJSON, 3000);
var myVar;
var dataRequest = {};
var dataDriver = {};
myVar = setInterval(requestFileJSON, 3000); // Get File JSON

$(document).ready(function(){
    setCookie("accesstoken","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmU1NWViYWU4MGRhYzE0MmViZWNkN2IiLCJlbWFpbCI6InRhaXhlMkBnbWFpbC5jb20iLCJuYW1lIjoidGFpeGUgMiIsImFkZHJlc3MiOiI1NDMgc2ZhcywgUDMsIFEuMTAiLCJwaG9uZSI6IjAxMjM0NTYiLCJfX3YiOjAsImxvbmciOjEwNi42ODQwOTI4LCJsYXQiOjEwLjc1OTM0NzksInN0YXR1cyI6dHJ1ZSwiYWN0aXZlIjp0cnVlLCJyb2xlcyI6ImRyaXZlciIsInNleCI6Im1hbGUiLCJpYXQiOjE1NDM0MTk5NzYsImV4cCI6MTU0MzQyMzU3Nn0.I7pXanNRhEHm9ul44w6CHGdlvKkyWVNL5-bJJHk05PE",1);
    setCookie("refreshtoken","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjViZTU1ZWJhZTgwZGFjMTQyZWJlY2Q3YiIsImVtYWlsIjoidGFpeGUyQGdtYWlsLmNvbSIsIm5hbWUiOiJ0YWl4ZSAyIiwiYWRkcmVzcyI6IjU0MyBzZmFzLCBQMywgUS4xMCIsInBob25lIjoiMDEyMzQ1NiIsIl9fdiI6MCwibG9uZyI6MTA2LjY4NDA5MjgsImxhdCI6MTAuNzU5MzQ3OSwic3RhdHVzIjp0cnVlLCJhY3RpdmUiOnRydWUsInJvbGVzIjoiZHJpdmVyIiwic2V4IjoibWFsZSJ9LCJydCI6dHJ1ZSwiaWF0IjoxNTQzNDE5OTc2LCJleHAiOjE1NDQwMjQ3NzZ9.b_MAWXpSEPPBMYPOGm_qVJ_EdaaAT9-dFpI4kg_PMJA",7);
    /*
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
    */
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
    //alert("hello[]");

    $.getJSON("grab-db-users.json", function(json) {
        //console.log(json); // this will show the info it in firebug console
        items=[];  
        for(i in json)
        {
            var arrayDataJson = json[i];
            for (j in arrayDataJson)
            {
                var arrayTagDataJson = arrayDataJson[j];
                item_temp=[]; // Chứa một nhóm td thuộc tr
                for (k in arrayTagDataJson)
                {
                    var key = k;
                    var val = arrayTagDataJson[k];
                    if(key === "_id")
                    {
                        for (l in arrayTagDataJson[k])
                        {
                            key = l;
                            val = arrayTagDataJson[k][l];
                            item_temp.push('<td id = "' + key + '">' + val + '</td>');
                        }
                    }
                    if (key === "name" 
                    || key === "phone" || key === "status" || key === "active")
                    {
                        item_temp.push('<td id = "' + key + '">' + val + '</td>');
                    }  
                }
                var sum = '<tr>';
                for (count_item_temp in item_temp)
                {
                    sum = sum + item_temp[count_item_temp];
                }
                sum = sum + '</tr>';
                items.push(sum);
                $("#driver_tbody").append(sum);
            }
        }
        //console.log(items);
    });

    $.getJSON("grab-db-request.json", function(json) {
        //console.log(json); // this will show the info it in firebug console
        items=[];  
        for(i in json)
        {
            var arrayDataJson = json[i];
            for (j in arrayDataJson)
            {
                var arrayTagDataJson = arrayDataJson[j];
                item_temp=[]; // Chứa một nhóm td thuộc tr
                for (k in arrayTagDataJson)
                {
                    var key = k;
                    var val = arrayTagDataJson[k];
                    if(key === "_id" || key === "updatedAt" 
                    || key === "createdAt")
                    {
                        for (l in arrayTagDataJson[k])
                        {
                            if (key === "_id")
                            {
                                key = l;
                                val = arrayTagDataJson[k][l];
                                item_temp.push('<td id = "' + key + '">' + val + '</td>');
                            }
                            else
                            {
                                key = l;
                                val = arrayTagDataJson[k][l];
                            }

                        }
                    }
                    if (key === "clientName" || key === "address" 
                    || key === "driverName" || key === "phone" || key === "state" )
                    {
                        item_temp.push('<td id = "' + key + '">' + val + '</td>');
                    }  
                }
                var sum = '<tr>';
                for (count_item_temp in item_temp)
                {
                    sum = sum + item_temp[count_item_temp];
                }
                sum = sum + '</tr>';
                items.push(sum);
                $("#request_tbody").append(sum);
            }
        }
        //console.log(items);

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

    //demo lấy dữ liệu từ api
    // $.ajax({
    //     type: "GET",
    //     url: "http://localhost:8000/api/request",
    //     dataType: "json",
    //     data: {},
    //     beforeSend: function(xhr) {
    //         xhr.setRequestHeader("Authorization", "Bearer " + getCookie("accesstoken"))
    //     },
    //     success: function(data, status) {
    //         console.log(data)
    //         console.log(status)
    //     },
    // })
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
function requestFileJSON()
{
    $.ajax({
        type: "GET",
        url: "http://localhost:8000/api/request",
        data: {},
        dataType: "json",
        success: function(data, status) {
            alert(data);

            dataRequest = data;
            alert(dataRequest);
        },
        error: function(jqXhr) {
            alert(JSON.stringify(jqXhr));
            alert("Error! Can't read driver.json");
        }
    });
    $.ajax({
        type: "GET",
        url: "http://localhost:8000/api/user/driver",
        data: {},
        dataType: "json",
        success: function(data, status) {
            alert(data);

            dataDriver = data;
            alert(dataDriver);
        },
        error: function(jqXhr) {
            alert(JSON.stringify(jqXhr));
            alert("Error! Can't read driver.json");
        }
    });
}

function myStopFunction() {
    clearInterval(myVar);
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