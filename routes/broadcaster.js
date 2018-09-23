let input = {
    "data" : [ "A->B" , "A->C" , "B->D" , "E->F" ]
}


import { Router } from "express";
import axios from 'axios'
var router = Router();

router.post('/message-broadcast', function (req, res, next) {
    var input = req.body['data'];

    let connected = {}
    let result = []
    input.data.forEach(connection =>{
        let a = connection.substr(0,1)
        let b = connection.substr(3,1)
        if(!connected[a]){
            connected[a] = 1;
        }
        if(!connected[b]){
            connected[b] = 1;
        }
        connected[b]++;
    })
    let nodes = Object.keys(connected)
    nodes.forEach(node=>{
        if(connected[node] == 1){
            result.push(node)
        }
    })

    console.log(result)
    res.send({
        result: result
    });
});


export default router;
