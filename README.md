# Weather-Journal App Project

## Overview
This project creates a Travel App with weather forecast or prediction for the time of the travel

The main purpose is to demonstrade the ability to use webpack, web design and APIs. The APIs used here is complexly connected: 
- 1: visitor input the name of the city and travel date 
- 2: app passes data to server to fetch GeoNames API for city latitude and longtitude. 
- 3: Server pass ity latitude and longtitude to Dark SKY API for weather details.
- 4: Server fetch an image about the city from Pixabay and send it back to app.
- 5: visitor see the result of the city weather, depends on the travel date it provides 2 modes of weather: prediction of the travel date further away from now; and forecase of the travel date within a week.


## Extras
* Pull in an image for the country from Pixabay API when the entered location brings up no results (good for obscure localities).
* Allow the user to remove the trip.
