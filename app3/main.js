$(document).ready(function(){
    var user = true;
    var driver = false;
    $("a.user").click(function(event){
        event.stopPropagation();
        if (user === false)
        {
            user = true;
            driver = false;
            $("a.user").addClass("active");
            $("a.driver").removeClass("active");
            $(".user_form").addClass("active");
            $(".driver_form").removeClass("active");
        }
    });
    $("a.driver").click(function(event){
        event.stopPropagation();
        if (driver === false)
        {

            driver = true;
            user = false;
            $("a.driver").addClass("active");
            $("a.user").removeClass("active");
            $(".driver_form").addClass("active");
            $(".user_form").removeClass("active");
        }
    });
});
$("#VI_language-button").click(function(event)
{
    event.preventDefault();
    $(".user_form h1").text("Người Dùng");
    $(".driver_form h1").text("Tài Xế");


    $(".user_form tr th:nth-child(1)").text("Người Dùng");
    $(".user_form tr th:nth-child(2)").text("Tài Xế");
    $(".user_form tr th:nth-child(3)").text("Địa Chỉ Đón");
    $(".user_form tr th:nth-child(4)").text("Số Điện Thoại");
    $(".user_form tr th:nth-child(5)").text("Ghi Chú");
});

$("#EN_language-button").click(function(event)
{
    event.preventDefault();
    $(".user_form h1").text("User");
    $(".driver_form h1").text("Driver");


    $(".user_form tr th:nth-child(1)").text("User Name");
    $(".user_form tr th:nth-child(2)").text("Driver Name");
    $(".user_form tr th:nth-child(3)").text("Address");
    $(".user_form tr th:nth-child(4)").text("Phone Number");
    $(".user_form tr th:nth-child(5)").text("Note");
});