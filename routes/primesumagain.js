import { Router } from "express";
import axios from 'axios'
var router = Router();

router.post('/', function (req, res, next) {
    
    var input = req.body['input'];
    console.log(input);
    res.send(input);

});


export default router;
