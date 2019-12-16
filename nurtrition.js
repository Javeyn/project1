var submit = $("#submit");
var food = $("#foodName");



submit.click(function(event) {
    event.preventDefault();
    foodItem()
});


function foodItem() {
    event.preventDefault();
    var item = food.val().toLowerCase();

    console.log(item)
    var queryURL = "https://trackapi.nutritionix.com/v2/search/instant?query="
    queryURL += item;
    console.log(queryURL);


    $.ajax({
        url: queryURL,
        method: "GET",
        headers: { "x-app-id": "651c4545", "x-app-key": "fdadf3d16015323a2a722196f4e33e2c" },
    }).then(function(response) {
        console.log(response);
        console.log(response.common[0].food_name);
        return response.common[0].food_name;
    }).then(function(foodName) {
        console.log(foodName)
        $.ajax({
            url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
            method: "POST",
            data: {
                query: foodName
            },
            headers: {
                "x-app-id": "651c4545",
                "x-app-key": "fdadf3d16015323a2a722196f4e33e2c",
                "x-remote-user-id": "0"
            }
        }).then(function(response) {
            console.log(response);
            console.log(post)
        })

    })
}