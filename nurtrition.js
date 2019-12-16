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
            var calories = response.foods[0].nf_calories;
            var calfat = (9 * response.foods[0].nf_total_fat);
            var fatpercent = ((response.foods[0].nf_total_fat / 65) * 100);
            var satfat = response.foods[0].nf_saturated_fat;
            var transfat = response.foods[0].full_nutrients[53].value;
            var cholesterol = response.foods[0].nf_cholesterol;
            var cholesterolpercent = ((response.foods[0].nf_calories / 300) * 100);
            var sodium = response.foods[0].nf_sodium;
            var totalcarbs = response.foods[0].nf_total_carbohydrate
            var carbpercent = ((response.foods[0].nf_total_carbohydrate / 300) * 100);
            var fiber = response.foods[0].nf_dietary_fiber;
            var sugar = response.foods[0].nf_sugars;
            var protein = response.foods[0].nf_protein;
            var potassium = response.foods[0].nf_potassium;
            var vita = ((response.foods[0].full_nutrients[30].value) / 5000) * 100;
            var vitc = ((response.foods[0].full_nutrients[40].value) / 60) * 100;
            var calcium = ((response.foods[0].full_nutrients[19].value) / 1300) * 100;
            var iron = ((response.foods[0].full_nutrients[20].value) / 18) * 100;
        })

    })
}