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
            callback(undefined,data.summary+'. It is currently '+data.temperature+' degrees out. There is '+data.precipProbability+'% chance of rain.')
            }
        
    })
}


module.exports = forecast

