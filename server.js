//load express module
let express = require('express');
//load the body-parser module
//bodyParser is a middleware which is used to handle incoming formData.
//Replacement of formidable module in node.js
let bodyParser=require('body-parser');
//load builtin path module for string concatenation
//path is a built in express module 
let path=require('path');
//specify the port no 
let port=3000;
//create an application using express
let videoApi=require('./routes/videoApi');
let userApi=require('./routes/userApi');
let app = express()
//specify the bodyParser input types i.e urlecondoed Post data or Json Data
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//enabling cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS,PATCH");
    next();
  });
//using the route
app.use('/api',videoApi);
app.use('/api',userApi);
//create a basic routing 
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'./views/index.html'));
})
console.log("server");
//listen the port
app.listen(port,function(){
    console.log(`Server has started at ${port}`);
});