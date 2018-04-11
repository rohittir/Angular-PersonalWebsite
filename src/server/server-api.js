

var http = require('http');
var https = require('https');
var fs = require("fs");
var JSSoup = require('jssoup').default;


var newsApiKey = '0c3f4aa05b9c46929d6a407a830eaebc';
var sources = 'espn-cric-info';

var currInspiration = null;

module.exports = function(app) {

    setInterval(function() {
        chooseRandomInspiration(null);
    // }, 1000);
    }, 24 * 60 * 60 * 1000);

    function chooseRandomInspiration(res) {
        fs.readFile(__dirname + "/" + "../assets/data/inspirations-data.json", 'utf8', function (err, data) {
            if (!err && data) {
                var parsedData = JSON.parse(data);
                var inspCount = parsedData.inspirations.length;
                var prime = 53;
                var index = Math.floor(Math.random() * 49 * prime) % (inspCount);
                if (currInspiration === parsedData.inspirations[index]) {
                    chooseRandomInspiration(res);
                } else {
                    currInspiration = parsedData.inspirations[index];
                    if (res) {
                        res.status(200).send(currInspiration);
                    }
                }
            } else if (res) {
                res.status(501).send(null);
            }
        });
    }

    //
    // READ USER DATA
    //

    // GET API for get user data
    app.get('/api/profile', function (req, res) {

        try {
        fs.readFile(__dirname + "/" + "../assets/data/user-profile.json", 'utf8', function (err, data) {
            if (!err && data) {
                res.status(200);
                res.send(JSON.parse(data));
            } else {
                res.status(401);
                res.send(err);
            }

        });
        } catch(e) {
            console.error('Exception: ' + e);
            res.status(501);
            res.send(null);
        }
    });

    // GET API for get user timeline data
    app.get('/api/profile/timeline', function (req, res) {

        try {
        fs.readFile(__dirname + "/" + "../assets/data/user-timeline.json", 'utf8', function (err, data) {
            if (!err && data) {
                res.status(200);
                res.send(JSON.parse(data));
            } else {
                res.status(401);
                res.send(err);
            }

        });
        } catch(e) {
            console.error('Exception: ' + e);
            res.status(501);
            res.send(null);
        }
    });

     // GET API for get user data
     app.get('/api/inspiration', function (req, res) {
         if (!currInspiration) {
            chooseRandomInspiration(res);
         } else {
             res.status(200).send(currInspiration);
         }
    });


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
            console.log('problem with request: ' + err.message);
            callback(err, null);
        });
    }


    // GET API for getting live cricket matches from cricbuzz
    app.get('/api/cricket/:type', function (req, res) {

        try {
        if (req.params.type === 'cbLiveMatches') {
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
        } else if (req.params.type === 'cbCommentary' && req.query.matchUrl) {
            var matchId = req.query.matchUrl;
            if (matchId) {
                let convMatchId = matchId.replace(/:/g, '/');
                let url = 'http://synd.cricbuzz.com/j2me/1.0/' + convMatchId + 'commentary.xml';
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
        } else if (req.params.type === 'cbScorecard' && req.query.matchUrl) {
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
        } catch(e) {
            console.error('Exception: ' + e);
            res.status(501);
            res.send(null);
        }
    });


    // GET API for getting live cricket matches from cricscore-api.appspot.com
    app.get('/api/cricket/livecricscore/:type', function (req, res) {

        try {
        if (req.params.type === 'csLiveMatches') {

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

        } else if (req.params.type === 'csLiveScore' && req.query.matchId) {

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

        } catch(e) {
            console.error('Exception: ' + e);
            res.status(501);
            res.send(null);
        }

    });

    //
    // FOR CRICKET NEWS AND UPDATES
    //
    app.get('/api/cricket/cricnews/:type', function (req, res) {

        try {
            if (req.params.type === 'top-headlines') {

                var url = 'https://newsapi.org/v2/top-headlines';
                url += '?sources=' + sources + '&apiKey=' + newsApiKey;

                https.get(url, function(response) {
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

            } else if (req.params.type === 'everything') {

                var url = 'https://newsapi.org/v2/everything';
                url += '?sources=' + sources + '&apiKey=' + newsApiKey;

                https.get(url, function(response) {
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
        } catch(e) {
            console.error('Exception: ' + e);
            res.status(501);
            res.send(null);
        }

    });






}



