const request = require('request')

const forecast = (lat,long,callback) => {
    const url = 'https://api.darksky.net/forecast/5252421f2e29673af53442cd5d93e2d3/'+lat+','+long+'?units=si'

    request({url,json : true},(error, {body})=>{
        if(error){
            callback('Unable to connect to weather services')
        }else if(body.error){
            callback('Unable to find location')
        }else{
            const data = body.currently
            const forecast = {summary: data.summary,
                            temperature: data.temperature,
                            rain: data.precipProbability,
                            humidity: data.humidity,
                            visibility: data.visibility,
                            cloud: data.cloudCover}
            callback(undefined,forecast)
            }
        
    })
}


module.exports = forecast

