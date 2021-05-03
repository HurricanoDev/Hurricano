const express = require('express'); 
const fs = require('fs'); 
const app = express()

app.set('view engine', 'ejs'); 

// setup basic routing
app.use((req, res, next) => {
    // we'll be doing something here
    // the next argument is basically a function which triggers whatever happens next
    next()
})
// basic error handling
app.use((err, req, res, next) => {
    res.send('Whoops an unexpected error occured!')
})


app.get('/', (req, res) => {
    res.render('home');
    console.log('Some visited home page!'); 
});

app.get('*', (req, res) => {
    res.render('404'); 
    console.log('404 page go brrr'); 
});