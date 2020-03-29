const express = require('express');
const fetch = require("node-fetch");
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// Setup Server
const port = 8002;
app.listen(port,() => {
    console.log(`running on localhost: ${port}`);
});

const projectData = []
app.post('/geo', getAllData)

async function getAllData (req, res) {
    let data = {
    city: req.body.city,
    travelDate: req.body.travelDate,
    currentTime: req.body.currentTime
    }
    projectData.push(data)
    let sec = projectData[projectData.length-1].travelDate - projectData[projectData.length-1].currentTime
    //if further than a week, predict
    if (sec >= 604800){
        projectData[projectData.length-1].mode = "predict"
        await getGeo();
        console.log('CP 2__PRINT PROJECT DATA')
        await darkSky();
        console.log('CP 4__PRINT PROJECT DATA')
        await pixaBay();
        console.log('CP 6__PRINT PROJECT DATA')
        res.send(projectData)
        // forecast
    } else {
        projectData[projectData.length-1].mode = "forecast"
        await getGeo();
        console.log('CP 2__PRINT PROJECT DATA')
        await darkSky2();
        console.log('CP 4__PRINT PROJECT DATA')
        await pixaBay();
        console.log('CP 6__PRINT PROJECT DATA')
        res.send(projectData)
    }
}

const getGeo = async () =>{
    const res = await fetch(`http://api.geonames.org/postalCodeSearchJSON?placename=${projectData[projectData.length-1].city}&username=carmen39&maxRows=1`);
    try {
    const allData = await res.json()
    console.log('CP 1__GET GEONAME')
    //console.log(allData)
    projectData[projectData.length-1].lat = allData.postalCodes[0].lat;
    projectData[projectData.length-1].lng = allData.postalCodes[0].lng;
    return allData
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
}

const darkSky = async () =>{
    console.log('CP 3__getDarkSky starts')
    console.log(`https://api.darksky.net/forecast/5461f90b8cb3ab62a2d2d8b7929a5e64/${projectData[projectData.length-1].lat},${projectData[projectData.length-1].lng},${projectData[projectData.length-1].travelDate}?units=si&exclude=hourly,flags,currently`)
    const res = await fetch(`https://api.darksky.net/forecast/5461f90b8cb3ab62a2d2d8b7929a5e64/${projectData[projectData.length-1].lat},${projectData[projectData.length-1].lng},${projectData[projectData.length-1].travelDate}?units=si&exclude=hourly,flags,currently`, {mode: 'no-cors'})
        try {
            const allData = await res.json()
            console.log(JSON.stringify(allData))
            projectData[projectData.length-1].tempHigh = allData.daily.data[0].temperatureHigh;
            projectData[projectData.length-1].tempLow = allData.daily.data[0].temperatureLow;
            projectData[projectData.length-1].humidity = allData.daily.data[0].humidity;
            projectData[projectData.length-1].uvIndex = allData.daily.data[0].uvIndex;
            projectData[projectData.length-1].summary = allData.daily.data[0].summary;
            return allData
        }
        catch(error) {
            console.log("error", error);
        }
    }

    const darkSky2 = async () =>{
        console.log('CP 3__getDarkSky2 starts')
        console.log(`https://api.darksky.net/forecast/5461f90b8cb3ab62a2d2d8b7929a5e64/${projectData[projectData.length-1].lat},${projectData[projectData.length-1].lng}?units=si&exclude=hourly,flags,currently`)
        const res = await fetch(`https://api.darksky.net/forecast/5461f90b8cb3ab62a2d2d8b7929a5e64/${projectData[projectData.length-1].lat},${projectData[projectData.length-1].lng}?units=si&exclude=hourly,flags,currently`, {mode: 'no-cors'})
            try {
                const allData = await res.json()
                projectData[projectData.length-1].weeklysum = allData.daily.summary;
                projectData[projectData.length-1].day1H = allData.daily.data[0].temperatureHigh;
                projectData[projectData.length-1].day1L = allData.daily.data[0].temperatureLow;
                projectData[projectData.length-1].day2H = allData.daily.data[1].temperatureHigh;
                projectData[projectData.length-1].day2L = allData.daily.data[1].temperatureLow;
                projectData[projectData.length-1].day3H = allData.daily.data[2].temperatureHigh;
                projectData[projectData.length-1].day3L = allData.daily.data[2].temperatureLow;
                projectData[projectData.length-1].day4H = allData.daily.data[3].temperatureHigh;
                projectData[projectData.length-1].day4L = allData.daily.data[3].temperatureLow;
                projectData[projectData.length-1].day5H = allData.daily.data[4].temperatureHigh;
                projectData[projectData.length-1].day5L = allData.daily.data[4].temperatureLow;
                projectData[projectData.length-1].day6H = allData.daily.data[5].temperatureHigh;
                projectData[projectData.length-1].day6L = allData.daily.data[5].temperatureLow;
                projectData[projectData.length-1].day7H = allData.daily.data[6].temperatureHigh;
                projectData[projectData.length-1].day7L = allData.daily.data[6].temperatureLow;
                return allData
            }
            catch(error) {
                console.log("error", error);
            }
        }
    



 async function pixaBay() {
     const res = await fetch(`https://pixabay.com/api/?key=15724973-ef055a8d189206d736e1a60dd&image_type=photo&orientatin=horizontal&q=${projectData[projectData.length-1].city}`)
    try {
        const data = await res.json()
        projectData[projectData.length-1].cityImage = data.hits[0].webformatURL;
        console.log('CP 5___PIXAPI DONE at ___'+`https://pixabay.com/api/?key=15724973-ef055a8d189206d736e1a60dd&image_type=photo&orientatin=horizontal&q=${projectData[projectData.length-1].city}`)
        return data
         } catch (error){
            projectData[projectData.length-1].cityImage = "https://pixabay.com/get/57e4d1474355a914f1dc8460c62d307c1136d9e64e507441702b73d79545c3_640.jpg"
            return 'oh no';
            console.log("error", error);
            // appropriately handle the error
          }
 }

app.get('/all', sendData);
function sendData (req, res) {
    res.send(projectData);
    console.log(projectData);
};