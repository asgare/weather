console.log('client side app loaded');



// fetch('http://puzzle.mead.io/puzzle').then( ( response )=>{
//     response.json().then(( data )=>{
//         console.log( data );
//     })
// }).catch(( err )=>{
//     console.log( err );
// })

const weatherForm = document.querySelector('form')
const searchValue = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit' , ( e )=>{
    e.preventDefault()
    
    messageOne.textContent = 'درحال لود شدن...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + searchValue.value )
    .then( ( response )=> {
        response.json()
        .then( ( data ) => {

            if ( data.error ) {

                return messageOne.textContent = data.error
            }

            messageOne.textContent = data.location
            messageTwo.textContent = ` در حال حاضر دمای هوا ${data.weather.temperature} درجه می باشد، همچنین ${data.weather.summary} است. سرعت باد ${data.weather.windSpeed} کیلومتر برساعت می باشد.`

        })
    })

})