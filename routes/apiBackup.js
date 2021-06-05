/*
let express=require("express");
//create an Router Object
let router=express.Router();
//db connection
require("../dbconnection/dbConnection");
//let's create an GET API
router.get("/courses",(req,res)=>{
    let courses = [
        {'course_id':1001,'course':'Angular','fees':12000},
        {'course_id':1002,'course':'React','fees':13000},
        {'course_id':1003,'course':'Node.js','fees':15000}
    ];
    //sending the output as JSON.
    res.status(200).json({'courseList':courses});
})
router.post("/submit",(req,res)=>{
    let name=req.body.name;
    let email=req.body.email;
    let phone=req.body.phone;
    //sending the output as JSON.
    let data={
        'name':name,
        'email':email,
        'phone':phone,
    }
    res.status(200).json(data);
})
//make router Object available to user outside of api.js
//adding user's signin 

router.post('/users/signin',(req,res)=>{
    User.find({'email':req.body.email}).exec(function(err,user){
        if(err) throw err;
        else {
            if(user.length ==0)
              res.status(200).json({'message':'No Such User exists'});
           else
              {
                  //if user's email is exists , then check the password.
                  bcrypt.compare(req.body.pass1,user[0].pass1,(err,result)=>{
                    if(result)
                       res.status(200).json({'message':'success'});
                    else
                       res.status(200).json({'message':'error'});
                           
                  });
              } 
        }
    });
});


module.exports=router; */ 