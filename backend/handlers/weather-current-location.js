const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
//use the geo location of the user
const CurrentLocationHandler = async (req, res) => {
    
    const { lat, lon } = req.body;
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const data = await response.json();
    res.json(data);
     
       
    
 };
 
 module.exports = CurrentLocationHandler;