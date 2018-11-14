var lang = 1;

$("#find-button").click(function(event)
{
	event.preventDefault();
	 
	$("form").fadeOut(500);
    $(".wrapper").addClass("form-success");

    var timer = 0;

    var socket = io("http://localhost:8000");

    socket.on('connect', function() {
        if (lang == 0) $("#msg").text("Đang tìm...");
        else $("#msg").text("Finding...");
        
        socket.emit('newRequest', {
            client: $("#name").val(),
            address: $('#address').val(),
            phone: $('#phone').val(),
            note: $('#note').val()
        })

        var myTimer = setInterval(function() {
            timer += 1;
            if(timer == 5) {
                clearInterval(myTimer);
                timer = 0;

                if(lang == 0 ) $("#msg").text("Xin Chào")
                else $("#msg").text("Welcome")
            
                $("form").fadeIn(500);
                $(".wrapper").removeClass("form-success");

                socket.emit('end');
            }
        }, 1000);

        socket.on('foundDriver', function(data){
            clearInterval(myTimer);
            timer = 0;

            
        });

        socket.on('error', function(data){
            console.log(data);
        })
    });
});

$("#VI_language-button").click(function(event)
{
    event.preventDefault();
    lang = 0;
    $(".container #msg").text("Xin Chào");

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

    $("#name").attr("placeholder", "Full Name");
    $("#address").attr("placeholder", "Address");
    $("#phone").attr("placeholder", "Phone Number");
    $("#note").attr("placeholder", "Note");
    $("#find-button").text("Find");
});

