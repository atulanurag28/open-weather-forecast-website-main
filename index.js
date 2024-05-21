const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const _=require("lodash");
const https=require("https");
const path=require("path");
const fs=require("fs");
const app=express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

var temperature="metric";
var temp_cel=true;
var temp_far=false;
var language="en";
app.get("/",function(req,res){
    res.render("home");
});


app.get("/mainHome",function(req,res){
  res.render("weather");
});

app.get("/city",function(req,res){
  res.render("citySearch");
});

app.post("/mainHome",function(req,res){
  var currentCityValue = req.body.current_city_value;

const url="https://api.openweathermap.org/data/2.5/weather?q="+currentCityValue+"&appid=8db7bc96e05dde45f11d738f2382639c&units="+temperature+"&lang="+language+"";
   var rain_chance;
   var today_desc;
   var temp;
   var wind_speed;
   var temp_feel;
   var icon;
   var lat;
   var long;
   var time1_date,time1_time,time1_icon,time1_temp;
    var time2_date,time2_time,time2_icon,time2_temp;
    var time3_date,time3_time,time3_icon,time3_temp;
    var time4_date,time4_time,time4_icon,time4_temp;
    var time5_date,time5_time,time5_icon,time5_temp;
    var time6_date,time6_time,time6_icon,time6_temp;
    var day1,day1_icon,day1_desc;
    var day2,day2_icon,day2_desc;
    var day3,day3_icon,day3_desc;
    var day4,day4_icon,day4_desc;
    var day5,day5_icon,day5_desc;

    function getDayOfWeek(dateString) {
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const date = new Date(dateString);
      const dayOfWeek = daysOfWeek[date.getDay()];
      return dayOfWeek;
    }

   function processData(data) {
    const weatherData = JSON.parse(data);
    today_desc=weatherData["weather"][0]["description"];
    rain_chance = weatherData["clouds"]["all"];
    temp=weatherData["main"]["temp"];
    wind_speed=weatherData["wind"]["speed"];
    temp_feel=weatherData["main"]["feels_like"];
    icon=weatherData["weather"][0]["icon"];
    lat=weatherData["coord"]["lat"];
    long=weatherData["coord"]["lon"];

  var forecast_url="https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+long+"&appid=8db7bc96e05dde45f11d738f2382639c&units="+temperature+"&lang="+language+"";

  function processForecastData(data1){
    const forecastData=JSON.parse(data1);
    // time 1
    time1_date=forecastData["list"][0]["dt_txt"].split(" ")[0];
    time1_time=forecastData["list"][0]["dt_txt"].split(" ")[1];
    time1_icon=forecastData["list"][0]["weather"][0]["icon"];
    time1_temp=forecastData["list"][0]["main"]["temp"];

    //time2
    time2_date=forecastData["list"][1]["dt_txt"].split(" ")[0];
    time2_time=forecastData["list"][1]["dt_txt"].split(" ")[1];
    time2_icon=forecastData["list"][1]["weather"][0]["icon"];
    time2_temp=forecastData["list"][1]["main"]["temp"];

    //time3
    time3_date=forecastData["list"][2]["dt_txt"].split(" ")[0];
    time3_time=forecastData["list"][2]["dt_txt"].split(" ")[1];
    time3_icon=forecastData["list"][2]["weather"][0]["icon"];
    time3_temp=forecastData["list"][2]["main"]["temp"];

    //time4
    time4_date=forecastData["list"][3]["dt_txt"].split(" ")[0];
    time4_time=forecastData["list"][3]["dt_txt"].split(" ")[1];
    time4_icon=forecastData["list"][3]["weather"][0]["icon"];
    time4_temp=forecastData["list"][3]["main"]["temp"];

    //time5
    time5_date=forecastData["list"][4]["dt_txt"].split(" ")[0];
    time5_time=forecastData["list"][4]["dt_txt"].split(" ")[1];
    time5_icon=forecastData["list"][4]["weather"][0]["icon"];
    time5_temp=forecastData["list"][4]["main"]["temp"];

    //time6
    time6_date=forecastData["list"][5]["dt_txt"].split(" ")[0];
    time6_time=forecastData["list"][5]["dt_txt"].split(" ")[1];
    time6_icon=forecastData["list"][5]["weather"][0]["icon"];
    time6_temp=forecastData["list"][5]["main"]["temp"];

    //day1
    day1=(getDayOfWeek(forecastData["list"][8]["dt_txt"].split(" ")[0]));
    day1_icon=forecastData["list"][8]["weather"][0]["icon"];
    day1_desc=forecastData["list"][8]["weather"][0]["description"];

    //day2
    day2=(getDayOfWeek(forecastData["list"][16]["dt_txt"].split(" ")[0]));
    day2_icon=forecastData["list"][16]["weather"][0]["icon"];
    day2_desc=forecastData["list"][16]["weather"][0]["description"];
    
    //day3
    day3=(getDayOfWeek(forecastData["list"][24]["dt_txt"].split(" ")[0]));
    day3_icon=forecastData["list"][24]["weather"][0]["icon"];
    day3_desc=forecastData["list"][24]["weather"][0]["description"];
    
    //day4
    day4=(getDayOfWeek(forecastData["list"][32]["dt_txt"].split(" ")[0]));
    day4_icon=forecastData["list"][32]["weather"][0]["icon"];
    day4_desc=forecastData["list"][32]["weather"][0]["description"];

    //day5
    day5=(getDayOfWeek(forecastData["list"][39]["dt_txt"].split(" ")[0]));
    day5_icon=forecastData["list"][39]["weather"][0]["icon"];
    day5_desc=forecastData["list"][39]["weather"][0]["description"];

    res.render("city", {location: currentCityValue,rain_chance:rain_chance,temp:temp,wind_speed:wind_speed,temp_feel:temp_feel,icon:icon,time1_date:time1_date,time1_time:time1_time,time1_icon:time1_icon,time1_temp:time1_temp,time2_date:time2_date,time2_time:time2_time,time2_icon:time2_icon,time2_temp:time2_temp,time3_date:time3_date,time3_time:time3_time,time3_icon:time3_icon,time3_temp:time3_temp,time4_date:time4_date,time4_time:time4_time,time4_icon:time4_icon,time4_temp:time4_temp,time5_date:time5_date,time5_time:time5_time,time5_icon:time5_icon,time5_temp:time5_temp,time6_date:time6_date,time6_time:time6_time,time6_icon:time6_icon,time6_temp:time6_temp,day1:day1,day1_icon:day1_icon,day1_desc:day1_desc,day2:day2,day2_icon:day2_icon,day2_desc:day2_desc,day3:day3,day3_icon:day3_icon,day3_desc:day3_desc,day4:day4,day4_icon:day4_icon,day4_desc:day4_desc,day5:day5,day5_icon:day5_icon,day5_desc:day5_desc,today_desc:today_desc});

  }


  https.get(forecast_url,(response)=>{
    let data1='';
    response.on('data',(chunk)=>{
      data1 +=chunk;
    });
    response.on('end',()=>{
      processForecastData(data1);
    });
  }).on('error',(error)=>{
    console.log(`Error: ${error.message}`);
  });
    
  }


  https.get(url, (response) => {
    let data = '';
    
    response.on('data', (chunk) => {
      data += chunk;
    });
  
    response.on('end', () => {
      processData(data);
    });
  }).on('error', (error) => {
    console.error(`Error: ${error.message}`);
  });

});


app.get("/city",function(req,res){
  res.render("city");
});

app.get("/mapSearch",function(req,res){
  res.render("mapSearch");
});

app.post("/mapSearch",function(req,res){
  var currentCityValue = req.body.current_city_value;
  res.render("map",{cityName:currentCityValue});
})


app.get("/setting",function(req,res){
  res.render("setting",{temp_cel:temp_cel,temp_far:temp_far,language:language});
});

app.post("/setting",function(req,res){
  temperature=req.body.temp;
  language=req.body.lang;
  if(temperature=="metric"){
    temp_cel=true;
    temp_far=false;
  }
  else{
    temp_cel=false;
    temp_far=true;
  }
  res.redirect("/mainHome");
})




app.listen(process.env.PORT || 3000);