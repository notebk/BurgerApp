var $new = $("#newIngredient");
/* var $list = $("#displayCats");
var $kill = $("#killCat");
var $color = $("#colorSubmit");
var $write = $("#colorWrite");
*/
// var onSuccess = function(data, status) {
//    $("#result").load("/ingredients");
//};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$new.on("submit",function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    var name = $new.find("[name='name']").val();
    var price = $new.find("[name='price']").val();
    $.post("ingredients/add", {
        name: name,
        price: price
    })
     .done(function(data) {
         console.log('success', data);
     })
     .error(onError);
    $("#result").load("/ingredients #list");
});

/* $list.on("click", function(event) {
    event.stopImmediatePropagation();
    $.get("cats")
     .done(onSuccess)
     .error(onError);
});

$kill.on("click", function(event) {
    event.stopImmediatePropagation();
    $.get("cats/delete/old")
    $.get("cats")
     .done(onSuccess)
     .error(onError);
});

$color.on("click", function(event) {
    event.stopImmediatePropagation();
    var color = $write.val();
    $.get("/cats/bycolor/" + color)
     .done(onSuccess)
     .error(onError);
});
*/

