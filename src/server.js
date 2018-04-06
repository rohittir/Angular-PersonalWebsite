
/**
 * class: HomePageComponent
 * Directory: src/app/cricket-view/cricket-scorecard
 * @author Rohit Tirmanwar
 * This is the node.js server main file
 */

var http = require('http');
var https = require('https');
var express = require('express');
var app = express();
var fs = require("fs");

//
// READ USER DATA
//

// GET API for get user data
app.get('/profile', function (req, res) {
    fs.readFile(__dirname + "/" + "assets/data/user-profile.json", 'utf8', function (err, data) {
        if (!err && data) {
            res.status(200);
            res.send(JSON.parse(data));
        } else {
            res.status(401);
            res.send(err);
        }

    });
})


//
// READ CRICKET DATA
//
var parseString = require('xml2js').parseString;


function extractDataFromServer(url, callback) {

    http.get(url, function (response) {
        var completeResponse = '';
        response.on('data', function (chunk) {
            completeResponse += chunk;
        });
        response.on('end', function () {
            parseString(completeResponse, function (err, result) {
                callback(err, result);
            });
        })
    }).on('error', function (err) {
        console.log('problem with request: ' + e.message);
        callback(err, null);
    });
}


// GET API for getting live cricket matches from cricbuzz
app.get('/cricket', function (req, res) {

    if (req.query.request === 'cbLiveMatches') {
        // Cricbuzz URL for live score
        var liveScoreURL = 'http://synd.cricbuzz.com/j2me/1.0/livematches.xml';

        extractDataFromServer(liveScoreURL, function (err, data) {
            if (!err && data) {
                res.status(200);
                res.send(data);
            } else {
                res.status(501);
                res.send(null);
            }
        });
    } else if (req.query.request === 'cbCommentary' && req.query.matchUrl) {
        var url = req.query.matchUrl;
        if (url) {
            url += 'commentary.xml';
            extractDataFromServer(url, function (err, data) {
                if (!err && data) {
                    res.status(200);
                    res.send(data);
                } else {
                    res.status(501);
                    res.send(null);
                }
            });
        } else {
            res.status(403);
            res.send(null);
        }
    } else if (req.query.request === 'cbScorecard' && req.query.matchUrl) {
        var url = req.query.matchUrl;

        if (url) {
            url += 'scorecard.xml';
            extractDataFromServer(url, function (err, data) {
                if (!err && data) {
                    res.status(200);
                    res.send(data);
                } else {
                    res.status(501);
                    res.send(null);
                }
            });
        } else {
            res.status(403);
            res.send(null);
        }
    } else {
        res.status(404);
        res.send(null);
    }
});


// GET API for getting live cricket matches from cricscore-api.appspot.com
app.get('/cricket/livescore', function (req, res) {

    if (req.query.request === 'csLiveMatches') {

        var url = 'https://cricscore-api.appspot.com/csa';
        https.get(url, function (response) {
            var completeResponse = '';
            response.on('data', function (chunk) {
                completeResponse += chunk;
            });
            response.on('end', function () {
                var data = JSON.parse(completeResponse);
                res.status(200);
                res.send(data);
            })
        }).on('error', function (err) {
            res.status(500);
            res.send(null);
        });

    } else if (req.query.request === 'csLiveScore' && req.query.matchId) {

        var matchId = req.query.matchId;
        var url = 'https://cricscore-api.appspot.com/csa?id=' + matchId;
        https.get(url, function (response) {
            var completeResponse = '';
            response.on('data', function (chunk) {
                completeResponse += chunk;
            });
            response.on('end', function () {
                var data = JSON.parse(completeResponse);
                res.status(200);
                res.send(data);
            })
        }).on('error', function (err) {
            res.status(500);
            res.send(null);
        });

    } else {
        res.status(404);
        res.send(null);
    }

});


//
// SERVE APPLICATION
//

// READ Config file
fs.readFile(__dirname + "/" + "assets/server-config.json", 'utf8', function (err, data) {
    if (!err && data) {
        var jsonData = JSON.parse(data);

        // host the server
        var server = app.listen(jsonData.serverConfig.port, function () {
            var port = server.address().port;
            console.log("Example app listening at http://localhost:%s", port)
        })
    }
});