import { Router } from "express";
import axios from 'axios'
var router = Router();

router.post('/minimum-distance', function (req, res, next) {
    var input = req.body;
    console.log(input);
    input.sort(function(a, b){return a - b});
    var minimumDifference = input[1]-input[0];
    for(var i=1 ; i< input.length ; i++)
    {
        if(input[i]-input[i-1]<minimumDifference)
        {
            minimumDifference = input[i] - input[i-1];
        }
    }

    var jsonAns = {
        "answer" : minimumDifference
    }
   
    res.send(jsonAns);
});


export default router;
