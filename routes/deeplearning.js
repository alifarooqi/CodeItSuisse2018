import { Router } from "express";
import axios from 'axios'
import { isPrimitive } from "util";
import { exists } from "fs";
var math = require('mathjs');
var router = Router();
const synaptic = require('synaptic');
var trainedData = require('../traineddata.json')
const myNetwork = synaptic.Network.fromJSON(trainedData);


router.post('/question-1', function (req, res, next) {
    var input = req.body.input;
    var output = req.body.output;
    var question = req.body.question;
    console.log(input);
    console.log(output);
    console.log(question);


    var a = input;
    var asquare = [a[0],a[1],a[2]];
    var b = output;
    var bsquare = [b[0],b[1],b[2]];
    var ainv = math.inv(asquare);
    var ans = math.multiply(ainv,bsquare);
    var finalans = question[0]*ans[0] + question[1]*ans[1] + question[2]*ans[2];
    var jsonans = {
        "answer" :  finalans
    }
    console.log(JSON.stringify(jsonans));
    res.send(jsonans);
});


router.post('/question-2', function (req, res, next){
    var testSet = req.body.question;
    for (var i=0; i<testSet.length; i++){
        console.log(JSON.stringify(testSet[i]))
    }
    var output = []
    testSet.forEach((test, idx)=>{
        var result = myNetwork.activate(test)
        var maxIdx = 0
        result.forEach((probability, i)=>{
            if(probability>result[maxIdx])
                maxIdx = i;
        })
        output[idx] = maxIdx;
    })
    console.log(output)
    res.send({
        answer: output
    })
})



export default router;