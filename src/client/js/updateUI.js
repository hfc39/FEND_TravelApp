export const updateUI = async (dataSet,url) => {
    console.log('CP 2__ UPDATE UI')
    console.log(dataSet[dataSet.length-1].cityImage)
    const request = await fetch ('/all')
    try{
        const uiData = await request.json()
        console.log(uiData);
        console.log('updateUI working')
        document.getElementById('head').innerHTML =`<h2>Weather Forecaset for Your Trip:<hr></h2><h1>${uiData[uiData.length-1].city.toUpperCase()} on ${document.getElementById("date").value}:</h1>`;
        document.getElementById('body').innerHTML = `<div id="light'> The weather forcase is: <br>Summary: ${uiData[uiData.length-1].tempHigh}<br>Temperature: ${uiData[uiData.length-1].tempHigh} ~ ${uiData[uiData.length-1].tempLow}<br> Humidity: ${uiData[uiData.length-1].humidity}%<br>UV Index: ${uiData[uiData.length-1].uvIndex}.<br><br><button onClick="window.location.reload();" style="font-size:15px">Remove the Trip or Start a New Trip</button></div>`
        const img = document.getElementById('left')
        const it = img.firstChild
        it.className = "new"
        if (dataSet[dataSet.length-1].cityImage == 'error'){
            it.src= '.././media/oops.jpg'          
        } else {
            it.src= uiData[uiData.length-1].cityImage
        }
    }catch (error){
        console.log('UpdateUI error'+ error);
    };
};
