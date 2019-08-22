const request = require('request')

const forecast = (long, lat, completion) => {
    const longEncoded = encodeURIComponent(long)
    const latEncoded = encodeURIComponent(lat)
    const url = 'https://api.darksky.net/forecast/e55bff5da757ea334371c650e61c1bd0/' + latEncoded + ',' + longEncoded

    const payload = {
        url,
        json: true
    }
    request(payload,(err, {body}) => {

    if (err) {
        const errorMessage = 'unable to connect to weather service!'
        completion(errorMessage, undefined)
    } else {

        const {summary, temperature, precipProbability, windSpeed} = body.currently
        if (body.error) {
            const errorMessage =  body.code + ': Unable to find location!'
            completion(errorMessage, undefined)
     
        } else {

            const successMessage = summary + ' It is currently ' + temperature + ' degrees out. There is ' + precipProbability + '% chance of rain with a wind speed of ' + windSpeed + "kmh"
            completion(undefined, successMessage)
        }
    }
})
}

module.exports = forecast