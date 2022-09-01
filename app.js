
const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");


const app=express();

app.set("view engine","ejs");


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

        app.get("/",function(req,res){
  const sendData={query: "Location",temp:"Temp",sunrose:"Sunrise",weatherDescription:"Description",feelLike:"feels-like",max:"Max-temp",min:"Min-temp",country:"Country",hour:"Hour",minutes:"Minutes",speed:"Speed"}
      res.render("index",{sendData:sendData});
  });

    app.post("/",function(req,res){

    const query=req.body.cityName;
    const apikey="7bb8a53dd67ec3abcae6b796fa7704de";
    const unit="metric"
  const url="https://api.openweathermap.org/data/2.5/weather?q=" + query  +"&appid=" + apikey +"&units="+unit;

  https.get(url,function(response){

  response.on("data",function(data){

    const weatherData=JSON.parse(data);
    console.log(weatherData);
    var today = new Date();

    var hour = today.getHours();
    var minutes=today.getMinutes();

   const temp=weatherData.main.temp;
   const weatherDescription=weatherData.weather[0].description;
   const feelLike=weatherData.main.feels_like;
   const max=weatherData.main.temp_max;
   const min=weatherData.main.temp_min;
   const country=weatherData.sys.country;
   const speed=weatherData.wind.speed;
    const icon=weatherData.weather[0].icon
     const imageURL="http://openweathermap.org/img/wn/" +icon+ "@2x.png"
   const sunrise=weatherData.sys.sunrise;
   const sendData={};
   sendData.temp=temp;
   sendData.weatherDescription=weatherDescription;
   sendData.query=query;
   sendData.feelLike=feelLike;
   sendData.max=max;
   sendData.min=min;
   sendData.country=country;
   sendData.hour=hour;
   sendData.minutes=minutes;
   sendData.speed=speed;
   sendData.sunrise=sunrise;
   sendData.imageURL=imageURL;
   res.render("index",{sendData:sendData});
   // const icon=weatherData.weather[0].icon
   // const imageURL="http://openweathermap.org/img/wn/" +icon+ "@2x.png"



    // const temp=weatherData.main.temp;
    // const weatherDescription=weatherData.weather[0].description;
    // const icon=weatherData.weather[0].icon
    // const imageURL="http://openweathermap.org/img/wn/" +icon+ "@2x.png"



    // res.write("<p text-align:center>the weather is currently "+weatherDescription+"</p>");
    // res.write("<h1>temperature in "+ query +" is " + temp+ " degrees celcius</h1>");
    // res.write("<img src="+imageURL+">")
    // res.send();

});

});

});



  app.listen(process.env.PORT || 3000,function(){
       console.log("server is running on 3000");


 });
