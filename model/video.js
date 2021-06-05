let mongoose = require('mongoose');
let schema=mongoose.Schema;

let videoSchema=new schema({
    'title':String,
    'description':String,
    'url':String,
    'user_id': mongoose.Schema.Types.ObjectId
    
},{versionkey:false});

module.exports= mongoose.model('video',videoSchema,'videos');
/*
video =>name of the model
videoSchema =>schema of the model,
videos => collection of the database
 */