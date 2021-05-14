const express = require("express");
const app = express();

app.listen(8080);
console.log("server started!...");

//routing starts here
const route_planner = require('./routes/index');

app.all("/api/*", (req,res,next) => {
    try{
        const token = req.header("token");
        if(!token){
            res.status(403).send('Token not present');
        } else {
            jwt.verify(token,req.app.get('secretKey'), (err,decoded) => {
                if(!err){
                    next();
                } else {
                    res.status(500).send('Invalid Token');
                }
            })
        }
    } catch(e){
        throw(e);
    }
})