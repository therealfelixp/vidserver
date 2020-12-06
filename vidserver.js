var fs = require('fs')
var http = require('http')
var https = require('https')
var privateKey = fs.readFileSync('sslcert/server.key', 'utf8')
var certificate = fs.readFileSync('sslcert/server.cert', 'utf8')
var credentials = {key: privateKey, cert: certificate}

var express = require('express')
var app = express()

const port = 3500
const host = '192.168.0.200'

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

app.use(express.static('public'))

app.get('/', (req, res)=> {
    res.send('Welcome to Vidserver by Felix Prior')
})

app.get('/manifest.json', (req, res)=> {
    res.header("Content-Type",'application/json')
    res.json({
        "title" : "Custom Video",
        "duration" : "5",
        "sources" : [{
            "url" : "http://192.168.0.200:3500/videos/vid.webm",
            "contentType" : "video/webm",
            "quality" : "1080"
        }]
    })
})

httpServer.listen(port, host, () => {
    console.log('vidserver listening on ' + host + ":" + port)
})