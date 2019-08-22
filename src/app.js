const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicPath =  path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine & view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Thomas Richardson'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Thomas Richardson'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Thomas Richardson',
        message: 'This is the help page welcome'
    })
})

app.get('/weather', (req, res) => { 
    const {address} = req.query

    if (!address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    console.log(address)
    geocode(address, (err, {latitude: lat, longitude: long, location}) => {
        if (err) {
            return console.log(err)
        }
   
        forecast(lat, long, (err, forecastResponse) => {
            if (err) {
                return res.send({
                    error: 'err'
                })
            }
            res.send({
                location,
                forecast: forecastResponse
            })
        })
    
    })
  
})

app.get('/products', (req, res) => {
    const {search} = req.query

    if (!search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 

    res.send({
        products: []
    })
})

app.get('/help/*',(req, res) => {
    res.render('404', {
        title: '404',
        name: 'Thomas Richardson',
        message: 'Help article not found.'
    })
})

app.get('*',(req, res) => {
    res.render('404', {
        title: '404',
        name: 'Thomas Richardson',
        message: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})