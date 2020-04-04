const express = require('express')
const app = express()
const mongoDBModule = require('./app_modules/crud');

app.get('/', function (req, res) {
	res.send('Hello World!')
})

app.listen(8888, function () {
	console.log('Example app listening on port 8888!')
})


app.get('/cas', function (req, res) {
	let classification = req.query.classification || '';
	let zone = req.query.zone || '';
	let resume = req.query.resume || '';
	mongoDBModule.findcasByFilter(classification, zone, resume, function (cas, count) {
		let responseJson = { "count": count, "data": cas }
		res.send(responseJson);
	})
})

app.get('/cas/:id', function (req, res) {
	const idCas = parseInt(req.params.id);
    mongoDBModule.findCasById(idCas, function (cas) {
        res.send(JSON.stringify(cas));
    })
});

app.get('/temoignages/:id', function (req, res) {
    const idTemoignage = parseInt(req.params.id);
    mongoDBModule.findTemoignageById(idTemoignage, function (temoignage) {
        res.send(JSON.stringify(temoignage));
    })
});

app.get('/cas/:id/temoignages', function (req, res) {
    const idCas = parseInt(req.params.id);
    mongoDBModule.findTemoignagesByCasId(idCas, function (temoignages, count) {
        let responseJson = { "count": count, "data": temoignages }
        res.send(JSON.stringify(responseJson));
    })
});