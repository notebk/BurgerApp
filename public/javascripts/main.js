var $new = $("#newIngredient");
var $edit = $("#editIngredient");
var $order = $("#order");
var $complete = $(".completed");


var onError = function (data, status) {
    console.log("status", status);
    console.log("error", data);
};

$new.on("submit", function (event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    var name = $new.find("[name='name']").val();
    var price = $new.find("[name='price']").val();
    $.post("ingredients/add", {
        name: name,
        price: price
    })
        .done($("#result").load("/ingredients #list"))
        .error(onError);


});

$edit.on("submit", function (event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    var name = $edit.find("[name='name']").val();
    var price = $edit.find("[name='price']").val();
    var stock = $edit.find("input[name='inStock']:checked").val();
    $.post("ingredients/edit", {
        name: name,
        price: price,
        inStock: stock
    })
        .done($("#result").load("/ingredients #list"))
        .error(onError);
});

$(document).ready(function () {
    var sum = 0;
    $("#cost").html(0);
    function recalculate() {
        var sum = 0;

        $("input[type=checkbox]:checked").each(function () {
            sum += parseFloat($(this).attr("value"));
        });

        $("#cost").html(sum);
    }

    $("input[type=checkbox]").change(function () {
        recalculate();
    });
});

$order.on("submit", function (event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    var customer = $order.find("[name='customer']").val();
    var ingredients = [];
    $("input:checkbox[id='orderIng']:checked").each(function(){
    ingredients.push($(this).attr('name'));
    });
    $.post("order/new", {
        customer: customer,
        ingredients: ingredients,
    })
        .done($("#result").html("All set!"))
        .error(onError);
});
//$(document).ready(function(){
$("#result").on("click",".completed",function (event) {
 //   event.stopImmediatePropagation();
     var customer = $(this).attr("value");
    $.post("kitchen/delete", {customer: customer})
        .done($("#result").load("/kitchen #list"))
        .error(onError);
});
//});