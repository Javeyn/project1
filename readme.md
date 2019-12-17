# Ate-i

## A Machine Learning Project
### Created by Henry Lin, Paolo Torrado, and Jack Sorensen

## Ate-i

Ate-i is an application developed to enhance people's ability to understand the nutritional information
of a serving of food, on the go, at any time. All you need to do is take a photo of any food item, and upload it to Ate-i. Ate-i will then return results of what it has identified your food item as, and upon selecting the correct item, it will give you the nutritional information of the food your snapped a photo of!

## Why use Ate-i?

The high speed world we live in doesn't always cater to our nutritional health needs, and when we are busy, sometimes we will take a shortcut in our nutrition. We will grab that item that looks tasty, and we will eat it without much idea of what is inside. 

With Ate-i, you can upload a photo of the food item you are curious about, and within seconds it will provide you with approximate nutritional information. Obviously recipes and ingredients may differ from item to item, but using Ate-i will bring awareness to what you are eating, and helping you make an informed decision about what you are deciding to eat.

## How does Ate-i work?

Ate-i uses a couple different APIs as well as google hosting and Python to make the magic happen. The first API that is called is called <a href="https://www.clarifai.com">Clarifai</a>. Clarifai Inc. is an artificial intelligence company that specializes in computer vision and uses machine learning and deep neural networks to identify and analyze images and videos, and their API does just that. It takes your image, and it figures out what it is. For this project, we use one of the models they have available used specifically for food. Once you have uploaded your image, Clarifai tells Ate-i the top 5 predicted objects and it presents you with a choice of those options.

Once you have made your selection, Ate-i will take your choice, and then it uses a 2nd API called <a href="https://www.Nutritionix.com">Nutritionix</a>. Nutritionix takes your selected food item, and then spits out nutritional information for a single serving of that item. 

All of this is orchestrated through Python and Flask. They act as the bridges between all the seperate functions of our website. Without Python and Flask, this application would not function as we have designed it.

### Developer Links

To see our current projects and projects in development:

<a href="https://github.com/linhs22">Henry Lin</a>

<a href="https://github.com/patorrad">Paolo Torrado</a> 

<a href="https://github.com/Javeyn">Jack Sorensen</a>




