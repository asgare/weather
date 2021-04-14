const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000


const publicDirectoryPath = path.join( __dirname , '..' , 'public' )
const viewsPath = path.join( __dirname , '..' , 'templates' , 'views' )
const partialsPath = path.join( __dirname , '..' , 'templates' , 'partials' )

//change handlebar default directory name from views to templates
app.set( 'views' , viewsPath )
// setting view engine to handlebar hbs 
app.set( 'view engine' , 'hbs' )
hbs.registerPartials( partialsPath )

// set a static folder 
app.use( express.static( publicDirectoryPath ) )


app.get( '' , ( req , res ) => {
    res.render('index' , {
        title: 'آب و هوا',
        copyright: 'طراحی و ساخت، شرکت افتخار آذرین'
    })
})
app.get( '/help' , ( req , res )=> {
    res.render( 'help' , {
        title: 'راهنما',
        copyright: 'طراحی و ساخت، شرکت افتخار آذرین'
    })
})

app.get( '/about' , ( req , res )=> {
    res.render( 'about' , {
        title: 'درباره سایت',
        copyright: 'طراحی و ساخت، شرکت افتخار آذرین'
    })
})

app.get( '/weather' , ( req , res )=> {

    if ( !req.query.address ) {
        return res.send({
            error: 'آدرس معتبر نیست'
        })
    }
    
    geocode( req.query.address , ( err , { lat , long , location } = {}) => {
            
            if ( err ) {
                return res.send({
                error: err
            }) 
        }

            forecast( lat , long , ( error , forecastData ) => {
                
                if ( error ) {
                    return res.send({
                        error: error
                    })
                } else {
                    res.send({
                        UserInput: req.query.address,
                        location,
                        weather : forecastData
                    })
                }

            })

        })
    

})

app.get( '/help/*' , ( req , res ) => {
    res.render('help404' , {
        title: 'صفحه راهنما',
        copyright: 'طراحی و ساخت، شرکت افتخار آذرین'
    })
})

app.get( '*' , ( req , res ) => {
    res.render('404' , {
        title: 'صفحه مورد نظر',
        copyright: 'طراحی و ساخت، شرکت افتخار آذرین'
    })
})

app.listen( port , ()=> {
    console.log( 'You are running on port ' + port )
})