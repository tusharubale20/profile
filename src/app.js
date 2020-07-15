const path = require('path')
const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const app = express()
const port = process.env.PORT || 3000

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

app.use(express.static(publicDirectoryPath))

app.get('/profile', (req, res) => {
    res.render('profile')
})

app.get('/profile/nodejs', (req, res) => {
    res.render('nodejs')
})

app.get('/profile/java', (req, res) => {
    res.render('java')
})

app.get('/profile/other', (req, res) => {
    res.render('other')
})

app.get('/profile/resume', (req, res) => {
    var data = fs.readFileSync(publicDirectoryPath+'/uploads/Resume.pdf');
    res.contentType("application/pdf");
    res.send(data);
})

app.get('/profile/resume/docx', (req, res) => {
    var data = fs.readFileSync(publicDirectoryPath+'/uploads/NTTD_Resume.docx');
    res.contentType("application/docx");
    res.send(data);
})

app.get('*', (req, res) => {
    res.render('profile')
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})