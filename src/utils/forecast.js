const request = require('request')

const forecast = ( lat , long , callback ) => {
    const darSkyUrl = `https://api.darksky.net/forecast/a1f44e32f300c5ee6c17f53678ecd1c6/${ lat },${ long }?lang=fa&units=si`

    request( { url: darSkyUrl , json:true } , ( error , response ) => {
        if ( error ) {
            callback( 'امکان اتصال به سرور مقدور نمی باشد.' , undefined )
        } else if ( response.body.error ) {
            callback( 'مقادیر ورودی نا معتبر می باشد.' , undefined )
        } else {
            callback( undefined , response.body.currently )
        }
    })
}


module.exports = forecast