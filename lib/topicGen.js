fs = require('fs');

var topicSource = function( callback ) {
	fs.readFile('./sample.txt', 'utf8', function (err,data) {
	if (err) callback('');
	else callback(data);
	});
}

var getPlantExamText = function( data ) {
	data = data.replace(/\x20an\x20|\x20a\x20|\x20the\x20/gi, ' ');
	data = data.replace(/\x20\x20/g, ' ');	
	return data;
}

var getHtmlPlantext = function( data ) {
	var htmlBase = 
	'<style>' + 
	'body { font-size: 25px; color:white; background-color: transparent; }' +
	'.contextmenu { position: absolute; list-style: none; padding: 5px;' +
	'background-color: #00bc8c; display: none; }' +
	'.contextmenu li:hover { background-color: #aaa; }' +
	'</style>' +
	'<script src="https://code.jquery.com/jquery-3.1.0.js"></script>' ;

	var posScript = '<script type="text/javascript" src="/fuckInsert.js"></script>'
	var contextMenu = 
	'<ul class="contextmenu">' +
    '<li onclick="insertStr(\'a\')">a</li>' +
    '<li onclick="insertStr(\'an\')">an</li>' +
    '<li onclick="insertStr(\'the\')">the</li>' +
    '</ul>';
    data = getPlantExamText(data);
	data = data.replace(/\n/g, '<br>');
	return htmlBase + posScript + contextMenu + '<div contenteditable="true">' + data + '</div>';
}

// export modules
module.exports.topicSource 		= topicSource;
module.exports.getHtmlPlantext	= getHtmlPlantext;
module.exports.getPlantExamText = getPlantExamText;