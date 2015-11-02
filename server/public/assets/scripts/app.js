
var values = {};

$(document).ready(function(){
    $('#search').submit(function(event){
        event.preventDefault();


        $.each($(this).serializeArray(), function(i, field){
            values[field.name] = field.value;
        });
        serverCall();
    });
});

function serverCall(){
    $.ajax({
        type: "GET",
        url: "/data",
        data: values,
        success: function (data) {
            appendToDom(data);
        }
    });
}

function appendToDom(personArray){
    $('#returnData').empty();
    for(var i = 0; i < personArray.length; i++) {
        var $el = ("<p>Name: " + personArray[i].name + " Spirit Animal: " + personArray[i]['Spirit Animal'] + "</p>");
        $('#returnData').append($el);
        //$("#returnData").children().animate({
        //    opacity : 0
        //},2000);
    }
}