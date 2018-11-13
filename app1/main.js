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
    });
    var check = check_Form();
    if (check == false)
    {
        $("form").fadeIn(500);
        $(".wrapper").removeClass("form-success");
    }
});

function check_Form()
{
    if( $('#name').val() == "" ) 
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

