let http = require('http');
let url = require('url');
require('dotenv').config();

let routes = {
    "GET": {
        "/": (req, res, params) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<h1>Get Method => / route with param of ${params.query.name} and ${params.query.age}</h1>`);
        },
        "/home": (req, res, params) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<h1>Get Method => /home route with param of ${params.query.name} and ${params.query.age}</h1>`);
        }
    },
    "POST": {
        "/": (req, res, params) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<h1>Post Method => / route with param of ${params.query.name} and ${params.query.age}</h1>`);
        },
        "/about": (req, res, params) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<h1>Post Method => /about route with param of ${params.query.name} and ${params.query.age}</h1>`);
        }
    },
    "NA": (req, res, params) => {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>No Page for this route</h1>')
    }
}

let start = (req, res) => {
    let reqMethod = req.method;
    let params = url.parse(req.url, true);
    let name = params.query.name;
    let age = params.query.age;

    let resolveRoute = routes[reqMethod][params.pathname];

    if (resolveRoute != null && resolveRoute != undefined) {
        resolveRoute(req, res, params);
    } else {
        routes["NA"](req, res, params);
    }
}


let server = http.createServer(start);

server.listen(process.env.PORT, () => {
    console.log(`Server is listen at port ${process.env.PORT}!`);
})