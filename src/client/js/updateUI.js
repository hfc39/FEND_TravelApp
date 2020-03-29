export const updateUI = async (dataSet,url) => {
    console.log('CP 2__ UPDATE UI')
    console.log(dataSet[dataSet.length-1].cityImage)
    const request = await fetch ('/all')
    try{
        const uiData = await request.json()
        console.log(uiData);   
        console.log('updateUI working')
        const img = document.getElementById('left')
        const it = img.firstChild
        it.className = ""
        it.src= uiData[uiData.length-1].cityImage
        document.getElementById('head').innerHTML =`<h2>Weather Forecaset for Your Trip:<hr></h2><h1>${uiData[0].city.toUpperCase()} on ${document.getElementById("date").value}:</h1>`;
        document.getElementById('body').innerHTML = `<p> The weather forcase is: <br>Summary: bha<br>Temperature: ${uiData[0].tempHigh} ~ ${uiData[0].tempLow}<br> Humidity: ${uiData[0].humidity}%<br>UV Index: ${uiData[0].uvIndex}.<br><br><button onClick="window.location.reload();" style="font-size:15px">Remove the Trip or Start a New Trip</button>`

    }catch (error){
        console.log('UpdateUI error'+ error);
    };
};