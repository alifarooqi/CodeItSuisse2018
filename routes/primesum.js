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



   /*var total = integer;
    for(var i=primeArray.length-1 ; i>=0 ; i--)
    {
        if(total===0)
        {   
            console.log(outputArray);
            res.end(JSON.stringify(outputArray));
            break;
        }
        
        else if(total<2)
        {
            break;
        }
        
        else if(total<primeArray[i])
        {
            continue;
        }



        else if(total < 0)
        {  
            total = integer;
            continue;
        }

       

        else
        {
            total-= primeArray[i];
            outputArray.push(primeArray[i]);

        }
    }
*/




    

    findArray(integer,(primeArray.length)-1);
   

 
  function findArray(total, index)
   {
       if(total===0)
       {   
           
           res.end(JSON.stringify(outputArray));
           stopfindArray = true;
           
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
         if(stopfindArray===false)
            findArray(total,index-1);
         else
            return;
       }

       else
       {   
           if(stopfindArray === false)
           {outputArray.push(primeArray[index]);
           findArray(total-primeArray[index],index-1);
           
           outputArray.pop();
           findArray(total,index-1);
           }

           else
           {
               return;
           }
        
       }


   } 
   
   





   




   
    


});


export default router;
