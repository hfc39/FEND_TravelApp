export const updateUI = async () => {
    const request = await fetch ('/all')
    try{
        const serverData = await request.json()
        console.log(serverData);   
    }catch (error){
        console.log('error'+ error);
    };
};