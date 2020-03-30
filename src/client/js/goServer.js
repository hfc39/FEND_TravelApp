//updatUI for Forecast scenario
import { updateUIF } from "./updateUIF";
//updatUI for prediction scenario
import { updateUIP } from './updateUIP'

export const goServer = async (url='', data={})=>{
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
            //decide whether it goes to forecast or prediction
            let diff = serverData[serverData.length-1].travelDate-serverData[serverData.length-1].currentTime;
            if (0<diff && diff< 604800){
                console.log(serverData[serverData.length-1].travelDate-serverData[serverData.length-1].currentTime)
                console.log('FORECAST 7 days')
                Client.updateUIF(serverData)
                return serverData
            } else {
                console.log(serverData[serverData.length-1].travelDate-serverData[serverData.length-1].currentTime)
                console.log('prediction 1 day only')
                Client.updateUIP(serverData)
                return serverData
            }
        }catch (error){
            console.log('goServer 2 error'+ error);
        }
        console.log('PASS goServer 1')
    } catch(error) {
        console.log("goServer 1 error", error);
}}