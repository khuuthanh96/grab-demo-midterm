var myVar = setInterval(requestFileJSON, 3000);
var dataRequest = {};
var dataDriver = {};
var runRequestFileJSON = "false";
setCookie("accesstoken","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmU1NWViYWU4MGRhYzE0MmViZWNkN2IiLCJlbWFpbCI6InRhaXhlMkBnbWFpbC5jb20iLCJuYW1lIjoidGFpeGUgMiIsImFkZHJlc3MiOiI1NDMgc2ZhcywgUDMsIFEuMTAiLCJwaG9uZSI6IjAxMjM0NTYiLCJfX3YiOjAsImxvbmciOjEwNi42ODQwOTI4LCJsYXQiOjEwLjc1OTM0NzksInN0YXR1cyI6dHJ1ZSwiYWN0aXZlIjp0cnVlLCJyb2xlcyI6ImRyaXZlciIsInNleCI6Im1hbGUiLCJpYXQiOjE1NDM0MTk5NzYsImV4cCI6MTU0MzQyMzU3Nn0.I7pXanNRhEHm9ul44w6CHGdlvKkyWVNL5-bJJHk05PE",1);
setCookie("refreshtoken","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjViZTU1ZWJhZTgwZGFjMTQyZWJlY2Q3YiIsImVtYWlsIjoidGFpeGUyQGdtYWlsLmNvbSIsIm5hbWUiOiJ0YWl4ZSAyIiwiYWRkcmVzcyI6IjU0MyBzZmFzLCBQMywgUS4xMCIsInBob25lIjoiMDEyMzQ1NiIsIl9fdiI6MCwibG9uZyI6MTA2LjY4NDA5MjgsImxhdCI6MTAuNzU5MzQ3OSwic3RhdHVzIjp0cnVlLCJhY3RpdmUiOnRydWUsInJvbGVzIjoiZHJpdmVyIiwic2V4IjoibWFsZSJ9LCJydCI6dHJ1ZSwiaWF0IjoxNTQzNDE5OTc2LCJleHAiOjE1NDQwMjQ3NzZ9.b_MAWXpSEPPBMYPOGm_qVJ_EdaaAT9-dFpI4kg_PMJA",7);
var STATE = {
    0: "Chưa Định Vị",
    1: "Đã Định Vị",
    2: "Xe Nhận",
    3: "Đang Di Chuyển",
    4: "Hoàn Thành",
    5: "Khách Hủy",
    6: "Tài Xế Hủy",
    7: "Không phản hồi"
}
$(document).ready(function(){
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
        $.ajax({
            type: "PUT",
            url: "http://localhost:8000/api/user/logout",
            data: {},
            dataType: "json",
            contentType: "application/json",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + getCookie("accesstoken"))
            },
            success: function(data, status) {
                $(".container_signin").removeClass("none");
                $(".screenWelcome").removeClass("none");
                setCookie("success", JSON.stringify(data.success), 7);
                setCookie("message", data.message, 7);

                runRequestFileJSON = "false";
            },
            error: function(jqXhr) {
                console.log(JSON.stringify(jqXhr));
                alert("Don't Sign Up! Sorry!");
            }
        })
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
                setCookie("user", JSON.stringify(data.user), 7);

                runRequestFileJSON = "true";
                alert("The server sends the request every 3 seconds.")
                $(".username").text($("#name").val());
                
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
    /*
    $.getJSON("grab-db-users.json", function(json) {
        //console.log(json); // this will show the info it in firebug console
        
        //console.log(items);
    });

    $.getJSON("grab-db-request.json", function(json) {
        //console.log(json); // this will show the info it in firebug console
        
        //console.log(items);

    });
    */
});

$("#VI_language-button").click(function(event)
{
    event.preventDefault();
    $(".driver_form h1").text("Tài Xế");
    $(".request_form h1").text("Yêu Cầu");

    $(".driver_form tr th:nth-child(1)").text("Mã Số");
    $(".driver_form tr th:nth-child(2)").text("Tên");
    $(".driver_form tr th:nth-child(3)").text("Số Điện Thoại");
    $(".driver_form tr th:nth-child(4)").text("Trạng Thái");
    $(".driver_form tr th:nth-child(5)").text("Hoạt Động");

    $(".request_form tr th:nth-child(1)").text("Mã Số");
    $(".request_form tr th:nth-child(2)").text("Tên Khách Hàng");
    $(".request_form tr th:nth-child(3)").text("Địa Chỉ");
    $(".request_form tr th:nth-child(4)").text("SĐT Khách Hàng");
    $(".request_form tr th:nth-child(5)").text("Trạng Thái");
    $(".request_form tr th:nth-child(6)").text("Tên Tài Xế");
});

