console.log('client side js file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



const getWeather = (location, completion) => {
    messageOne.textContent = "Loading"
    messageTwo.textContent = ''
    fetch('/weather?address=' +  location).then((resp) => {
        messageOne.textContent = resp
        resp.json().then((data) => {

            const {error} = data
            if (error) {
                messageOne.textContent = data.error
                return
            }
            completion(data)
        })
    })
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    getWeather(location, (resp) => {
        const {location, forecast} = resp
        messageOne.textContent = location
        messageTwo.textContent = forecast
    })
})