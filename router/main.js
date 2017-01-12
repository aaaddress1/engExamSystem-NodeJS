var fs = require('fs');
var express = require('express');
var router 	= express.Router();

var topicGen = require('../lib/topicGen');
var topicCmp = require('../lib/topicCmp');

router.get('/examData',function(req, res){ 
	topicGen.topicSource(function(scr) {
		res.set({ 'content-type': 'application/json; charset=utf-8' });
		res.end( JSON.stringify({ examHtml: topicGen.getHtmlPlantext(scr) },null,10) );
	});
});

router.get('/cmpAnsResult',function(req, res){ 
	topicCmp.topicSource(function(scrExam) {
		topicCmp.usrSource( function(scrUsr) {

			res.set({ 'content-type': 'application/json; charset=utf-8' });
			topicCmp.diffExam( scrExam, topicGen.getPlantExamText(scrExam), scrUsr, function(htmlOut) {
				res.end( JSON.stringify({ retHtml: htmlOut } ,null,10) );
			});
			
		});
	});
});
router.get('/examDataStatic',function(req, res) {
	res.render('displayResult.jade', {});
});
router.post('/examData',function(req, res) {
	var wstream = fs.createWriteStream('usrAns.txt');
	wstream.write(req.body.usrAns);
	wstream.end();
	res.render('displayResult.jade', {});
});

router.get('/',function(req, res){ 
  res.render('showExam.jade', {});		
});

// export module
module.exports = router;