
/**
 * class: HomePageComponent
 * Directory: src/app/cricket-view/cricket-scorecard
 * @author Rohit Tirmanwar
 * This is the node.js server main file
 */

var express = require('express');
var app = express();
var fs = require("fs");


// Initialize server APIs
var serverAPI = require('./server-api') (app);
var iplStatsAPI = require('./ipl-stats-api') (app);

//
// SERVE APPLICATION
//

// READ Config file
fs.readFile(__dirname + "/" + "../assets/server-config.json", 'utf8', function (err, data) {
    if (!err && data) {
        var jsonData = JSON.parse(data);

        // host the server
        var server = app.listen(jsonData.serverConfig.port, function () {
            var port = server.address().port;
            console.log("Example app listening at http://localhost:%s", port)
        })
    }
});