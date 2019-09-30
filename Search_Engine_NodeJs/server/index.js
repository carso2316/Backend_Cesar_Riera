//Server
const http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    routing = require('./routing');

const port = process.env.PORT || 8080,
    app = express(),
    Server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    next();
});

app.use('/', routing);

Server.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
})