import { goServer } from './goServer'
import { toEpoch } from './toEpoch'


function init () {
    document.querySelector('form').addEventListener('submit', function (e){
    e.preventDefault();
    const place = document.getElementById('city').value;
    const timeInput = document.getElementById("date").value;
    const time = Client.toEpoch(timeInput);
    const now = Math.floor(new Date().getTime()/1000.0) 
    Client.goServer('/geo',{city: place,travelDate: time,currentTime: now})  
})
}

export { init }





