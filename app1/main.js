$("#find-button").click(function(event)
{
	event.preventDefault();
	 
	$("form").fadeOut(500);
	$(".wrapper").addClass("form-success");
});

$("#VI_language-button").click(function(event)
{
    event.preventDefault();

    $(".container h1").text("Xin Chào");

    $("#name_us").attr("placeholder", "Họ và Tên");
    $("#address_us").attr("placeholder", "Địa Chỉ Đón");
    $("#phone_us").attr("placeholder", "Số Điện Thoại");
    $("#note_us").attr("placeholder", "Ghi Chú");
    $("#find-button").text("Tìm Xe");
});

$("#EN_language-button").click(function(event)
{
    event.preventDefault();

    $(".container h1").text("Welcome");

    $("#name_us").attr("placeholder", "Full Name");
    $("#address_us").attr("placeholder", "Address");
    $("#phone_us").attr("placeholder", "Phone Number");
    $("#note_us").attr("placeholder", "Note");
    $("#find-button").text("Find");
});