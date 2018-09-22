import { Router } from "express";
import axios from 'axios'
import { isPrimitive } from "util";
import { exists } from "fs";
var router = Router();

const isPrime = num => {
        
    if(num<=1)
    {
        return false;
    }

    else if(num<=3)
    {
        return true;
    }

    else if(num%2===0 || num%3===0)
    {
        return false;
    }

    let i = 5;
    while(i*i<=num)
    {
        if(num%i===0 || num%(i+2)===0 )
        {
            return false;
        }

        i=i+6;
    }

    return true;



  }

router.post('/', function (req, res, next) {

    var input = req.body['input'];

    
    var integer = parseInt(input),
    
    primeArray = [],
    outputArray = [];
    console.log(input);


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
           return;
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
