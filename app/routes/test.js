var express = require('express');
var router = express.Router();

var epsilon = require('epsilonjs');



var jsonfile = require('jsonfile');
var file = 'data/test.json';

var jsonf = jsonfile.readFileSync(file);

var data = jsonf.nodes;

var chars = jsonf.Links;

var matrixArray = [chars.length];

var results = [];

for(var k = 0; k < chars.length ; k++){
	matrixArray[k] = chars[k].Source;
}

//console.log(matrixArray[1]);

var json = [];

// var matrix = [],
var n = data.length;

//var array = [];
for(var i = 0; i < n; i++){

	// Compute index per node.
	// data[i].index = i;
 	// data[i].count = 0;
	
	// matrix[i] = d3.range(n).map(function(j) { return {x: j, y: i, z: 0}; });

	var s1 = data[i].Ground_truth;
    var s2 = data[i].Prediction;

    //console.log(leven);

	var longer = s1;
	var shorter = s2;
	if (s1.length < s2.length) {
		longer = s2;
		shorter = s1;
	}
	var longerLength = longer.length;
	var shorterLength = shorter.length;

	var s1Array = Array.from(s1);
    var s2Array = Array.from(s2);

	
	// if (longerLength == 0) {
	// 	json[i] = {"Ground" : s1, "Prediction": s2, "Match" : 1.0};
	// }
	results[i] = [shorterLength];
	for(var j=0; j < shorterLength; j++){

		results[i][j] = [2];
		results[i][j][0] = s1Array[j];
		results[i][j][1] = s2Array[j];

		// if(s1Array[j] == s2Array[j]){
		// 	console.log("Matched : " + s1Array[j] +' , '+ s2Array[j]);
		// }else{
		// 	console.log("Not Matched : " + s1Array[j] +' , '+ s2Array[j]);
		// }
	}
	

	// 	//array[i] = s1.split(' ');

	//console.log(results[i]);
	
	
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('test', 
  	{ title: 'String Comparison', 
  	  links: matrixArray,
  	  results: results
	}
  	);
});

module.exports = router;
