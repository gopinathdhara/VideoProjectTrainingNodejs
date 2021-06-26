let express=require("express");
//create an Router Object
let router=express.Router();
let videoModel= require("../model/video");
let checkAuth= require("../middleware/CheckAuth");
var mongoose = require('mongoose');
//db connection
require("../dbConnection/dbConnection");

//all videos for home page
router.get("/allvideos",async (req,res)=>{  
  try { 
      //const videos = await videoModel.find({}).exec();
      //console.log(req.usertoken);
      const videos = await videoModel.aggregate([
        {
          $lookup:
            {
              from: "users",
              localField: "user_id",
              foreignField: "_id",
              as: "userDetails"
            },
            
       },
       { $sort: {"_id": -1} }
     ])
      res.status(200).json({"status":200,"data": videos });  
    } catch (err) {
      console.log(err);   
      res.status(400).json({"status":400,"error":err.message});
    }
})



//video listing
router.get("/videos",checkAuth,async (req,res)=>{  
    try {
        //const videos = await videoModel.find({}).exec();
        //console.log(req.usertoken);
        let userId=req.usertoken.userId;
        const videos = await videoModel.aggregate([
          { $match : { user_id : mongoose.Types.ObjectId(userId) } },
          {
            $lookup:
              {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "userDetails"
              }
         }
       ])
        res.status(200).json({"status":200,"data": videos });  
      } catch (err) {
        console.log(err);   
        res.status(400).json({"status":400,"error":err.message});
      }
})
//get video by id
router.get("/video/:id",checkAuth,async (req,res)=>{ 
  try {
      let userId=req.usertoken.userId;
      const videos = await videoModel.find({_id:mongoose.Types.ObjectId(req.params.id),user_id:mongoose.Types.ObjectId(userId)}).exec();
      res.status(200).json({"status":200,"data": videos }); 
    } catch (err) {
      console.log(err);   
      res.status(400).json({"status":400,"error":err.message});
    }
})
//insert new video
router.post("/video",checkAuth,async (req,res)=>{ 
  try {
      let title=req.body.title;
      let description=req.body.description;
      let url=req.body.url;
      let newVideo=new videoModel();
      newVideo.title=title;
      newVideo.description=description;
      newVideo.url=url;
      newVideo.user_id=mongoose.Types.ObjectId(req.usertoken.userId);
      const videos = await newVideo.save(); 
      res.status(200).json({"status":200,'message':'One Video Added Successfully !'}); 
    } catch (err) {
      console.log(err);   
      res.status(400).json({"status":400,"error":err.message});
    }
})
//update new video
router.put("/video/:id",checkAuth,async (req,res)=>{  
  try {
      let title=req.body.title;
      let description=req.body.description; 
      let url=req.body.url;
      let userId=req.usertoken.userId;
      const videoCount = await videoModel.count({_id:mongoose.Types.ObjectId(req.params.id),user_id:mongoose.Types.ObjectId(userId)}).exec();
      if(videoCount==1){
        const videos=await videoModel.findByIdAndUpdate(req.params.id, { $set: { title: title, description: description,url: url}});
      }else{
        res.status(200).json({"status":400,'message':'No record found !'});
      }
      res.status(200).json({"status":200,'message':'One video updated Successfully !'}); 
    } catch (err) {
      console.log(err);   
      res.status(400).json({"status":400,"error":err.message});
    }
})
//delete new video
router.delete("/video/:id",checkAuth,async (req,res)=>{  
  try {
      let userId=req.usertoken.userId;
      const videoCount = await videoModel.count({_id:mongoose.Types.ObjectId(req.params.id),user_id:mongoose.Types.ObjectId(userId)}).exec();
      if(videoCount==1){
        const videos=await videoModel.findByIdAndRemove(req.params.id);
      }
      else{
        res.status(200).json({"status":400,'message':'No record found !'});
      }
      res.status(200).json({"status":200,'message':'One Video deleted Successfully !'}); 
    } catch (err) {
      console.log(err);   
      res.status(400).json({"status":400,"error":err.message});
    }
})
module.exports=router;