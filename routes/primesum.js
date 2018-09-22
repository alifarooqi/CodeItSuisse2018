import { Router } from "express";
import axios from 'axios'
import { isPrimitive } from "util";
import { exists } from "fs";
var router = Router();

const isPrime = num => {
    for(let i = 2; i < num; i++)
      if(num % i === 0) return false;
    return num !== 1 && num !== 0;
  }

router.post('/', function (req, res, next) {

    var input = req.body['input'];
    
    var integer = parseInt(input),
    primeArray = [],
    outputArray = [],
    outputArrayList = []

    for(var i=2 ; i<=integer ; i++){
        
        if(isPrime(i))
        {
            primeArray.push(i);
        }
    }


  findArray(integer,(primeArray.length)-1);
   

   function findArray(total, index)
   {
       if(total===0)
       {
           res.end(JSON.stringify(outputArray));
           return outputArray;
       }

       else if(total<0)
       {
           return;
       }

       else if(index<0)
       {
           return;
       }
      
       else if(primeArray[index]>total)
       {
         findArray(total,index-1);   
       }

       else
       {   
           outputArray.push(primeArray[index]);
           findArray(total-primeArray[index],index-1);
           outputArray.pop();
           findArray(total,index-1);
        
       }


   }

   



   
    


});


export default router;
