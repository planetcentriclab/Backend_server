const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 9999

app.use(express.json());
app.use(bodyParser.json());

// Allow requests from any origin
app.use(cors({ origin: '*' }));

//* self signed certificate
const sslServer = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
    },
    app
)

//Todo: ----------------------------------------------------------------------
const Route_greenClone = require("./src/api_greenClone/routes")
const Route_verticalForest = require("./src/api_verticalForest/routes")
const Route_weightScale = require("./src/api_weightScale/routes");

app.get('/', (req, res)=>{
    res.send("< PlanetCentric Service >")
})

app.use("/api/v1/greenClone/", Route_greenClone)
app.use("/api/v1/verticalForest/", Route_verticalForest)
app.use("/api/v1/weightScale/", Route_weightScale)

//Todo: ----------------------------------------------------------------------
sslServer.listen(port, () => console.log('Secure server at ' + port))

//! Planetcentric account playit.gg is --> https://books-opening.gl.at.ply.gg:61345 (localhost:9999)  https://books-opening.gl.at.ply.gg:61345/api/v1/weightScale/machine/delete