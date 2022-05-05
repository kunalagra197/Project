const express = require("express");
const https = require("https");
const bodyParser=require("body-parser");
const app = express();
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function (req, res) {
res.sendFile(__dirname+"/public/index-1.html");
    
})

app.post("/",function(req,res){
    
    const query=req.body.cityName;
    const apikey="489be8a09cff49855296c27282d1e749#";
    const unit="metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apikey;
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const pressure = weatherdata.main.pressure;
            const humidity = weatherdata.main.humidity;
            const weatherDescription = weatherdata.weather[0].description;
            const icon=weatherdata.weather[0].icon;
            const imgurl= "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write(`<head><link rel="stylesheet" href="/style-1.css"></head>`);
            res.write(`<div id="content"> <h2 class="heading">Temperature in ${query} is ${temp} degree celsius </h2> <h2 class="heading">The current humidity is  ${humidity} %</h2><h2 class="heading">Atmospheric pressure is ${pressure} hPa</h2> <h2 class="heading">The weather is currently ${weatherDescription} </h2> <p style="text-align:center"><img src=${imgurl}></p></div> `);
            
            res.send();
        })
    })

})

app.listen(3000, function () {
    console.log("app is listening");
})