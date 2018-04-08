

var http = require('http');
var https = require('https');
var fs = require("fs");
var JSSoup = require('jssoup').default;


var newsApiKey = '0c3f4aa05b9c46929d6a407a830eaebc';
var sources = 'espn-cric-info';

module.exports = function(app, passport, board) {


    //
    // READ USER DATA
    //

    // GET API for get user data
    app.get('/api/profile', function (req, res) {

        try {
        fs.readFile(__dirname + "/" + "assets/data/user-profile.json", 'utf8', function (err, data) {
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


    //
    // FOR IPL STANDINGS
    //
    app.get('/api/cricket/ipl/standings', function (req, res) {

         try {


            var url = 'https://www.iplt20.com/stats/2018';

            https.get(url, function(response) {
                var completeResponse = '';
                response.on('data', function (chunk) {
                    completeResponse += chunk;
                });
                response.on('end', function () {
                    // console.log(completeResponse);
                    var soup = new JSSoup(completeResponse);
                    var tag = soup.find('table');
                    var tableSoup = new JSSoup(tag.prettify());

                    var rows = tableSoup.findAll('tr');
                    let data = [];
                    for(var i = 1; i < rows.length; i++) {
                        var rowData = {};
                        var rank = rows[i].nextElement;
                        rowData.rank = rank.getText();
                        var team = rank.nextSibling;
                        rowData.team = team.getText();
                        var played = team.nextSibling;
                        rowData.played = played.getText();

                        var won = played.nextSibling;
                        rowData.won = won.getText();
                        var lost = won.nextSibling;
                        rowData.lost = lost.getText();
                        var tied = lost.nextSibling;
                        rowData.tied = tied.getText();
                        var NR = tied.nextSibling;
                        rowData.NR = NR.getText();

                        var NRR = NR.nextSibling;
                        rowData.NRR = NRR.getText();
                        var forTeam = NRR.nextSibling;
                        rowData.forTeam = forTeam.getText();
                        var against = forTeam.nextSibling;
                        rowData.against = against.getText();
                        var points = against.nextSibling;
                        rowData.points = points.getText();
                        var form = points.nextSibling;
                        rowData.form = form.getText();
                        data.push(rowData);
                    }

                    // var data = JSON.parse(completeResponse);
                    res.status(200);
                    res.send(data);
                })
            }).on('error', function (err) {
                res.status(500);
                res.send(null);
            });




         } catch(e) {
            console.error('Exception: ' + e);
            res.status(501);
            res.send(null);
         }


    });



}



