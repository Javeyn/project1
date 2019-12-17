// var submit = $("#submit");
// var food = $("#foodName");



// submit.click(function(event) {
//     event.preventDefault();
//     foodItem()
// });



// Array for the option of food
var foods = ["Banana", "Apple", "Orange", "Peach"];

//function to create buttons from the food items
function renderButtons() {


    $(".buttons").empty();

    for (var i = 0; i < foods.length; i++) {

        var a = $("<a>");
        a.addClass("foodItem waves-effect waves-light btn-small");
        a.attr("data-name", foods[i]);
        a.text(foods[i]);
        $(".buttons").append(a);
    }
}

// Click function to render the nutrtition facts
$(document).on("click", ".foodItem", foodItem);




//function to obtain nutrition facts and append it on to the page
function foodItem() {
    event.preventDefault();
    var item = $(this).attr("data-name");

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
            var calories = response.foods[0].nf_calories.toFixed(0);
            var fat = response.foods[0].nf_total_fat.toFixed(0);
            var calfat = (9 * response.foods[0].nf_total_fat).toFixed(0);
            var fatpercent = ((response.foods[0].nf_total_fat / 65) * 100).toFixed(0);
            var satfat = response.foods[0].nf_saturated_fat.toFixed(1);
            var transfat = response.foods[0].full_nutrients[53].value.toFixed(1);
            var cholesterol = response.foods[0].nf_cholesterol.toFixed(0);
            var cholesterolpercent = ((response.foods[0].nf_calories / 3000) * 100).toFixed(0);
            var sodium = response.foods[0].nf_sodium.toFixed(0);
            var sodiumpercent = ((response.foods[0].nf_sodium.toFixed(0) / 2400) * 100).toFixed(0);
            var totalcarbs = response.foods[0].nf_total_carbohydrate.toFixed(0)
            var carbpercent = ((response.foods[0].nf_total_carbohydrate / 300) * 100).toFixed(0);
            var fiber = response.foods[0].nf_dietary_fiber.toFixed(0);
            var fiberpercent = ((response.foods[0].nf_dietary_fiber / 25) * 100).toFixed(0);
            var sugar = response.foods[0].nf_sugars.toFixed(1);
            var protein = response.foods[0].nf_protein.toFixed(1);
            var potassium = ((response.foods[0].nf_potassium / 3500) * 100).toFixed(0);
            var vitd = response.foods[0].full_nutrients[35].value.toFixed(1);
            var vita = ((response.foods[0].full_nutrients[30].value / 5000) * 100).toFixed(1);
            var vitc = ((response.foods[0].full_nutrients[40].value / 60) * 100).toFixed(1);
            var calcium = ((response.foods[0].full_nutrients[19].value / 1300) * 100).toFixed(1);
            var iron = ((response.foods[0].full_nutrients[20].value / 18) * 100).toFixed(1);
            var serving = response.foods[0].serving_qty + " " + response.foods[0].serving_unit + " (" + response.foods[0].serving_weight_grams + "g)";
            $("#calories").text(calories);
            $("#servingSize").text(serving);
            $("#fat").text("Total Fat " + fat + "g");
            $("#fatPercent").text(fatpercent + "%");
            $("#satFat").text("Saturated Fat " + satfat + "g");
            $("#transfat").text("Trans Fat " + transfat + "g");
            $("#cholesterol").text("Cholesterol " + cholesterol + "mg");
            $("#cholesterolpercent").text(cholesterolpercent + "%");
            $("#sodium").text("Sodium " + sodium + "mg")
            $("#sodiumpercent").text(sodiumpercent + "%");
            $("#carbs").text("Total Carbohydrate " + totalcarbs + "g");
            $("#carbspercent").text(carbpercent + "%");
            $("#fiber").text("Dietary Fiber " + fiber + "g");
            $("#fiberpercent").text(fiberpercent + "%");
            $("#sugar").text("Total Sugars " + sugar + "g");
            $("#protien").text("Protein " + protein + "g")
            $("#vita").text(vita + "%");
            $("#calcium").text(calcium + "%");
            $("#potassium").text(potassium + "%");
            $("#iron").text(iron + "%");
        })

    })
}

renderButtons();