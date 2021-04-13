const request = require('request')

const geocode = ( address , callback ) => {
    
    const lang = 'language=fa'
    const token = 'pk.eyJ1IjoiYXNnYXJlIiwiYSI6ImNqdjk1dHoybjBkYzc0Nm1tenl5ODJmMWsifQ.sJR_4x6hEBtOd2kWdyTyRQ'
    const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${token}&${lang}`

    request( { url: mapBoxUrl , json:true } , ( error , response ) => {
        if ( error ) {
            callback( 'امکان اتصال به سرور مقدور نمی باشد.' , undefined )
        } else if ( response.body.message ) {
            callback( 'مقادیر ورودی نا معتبر می باشد.' , undefined )
        } else if ( response.body.features.length === 0 ) {
            callback( 'محل انتخابی معتبر نیست.' , undefined )
        } else {
            

            callback( undefined , {
                lat  : response.body.features[0].center[0],
                long : response.body.features[0].center[1],
                location : response.body.features[0].place_name
            } )
        }
    })
}


module.exports = geocode