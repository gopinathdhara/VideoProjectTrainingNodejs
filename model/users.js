let mongoose = require('mongoose');
let schema=mongoose.Schema;

let userSchema=new schema({
    'name':String,
    'email':String,
    'password':String,
    
},{versionKey:false});

module.exports= mongoose.model('user',userSchema,'users');
/*
video =>name of the model
videoSchema =>schema of the model,
videos => collection of the database
 */