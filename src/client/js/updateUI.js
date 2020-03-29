export const updateUI = async (dataSet,url) => {
    console.log('CP 2__ UPDATE UI')
    console.log(dataSet[0].cityImage)
    const request = await fetch ('/all')
    try{
        const uiData = await request.json()
        console.log(uiData);   
        console.log('updateUI working')
    }catch (error){
        console.log('UpdateUI error'+ error);
    };
};