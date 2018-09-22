import { Router } from "express";
import axios from 'axios'
var router = Router();

router.post('/', function (req, res, next) {
    var input = req.body;
    console.log(input)
    let balance = {}
    input.persons.forEach(person =>{
        balance[person] = 0;
    })

    input.expenses.forEach(expense =>{
        var sharedAmoung = input.persons.length;
        if(expense.exclude){
            sharedAmoung -= expense.exclude.length
        }
        else{
            expense.exclude = []
        }
        var cost = Math.round(expense.amount/sharedAmoung*100)/100
        console.log(cost)
        balance[expense.paidBy] += expense.amount
        input.persons.forEach(person =>{
            if(!expense.exclude.includes(person)){
                balance[person] -= cost;
            }
        })
    })

    let sortedNames = Object.keys(balance).sort(function(a,b){return balance[a]-balance[b]})
    sortedNames.forEach(name=>{
        console.log(name, balance[name])
    })
    let output = []
    while(sortedNames.length != 1){
        let tmpOutput = {
            from: sortedNames[0],
            to: sortedNames[sortedNames.length - 1]
        }
        let removedName;
        if(-1*balance[sortedNames[0]] > balance[sortedNames[sortedNames.length - 1]]){
            tmpOutput.amount = balance[sortedNames[sortedNames.length - 1]]
            balance[sortedNames[sortedNames.length - 1]] = 0
            balance[sortedNames[0]] += tmpOutput.amount
            removedName = sortedNames.pop()
        }
        else {
            tmpOutput.amount = -1*balance[sortedNames[0]]
            balance[sortedNames[sortedNames.length - 1]] -= tmpOutput.amount
            balance[sortedNames[0]] = 0
            removedName = sortedNames[0]
            sortedNames.shift()
        }
        output.push(tmpOutput)
    }
    console.log(output)


    res.send(JSON.stringify({
        transactions: output
    }));
});


export default router;
