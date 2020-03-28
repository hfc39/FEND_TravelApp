//turn input travel date to epoch format
function toEpoch (date) {
    let myDate = new Date(date); // Your timezone!
    let myEpoch = myDate.getTime()/1000.0;
    return myEpoch;
}

export { toEpoch }