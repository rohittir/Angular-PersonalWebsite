


var http = require('http');
var https = require('https');
var fs = require("fs");
var JSSoup = require('jssoup').default;


var ipl2018Data = null;
var ipl2018DataUrls = ['', 'most-runs', 'best-batting-average', 'best-batting-strike-rate', 'most-sixes', 'fastest-fifties', 'highest-scores', 'most-wickets',
 'best-bowling-average', 'best-bowling-economy'];

module.exports = function(app) {

    // set the data extraction time
    setInterval(function () {
        var now = new Date();
        console.log(now.getUTCHours() + ':' + now.getUTCMinutes())
        if ( (now.getUTCHours() >= 13 && now.getUTCHours() <= 14)
            || (now.getUTCHours() >= 16 && now.getUTCHours() < 18)
            || (now.getUTCHours() == 20)
            || (now.getUTCHours() == 10)) {
            ipl2018Data = null;
        }
    }, 10 * 60 * 1000);


    function parseHTMLTableWithJSSoup(completeResponse) {

        var soup = new JSSoup(completeResponse);
        var tag = soup.find('table');
        var tableSoup = new JSSoup(tag.prettify());

        var rows = tableSoup.findAll('tr');
        let data = [];
        for(var i = 0; i < rows.length; i++) {
            var rowData = [];
            var rowSoup = new JSSoup(rows[i].prettify());

            var cellTag = 'td';
            if (i == 0) {
                cellTag = 'th';
            }
            var cells = rowSoup.findAll(cellTag);
            for (var j = 0; j < cells.length; j++) {
                rowData.push(cells[j].getText());
            }
            data.push(rowData);
        }


        let dataWithTimestamp = {data: data, updated: new Date().toUTCString()}
        return dataWithTimestamp;
    }


    function requestIPLStatsData(index, res) {
        if (index >= ipl2018DataUrls.length) {
            res.status(404);
            res.send(null);
            return;
        }
        try {
            var url = 'https://www.iplt20.com/stats/2018/';
            url += ipl2018DataUrls[index];

            https.get(url, function(response) {
                var completeResponse = '';
                response.on('data', function (chunk) {
                    completeResponse += chunk;
                });
                response.on('end', function () {
                    var data = parseHTMLTableWithJSSoup(completeResponse);

                    if (!ipl2018Data) {
                        ipl2018Data = [];
                    }
                    while (index >= ipl2018Data) {
                        ipl2018Data.push(null);
                    }
                    ipl2018Data[index] = data;
                    res.status(200);
                    res.send(ipl2018Data[index]);
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
    }

    //
    // FOR IPL 2-18 stats
    //
    app.get('/api/cricket/ipl2018/stats/:type', function (req, res) {

        if (req.params.type) {
            var index = parseInt(req.params.type);
            if (ipl2018Data && ipl2018Data[index]) {
                res.status(200);
                res.send(ipl2018Data[index]);
                return;
            } else {
                requestIPLStatsData(index, res);
            }
        }
    });


}



