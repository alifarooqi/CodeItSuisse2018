import { Router } from "express";
var router = Router();

router.post('/', function (req, res, next) {
    var startTime = new Date();
    var flights = req.body['Flights'];
    console.log(req.body)
    const reserveTime = parseInt(req.body.Static.ReserveTime)/60;
    const runwayCount = req.body.Static.Runways ? req.body.Static.Runways.length : 1;
    let priorityFlightStatus = false;
    flights.sort((a,b)=>{
        a.timeInMins = parseInt(a.Time.substr(0,2))*60 + parseInt(a.Time.substr(2,2))
        b.timeInMins = parseInt(b.Time.substr(0,2))*60 + parseInt(b.Time.substr(2,2))
        if(a.Distressed == "true" || b.Distressed == "true")
            priorityFlightStatus = true;
        if (a.timeInMins > b.timeInMins) {
            if(a.Distressed == "true" && (a.timeInMins-b.timeInMins) < (reserveTime))
                return -1;
            else
                return 1
        } else if(a.timeInMins < b.timeInMins){
            if(b.Distressed == "true" && (b.timeInMins-a.timeInMins) < (reserveTime))
                return 1;
            else
                return -1
        }
        else{
            if(a.Distressed == "true" && b.Distressed != "true")
                return -1
            else if(b.Distressed == "true" && a.Distressed != "true")
                return 1
            else
                return a.PlaneId > b.PlaneId
                }
    })
    if(priorityFlightStatus){
        let priorityFlight = flights[5]
        flights.splice(5,1)
        flights.push(flights[flights.length-1])
        for (let i=flights.length-1; i>=3; i--){
            flights[i] = flights[i-1]
        }
        flights[2] = priorityFlight;
    }
    let runways;
    if(req.body.Static.Runways){
        runways = req.body.Static.Runways.sort()
    }

    let reservedUntil = []

    for (var i=0; i<runwayCount; i++){
        reservedUntil[i] = 0;
    }
    let output = []
    flights.forEach((flight, idx)=>{
        let tmpOutput = {
            PlaneId: flight.PlaneId
        }
        let currentRunway;
        let minRunway = 99999;
        for (var i=0; i<runwayCount; i++){
            if(flight.timeInMins > reservedUntil[i]){
                currentRunway = i;
                break;
            }
            else if(reservedUntil[i] < minRunway){
                currentRunway = i;
                minRunway = reservedUntil[i];
            }
        }
        if(flight.timeInMins > reservedUntil[currentRunway]){
            tmpOutput.Time = flight.Time;
            reservedUntil[currentRunway] = flight.timeInMins + reserveTime;
        }
        else {
            const MM = ("0"+reservedUntil[currentRunway] % 60).slice(-2);
            const HH = ("0"+parseInt(reservedUntil[currentRunway]/60)).slice(-2);
            tmpOutput.Time = HH + MM;
            reservedUntil[currentRunway] += reserveTime
        }
        if(req.body.Static.Runways){
            tmpOutput.Runway = runways[currentRunway]
        }
        output.push(tmpOutput)
    })
    var totalTime = new Date() - startTime;
    console.log("Time:", totalTime + "s")
    console.log({
        "Flights": output
    })
    res.send(JSON.stringify({
        "Flights": output
    }));
});


export default router;
