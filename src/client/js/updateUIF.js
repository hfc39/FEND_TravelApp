export const updateUIF = async (dataSet,url) => {
    console.log('CP 2__ UPDATE UI')
    console.log(dataSet[dataSet.length-1].cityImage)
    const request = await fetch ('/all')
    try{
        const uiData = await request.json()
        console.log(uiData);
        console.log('updateUI working')

        document.getElementById('head').innerHTML =`<h2>Weather Forecaset for Your Trip:<hr></h2><h1>${uiData[uiData.length-1].city.toUpperCase()} on ${document.getElementById("date").value}:</h1>`;
        document.getElementById('body').innerHTML =`<div><b>Weekly Summary:</b> ${uiData[uiData.length-1].weeklysum}<br><b>Temperature(C): </b><br>Today:${uiData[uiData.length-1].day1H}~${uiData[uiData.length-1].day1L}<br>Tomorrow:${uiData[uiData.length-1].day2H}~${uiData[uiData.length-1].day2L}<br>Day3:${uiData[uiData.length-1].day3H}~${uiData[uiData.length-1].day3L}<br>Day4:${uiData[uiData.length-1].day4H}~${uiData[uiData.length-1].day4L}<br>Day5:${uiData[uiData.length-1].day5H}~${uiData[uiData.length-1].day5L}<br>Day6:${uiData[uiData.length-1].day6H}~${uiData[uiData.length-1].day6L}<br>Day7:${uiData[uiData.length-1].day7H}~${uiData[uiData.length-1].day7L}<br><br><button onClick="window.location.reload();" style="font-size:15px">Remove the Trip or Start a New Trip</button></div>`
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
