const request = require('request')

const geocode = (address,callback) => {
    const URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ3JlZW50ZWNrIiwiYSI6ImNqejk5dDZwdDBncGYzaW14cGJweDA1b2kifQ.HI1YWGQWi8CXzwVrdb61GQ&limit=1'

    request({url: URL,json : true},(error,{body})=>{
        if(error){

            callback('Unable to connect to location services',{})

        }else if(body.features.length===0){
            callback('Unable to find location. Use different search',{})
        }else{
            
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place: body.features[0].place_name
            })
        }
        
        
    })
}

module.exports = geocode