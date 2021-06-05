//momgo db connection
const mongoose = require('mongoose')
//let db='mongodb://gopi:12345678@localhost:27017/videoDB';  
let db='mongodb://uby51yxcyvnfnhq95eun:PFnzSKEOPIt2ZH6siuOe@b1xddzmd3opgti1-mongodb.services.clever-cloud.com:27017/b1xddzmd3opgti1';
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology:true },function(err){
    if(err){
        throw err;
    }else{ 
        console.log("Mongo DB Live Connected Successfully");  
    }
}) 

module.exports=mongoose;