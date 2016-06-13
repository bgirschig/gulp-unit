// node unit testing
var colors = require('colors');

var nodeTesting = {};
(function(){
	nodeTesting = {
		currentTest:null,
		// result arrays
		passed:[],
		failed:[],
		// test list
		tests:{}
	}

	// Test handling functions
	nodeTesting.addTest = function(name, testFunction){
		if(this.tests[name]!=null)
			console.log(("Test '"+name+"' is defined multiple times. last declaration will prevail").red);
		this.tests[name] = testFunction;
	}
	nodeTesting.reset = function(){
		this.passed = [];
		this.failed = [];
		this.currentTest = null;
		this.tests = {};
	}

	// Testing functions
	nodeTesting.equals = function(actual, expected){
		if(actual==expected) this.passed.push(this.currentTest);
		else this.failed.push(this.currentTest);
	}
	nodeTesting.notEquals = function(actual, expected){
		if(actual!=expected) this.passed.push(this.currentTest);
		else this.failed.push(this.currentTest);
	}
	nodeTesting.isTrue = function(value){
		if(value) this.passed.push(this.currentTest);
		else this.failed.push(this.currentTest);
	}
	nodeTesting.isFalse = function(value){
		if(!value) this.passed.push(this.currentTest);
		else this.failed.push(this.currentTest);
	}

	nodeTesting.run = function(name){
		// execute tests
		for(var testName in nodeTesting.tests){
			nodeTesting.currentTest = testName;
			nodeTesting.tests[testName]();
		}
		logResults(name);
		nodeTesting.reset();
	}
	function logResults(groupName){
		if (groupName == null) groupName = "Unit tests";
		console.log("\n"+groupName.bold);
		
		for (var i = 0; i < nodeTesting.passed.length; i++){
			console.log(("√ Test passed: "+nodeTesting.passed[i]).green);
		}
		for (var i = 0; i < nodeTesting.failed.length; i++){
			console.log(("✖ Test failed: "+nodeTesting.failed[i]).red);
		}
		// Test statistics
		var passedCount = nodeTesting.passed.length;
		var failedCount = nodeTesting.failed.length;
		if(failedCount==0){
			console.log("=> "+"all tests passed".green.bold);
		} else{
			console.log("=> "+(passedCount+" tests passed, "+(failedCount+" failed").red).bold);
		}
	}

	module.exports = nodeTesting;
})();