$("#EN_language-button").click(function(event)
{
    event.preventDefault();
    $(".driver_form h1").text("Driver");
    $(".request_form h1").text("Request");

    $(".driver_form tr th:nth-child(1)").text("ID");
    $(".driver_form tr th:nth-child(2)").text("Name");
    $(".driver_form tr th:nth-child(3)").text("Phone");
    $(".driver_form tr th:nth-child(4)").text("Status");
    $(".driver_form tr th:nth-child(5)").text("Active");

    $(".request_form tr th:nth-child(1)").text("ID");
    $(".request_form tr th:nth-child(2)").text("Client Name");
    $(".request_form tr th:nth-child(3)").text("Address");
    $(".request_form tr th:nth-child(4)").text("Client Phone");
    $(".request_form tr th:nth-child(5)").text("State");
    $(".request_form tr th:nth-child(6)").text("Driver Name");
});
function requestFileJSON()
{
    if (runRequestFileJSON === "true")
    {
        $.ajax({
            type: "GET",
            url: "http://localhost:8000/api/request",
            data: {},
            dataType: "json",
            contentType: "application/json",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + getCookie("accesstoken"))
            },
            success: function(data, status) {
                if(data.success) {
                    dataRequest = data.data;
                    items=[];  
                    sort_temp=[]; // Chứa thời gian để sort
                    $('<tbody id="request_tbody"></tbody>').replaceAll("#request_tbody");
                    dataRequest.sort(function(a, b) {
                        return Number(b.createdAt) - Number(a.createdAt);
                    });
                    for(i in dataRequest)
                    {
                        var arrayDataJson = dataRequest[i];
                        item_temp=[]; // Chứa một nhóm td thuộc tr
                        var checkDriverName = false;
                        for (j in arrayDataJson)
                        {
                            if (j === "_id" || j === "clientName" 
                            || j === "address" || j === "phone")
                            {
                                item_temp.push('<td id = "' + j + '">' + arrayDataJson[j] + '</td>');
                            } 
                            if (j === "state") 
                            {
                                item_temp.push('<td id = "' + j + '">' + STATE[arrayDataJson[j]] + '</td>');
                            }
                            if (j === "driverName")
                            {
                                checkDriverName = true;
                                item_temp.push('<td id = "' + j + '">' + arrayDataJson[j] + '</td>');
                            }
                            if (j === "createdAt")
                            {

                                var d = new Date(arrayDataJson[j]);
                                var n = Math.ceil(d.getTime() / 1000);

                                sort_temp.push(n)
                            }
                        }
                        if (checkDriverName === false)
                        {
                            item_temp.push('<td id = "' + 'driverName' + '">' + '</td>');
                        }

                        var sum = '<tr>';
                        for (count_item_temp in item_temp)
                        {
                            sum = sum + item_temp[count_item_temp];
                        }
                        sum = sum + '</tr>';
                        items.push(sum);
                    }
                    //console.log("th", sort_temp);
                    // Sắp xếp data request theo thời gian giảm dần
                    var index;
                    var temp;
                    var i;
                    for (i = 0; i < sort_temp.length; i++)
                    {
                        index = i;
                        for (j = i; j < sort_temp.length; j++)
                        {
                            if (sort_temp[j] > sort_temp[index])
                            {
                                index = j;
                            }
                        }
                        temp = sort_temp[index];
                        sort_temp[index] = sort_temp[i];
                        sort_temp[i] = temp;
                        temp = items[index];
                        items[index] = items[i];
                        items[i] = temp;
                    }
                    // Thực hiện jQuery DOM để fill dữ liệu vào html
                    for (i in items)
                    {
                        $("#request_tbody").append(items[i]);
                    }
                    //console.log("kh", sort_temp);
                }
            },
            error: function(jqXhr) {
                console.log(JSON.stringify(jqXhr));
                console.log("Error! Can't read request.json");
            }
        });
        $.ajax({
            type: "GET",
            url: "http://localhost:8000/api/user/driver",
            data: {},
            dataType: "json",
            contentType: "application/json",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + getCookie("accesstoken"))
            },
            success: function(data, status) {
                if(data.success) {
                    dataDriver = data.data;
                    // console.log(dataDriver);
                    items=[];  
                    $('<tbody id="driver_tbody"></tbody>').replaceAll("#driver_tbody");
                    for(i in dataDriver)
                    {
                        var arrayDataJson = dataDriver[i];
                        item_temp=[]; // Chứa một nhóm td thuộc tr
                        for (j in arrayDataJson)
                        {
                            if (j === "_id" || j === "name" || j === "phone" 
                            || j === "status" || j === "active")
                            {
                                item_temp.push('<td id = "' + j + '">' + arrayDataJson[j] + '</td>');
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
            },
            error: function(jqXhr) {
                console.log(JSON.stringify(jqXhr));
                console.log("Error! Can't read driver.json");
            }
        });
    }
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