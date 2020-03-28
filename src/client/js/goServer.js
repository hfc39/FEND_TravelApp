export const goServer = async (url, data={})=>{
    const res = await fetch ( url , {
        method:'POST',
        credentials:'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try{
        const data = await fetch ('/all')
        try {
            const serverData = await data.json()
            console.log(serverData); 
        }catch (error){
            console.log('error'+ error);
        }
    } catch(error) {
        console.log("error", error);
}}