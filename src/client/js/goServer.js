import { updateUI } from "./updateUI";

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
            console.log('CP 1_goServer working')
            console.log(serverData[0].cityImage)
            updateUI(serverData)
            return serverData
        }catch (error){
            console.log('goServer 2 error'+ error);
        }
        console.log('PASS goServer 1')
    } catch(error) {
        console.log("goServer 1 error", error);
}}