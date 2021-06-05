//momgo db connection
const mongoose = require('mongoose')
let db='mongodb://gopi:12345678@localhost:27017/videoDB';  
//let db ="mongodb://u0qchhlcveatq3tfihhz:vBIGEph0gYSCuWC35aFO@be3hukrrvu9sgbd-mongodb.services.clever-cloud.com:27017/be3hukrrvu9sgbd"
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology:true },function(err){
    if(err){
        throw err;
    }else{ 
        console.log("Mongo DB Connected Successfully");  
    }
}) 

module.exports=mongoose;