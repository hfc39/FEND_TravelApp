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
    await getGeo();
    console.log('CP 2__PRINT PROJECT DATA')   
    console.log(projectData)
    await darkSky();
    console.log('CP 4__PRINT PROJECT DATA')   
    console.log(projectData)
    await pixaBay();
    console.log('CP 6__PRINT PROJECT DATA')   
    console.log(projectData)
    res.send(projectData)
}

const getGeo = async () =>{ 
    const res = await fetch(`http://api.geonames.org/postalCodeSearchJSON?placename=${projectData[0].city}&username=carmen39&maxRows=1`);
    try {
    const allData = await res.json()
    console.log('CP 1__GET GEONAME')    
    //console.log(allData)
    projectData[0].lat = allData.postalCodes[0].lat;
    projectData[0].lng = allData.postalCodes[0].lng;
    return allData
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
}

const darkSky = async () =>{
    console.log('CP 3__getDarkSky starts')
    console.log(`https://api.darksky.net/forecast/5461f90b8cb3ab62a2d2d8b7929a5e64/${projectData[0].lat},${projectData[0].lng},${projectData[0].travelDate}?units=si&exclude=hourly,flags,currently`)
    const res = await fetch(`https://api.darksky.net/forecast/5461f90b8cb3ab62a2d2d8b7929a5e64/${projectData[0].lat},${projectData[0].lng},${projectData[0].travelDate}?units=si&exclude=hourly,flags,currently`, {mode: 'no-cors'})
    try {
    const allData = await res.json()
    console.log(JSON.stringify(allData))
    projectData[0].tempHigh = allData.daily.data[0].temperatureHigh;
    projectData[0].tempLow = allData.daily.data[0].temperatureLow;
    projectData[0].humidity = allData.daily.data[0].humidity;
    projectData[0].uvIndex = allData.daily.data[0].uvIndex;
    return allData
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
}

 async function pixaBay() {
     const res = await fetch(`https://pixabay.com/api/?key=15724973-ef055a8d189206d736e1a60dd&image_type=photo&orientatin=horizontal&q=${projectData[0].city}`)
    try {
        const data = await res.json()
        projectData[0].cityImage = data.hits[0].pageURL;
        console.log('CP 5___PIXAPI DONE')
        return data
         } catch (error){
            console.log("error", error);
            // appropriately handle the error
          }
 }

app.get('/all', sendData);
function sendData (req, res) {
    res.send(projectData);
    console.log(projectData);
};