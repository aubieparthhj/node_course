const forecast = require('./utils/forecast')

const geocode = require('./utils/geocode')

console.log('Starting point')
const address=process.argv[2]

if(!address){   
    return console.log('Please provide an address')
}else{
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return console.log('Error', error)
        }
        console.log('Data', location)
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return console.log('Error', error)
            }
            console.log('Data', forecastData.weather_descriptions + ' It is currently ' + forecastData.temperature + ' degrees out. There is a ' + forecastData.precip + '% chance of rain. The humidity is ' + forecastData.humidity + '%.')
        })
        
    })
}

