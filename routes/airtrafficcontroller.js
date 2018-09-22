import { Router } from "express";
var router = Router();

router.post('/', function (req, res, next) {
    var startTime = new Date();
    var flights = req.body['Flights'];
    console.log("Testcase length:", flights.length)
    const reserveTime = parseInt(req.body.Static.ReserveTime)/60;
    const runwayCount = req.body.Static.Runways ? req.body.Static.Runways.length : 1;

    flights.sort((a,b)=>{
        a.timeInMins = parseInt(a.Time.substr(0,2))*60 + parseInt(a.Time.substr(2,2))
        b.timeInMins = parseInt(b.Time.substr(0,2))*60 + parseInt(b.Time.substr(2,2))

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

    let reservedUntil = []

    for (var i=0; i<runwayCount; i++){
        reservedUntil[i] = 0;
    }
    let output = []
    flights.forEach((flight, idx)=>{
        let tmpOutput = {
            PlaneId: flight.PlaneId
        }
        const currentRunway = (idx)%runwayCount;
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
            tmpOutput.Runway = req.body.Static.Runways[currentRunway]
        }
        output.push(tmpOutput)
    })
    var totalTime = new Date() - startTime;
    console.log("Time:", totalTime)
    res.send(JSON.stringify({
        "Flights": output
    }));
});


export default router;
