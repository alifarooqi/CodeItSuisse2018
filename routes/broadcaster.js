import { Router } from "express";
import axios from 'axios'
var router = Router();

router.post('/message-broadcast', function (req, res, next) {
    var input = req.body;
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

router.post('/most-connected-node', function (req, res, next) {
    var input = req.body;
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
        connected[a]++;
    })
    let nodes = Object.keys(connected)
    let max = nodes[0];
    nodes.forEach(node=>{
        if(connected[node] > connected[max]){
            max = node
        }
    })

    console.log(result)
    res.send({
        result: max
    });
});


export default router;
