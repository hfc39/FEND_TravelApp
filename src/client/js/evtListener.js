import { goServer } from './goServer'
import { toEpoch } from './toEpoch'
import { updateUI } from './updateUI'


function init () {
    document.querySelector('form').addEventListener('submit', function (e){
    e.preventDefault();
    const place = document.getElementById('city').value;
    const timeInput = document.getElementById("date").value;
    console.log('5 pretend to print something')
    const time = toEpoch(timeInput);
    const now = Math.floor(new Date().getTime()/1000.0) 
    console.log(time)
    goServer('/geo',{city: place,travelDate: time,currentTime: now})  
    //.then(function(res){
    //    console.log('top')
    //}).then(updateUI(serverData))
    //})
})
}

export { init }





