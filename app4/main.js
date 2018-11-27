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
    directionsService.route(
    {    
        origin: document.getElementById('source').value,    
        destination: document.getElementById('destination').value,    
        travelMode: document.getElementById('mode').value,     
    }, function(response, status) 
    {    
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            showSteps(response);
        } else {    
            window.alert('Request for getting direction is failed due to ' + status);    
        }    
    });    
}    