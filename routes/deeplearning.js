import { Router } from "express";
import axios from 'axios'
import { isPrimitive } from "util";
import { exists } from "fs";
var math = require('mathjs');
var router = Router();


router.post('/question-1', function (req, res, next) {
    var input = req.body.input;
    var output = req.body.output;
    var question = req.body.question;
    console.log(input);



    var a = input;
    var asquare = [a[0],a[1],a[2]];
    var b = output;
    var bsquare = [b[0],b[1],b[2]];
    var ainv = math.inv(asquare);
    var ans = math.multiply(ainv,bsquare);
    var finalans = question[0]*ans[0] + question[1]*ans[1] + question[2]*ans[2];
    var jsonans = {
        "answer" : finalans
    }
    res.send(JSON.stringify(jsonans));
});


export default router;