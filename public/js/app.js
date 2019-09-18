const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const rain = document.querySelector('#rain')
const humidity = document.querySelector('#humidity')
const clouds = document.querySelector('#clouds')
const visibility = document.querySelector('#visibility')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const URL = '/weather?address=' + search.value

    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''
    rain.textContent = ''
    humidity.textContent = ''
    clouds.textContent = ''
    visibility.textContent = ''

    fetch(URL).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = (data.error)
        }else{
            messageOne.textContent = (data.location)
            messageTwo.textContent = (data.forecast.summary) + '. It is currently ' +  data.forecast.temperature + ' degrees out.'
            rain.textContent = data.forecast.rain*100 + '%'
            humidity.textContent = data.forecast.humidity + '%'
            clouds.textContent = data.forecast.cloud + '%'
            visibility.textContent = data.forecast.visibility + 'Km'
        }
    })
})


})