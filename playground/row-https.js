const https = require('https')

const url = 'https://api.weatherstack.com/current?access_key=2a152f8ffdfa546db0d156d086303200&query=23.0225, 72.5714 &units=m'

const request = https.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk.toString()
        console.log(chunk)
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })
})

request.on('error', (error) => {
    console.log('An error', error)
})

request.end()

