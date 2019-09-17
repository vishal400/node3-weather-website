const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        author: 'Vishal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        author: 'Vishal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'This is some help text',
        author: 'Vishal'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude, longitude, place} = {}) => {
        if(error){
            return res.send({
                error: error
            })
        }else{
            
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({
                        error: error
                    })
                }else{
                    return res.send({
                        location: place,
                        forecast: forecastData
                    })
                }
            })
        }
    })

    
    
})

app.get('/help/*', (req,res) => {
    res.render('404notfound', {
        title: '404',
        message: 'HELP ARTICLE NOT FOUND',
        author: 'Vishal'
    })
})

app.get('*', (req, res) => {
    res.render('404notfound', {
        title: '404',
        message: 'page not found',
        author: 'Vishal'
    })
})

app.listen(3000, () => {
    console.log('listening')
})