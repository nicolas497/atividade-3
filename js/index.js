$(document).ready(function() {

    // hide cloud objects before user allows geolocation tracking
    $("#sun, #shower, #rain, #snow, #thunder, #clouds").hide();
     // get geolocation
    navigator.geolocation.getCurrentPosition(function(position) {
       var lat = position.coords.latitude;
       var lon = position.coords.longitude;
       var weatherAPIURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=4520f4cfab08028683ad27dafdf3b4fd";
   
       //get weather data from openweathermap.org
       $.get(weatherAPIURL, function(json) {
         var tempCelsius = json.main.temp;
         var weather = json.weather[0].main;
        
         //Show location name
         $("#location").html(json.name + ", " + json.sys.country);
         $("#tempCelsius").html(tempCelsius.toFixed(1) + " °C");
         $("#tempFahrenheit").html((tempCelsius * 9 / 5 + 32).toFixed(1) + " F");
         $("#weatherCondition").html(weather);
         //Change weather icon based on actual weather
         if (weather == "Clouds"){
           $("#clouds").show();
           $("#sun, #shower, #rain, #snow, #thunder").hide();
           }
          else if(weather == "Clear"){
            $("#sun").show();
           $("#clouds, #shower, #rain, #snow, #thunder").hide();
          }
         else if(weather == "Snow"){
           $("#snow").show();
           $("#clouds, #shower, #rain, #sun, #thunder").hide();        
         }
         else if(weather == "Rain"){
           $("#rain").show();
           $("#clouds, #shower, #snow, #sun, #thunder").hide();        
         }
         else if(weather == "Drizzle"){
           $("#shower").show();
           $("#clouds, #rain, #snow, #sun, #thunder").hide();        
         }
         else if(weather == "Thunderstorm"){
           $("#thunder").show();
           $("#clouds, #shower, #snow, #sun, #rain").hide();        
         }
         });
   //toggle between Celcius and Fahrenheit. Big thx to http://stackoverflow.com/questions/36423198/toggle-temperature-value-jquery for this solution
         $("#toggle").on("click", function() {
           $("span").toggle();
         });
         
       });
     });