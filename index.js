var through = require('through2');
var Testing = require('testing')

const PLUGIN_NAME = 'gulp-testing';

function unitTest(){
	return through.obj(function(file, enc, cb) {
		if (file.isNull()) {
			// return empty file
			return cb(null, file);
		}
		if(file.isBuffer()){
			eval(file.contents.toString('utf-8'));
		}
		if(file.isStream()){
			console.log("stream not supported");
		}
	});
}

module.exports = unitTest;