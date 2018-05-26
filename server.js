const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;  //managed by heroku

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();

    var log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });

    next();
});


// app.use((req, res, next) => {
//
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance Page'
//     })
//
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
   //res.send('<h1>Hello Express!</h1>');
   //  res.send({
   //      name: 'Jeff',
   //      likes: ['gaming', 'machine learning']
   //  })
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'This is the home page.  Welcome!',
    });
});

app.get('/about', (req, res) => {
   //res.send('About Page');
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
   res.send({
       error: 'error handling request'
   });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
});
