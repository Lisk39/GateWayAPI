
/*var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('Hello World!');
    res.end();
}).listen(8080);*/

var express = require('express');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
require('dotenv').config();
var gateway = require('./APILibrary/gatewayAPI');



var app = express();



async function main() {
    
    const Mongouri = "mongodb+srv://"+process.env.NAME+":"+process.env.PASS+"@formulafinder.af9sce2.mongodb.net/?retryWrites=true&w=majority";
   
    try {

         //setting up session creation
         const store = new MongoDBSession({
            uri: Mongouri,
            databaseName: 'Sessions',
            collection: "Sessions",

        });
    
        app.use(session(
            {
                secret: 'key that will sign cookie',
                resave: false,
                saveUninitialized: false,
                store: store,
            }
            ));


        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Credentials", true);
            res.header("Access-Control-Allow-Origin", process.env.CORS_FRONTEND_URL);
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
            });

        app.use(express.json())

        // setup gateway endpoint/route
        const gatewayRouter = require('./routes/gateway')
        app.use('/gateway', gatewayRouter)
        

/*
let testData = await gateway.getData();

app.get('/', function (req, res) {

    //console.log(req.session);
    //req.session.isAuth = true;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(testData, null, 3));
    
});
*/
        app.listen(process.env.PORT);
        console.log("listening on "+ process.env.PORT);


    } catch (e) {
        console.error(e);
    } 
 
}

main().catch(console.error);