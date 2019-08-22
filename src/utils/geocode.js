const request = require('request')

const geocode = (address, completion) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=1&access_token=pk.eyJ1IjoibG9jYWxsb3RtZW50IiwiYSI6ImNqaXQ4a2VyMTE1djQzd252dWV3bHRkanEifQ.gOKXzixW130-XCN5ASJkTw'
    const payload = {
        url,
        json: true
    }
    request(payload, (err, {body}) => {
        if (err) {
            completion('Unable connect to location services', undefined)
        } else {
            const {features} = body
            if (features.length === 0 ) {
                completion('No results found!', undefined)
            } else {
                const {center, place_name} = features[0] 
                const long = center[1]
                const lat = center[0]

                completion(undefined, {
                    location: place_name,
                    latitude: lat,
                    longitude: long
                })
            }
        }
    })
}

module.exports = geocode