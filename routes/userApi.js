let express=require("express");
let bcrypt=require("bcryptjs");
//create an Router Object
var mongoose = require('mongoose'); 
let router=express.Router();
let userModel= require("../model/users");
let jwt=require("jsonwebtoken");
let checkAuth= require("../middleware/CheckAuth");
//db connection
require("../dbconnection/dbConnection");


//insert new user
router.post("/users/signup",async (req,res)=>{ 
  try {
      let name=req.body.name;
      let email=req.body.email;
      let pass1=req.body.pass1;
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPassword = bcrypt.hashSync(pass1, salt);
      let newUser=new userModel();
      newUser.name=name;
      newUser.email=email;
      newUser.password=hashPassword;
      const user = await newUser.save(); 
      res.status(200).json({"status":200,'message':'One User Added Successfully !'}); 
    } catch (err) {
      console.log(err);   
      res.status(400).json({"status":400,"error":err.message});
    }
})

//login api
router.post("/users/signin",async (req,res)=>{ 
        let email=req.body.email;
		console.log(email);
        let pass1=req.body.password;
        try {
            const user = await userModel.find({"email":email}).exec();  
			console.log(user);
            if(user.length==0){
                res.status(400).json({"status":400,'message':'No Such User exists' });  
            }else{
                const status = await bcrypt.compare(pass1, user[0].password);
                if(status==true){
                    const token=jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id,
                      }, 'secret', { expiresIn: 60 * 60 *5 });
                    res.status(200).json({"status":200,"message":"success","token":token,"user":user});
                }else{
                    res.status(400).json({"status":400,'message':'Invalid email or password' });  
                }
            }
        } catch (err) {
            console.log(err);   
            res.status(400).json({"status":400,"error":err.message});
        }
  })
 //user profile
  router.get("/user/profile",checkAuth,async (req,res)=>{ 
    try {
            let userId=req.usertoken.userId;
            const users = await userModel.aggregate([
                { $match : { _id : mongoose.Types.ObjectId(userId)  } },
                {
                    $lookup:
                    {
                        from: "videos",
                        localField: "_id",
                        foreignField: "user_id",
                        as: "videoDetails"
                    }
                } 
        ]);
            res.status(200).json({"status":200,"data": users });  
      } catch (err) {
        console.log(err);   
        res.status(400).json({"status":400,"error":err.message});
      }
})

module.exports=router;