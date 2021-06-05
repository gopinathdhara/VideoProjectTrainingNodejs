let jwt=require("jsonwebtoken");
let verify=async (req,res,next)=>{
    try{
        var decoded = await jwt.verify(req.query.token, 'secret');
        req.usertoken=decoded;
    }catch(err){
        res.status(400).json({"status":400,'message':'Token is missing or expired' });  
    }
    next();
}
module.exports=verify;