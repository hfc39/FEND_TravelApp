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
      //   fetch (uiData[0].cityImage)
      //      .then(response=>{
      //          return response.blob()
      //      })
      //      .then(blob => {
      //          console.log(blob);
      //          const img = document.getElementById('left')
       //         const it = document.getElementsByClassName('HeadImg')
      //          img.removeChild(it)
      //          const photo = document.createElement('img')
      //          img.appendChild(photo)
        //        photo.src = blob)
    }catch (error){
        console.log('UpdateUI error'+ error);
    };
};