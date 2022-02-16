//initializing fuction when the script loads
function initialize(){
	cities();
	addEvents();
};
//function to create a table for their cities and populations
function cities(){
	//define two arrays for cities and populations
	var cityPop = [
		{ 
			city: 'Madison',
			population: 233209
		},
		{
			city: 'Milwaukee',
			population: 594833
		},
		{
			city: 'Green Bay',
			population: 104057
		},
		{
			city: 'Superior',
			population: 27244
		}]

  //create the table element
  var table = document.createElement("table");

  //create a header row
  var headerRow = document.createElement("tr");

  //add the "City" and "Population" columns to the header row
  headerRow.insertAdjacentHTML("beforeend","<th>City</th><th>Population</th>")

  //add the row to the table
  table.appendChild(headerRow);

  //loop to add a new row for each city
  for(var i = 0; i < cityPop.length; i++){
	  //assign longer html strings to a variable
	  var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
	  //add the row's html string to the table
	  table.insertAdjacentHTML('beforeend',rowHtml);
  }
  //using a method chain to add the table to the myDiv element
  document.querySelector("#myDiv").appendChild(table);
  //calling addColumns function to add additional column to table
  addColumns(cityPop);
}
//executing script as soon as the DOM is prepared
document.addEventListener('DOMContentLoaded',initialize)

//declaring new function addColumns(cityPop)
function addColumns(cityPop){
    //using a method chain to loop elements selected with querySelectorAll
    document.querySelectorAll("tr").forEach(function(row, i){
		//for header row (i == 0) giving label 'City Size'
    	if (i == 0){

    		row.insertAdjacentHTML('beforeend', '<th>City Size</th>');
		//for other rows, defining new variable citySize and categorizing them according to cityPop
    	} else {

    		var citySize;

    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';

    		} else if (cityPop[i-1].population < 500000){
    			citySize = 'Medium';

    		} else {
    			citySize = 'Large';
    		};
			//giving label assigned to citySize to each row
			row.insertAdjacentHTML('beforeend', '<td>' + citySize + '</td>');
    	};
    });
};

//declaring new function addEvents()
function addEvents(){
	//using a method chain to add "mouseover" event to table
	document.querySelector("table").addEventListener("mouseover", function(){
		//assigning random color to event
		var color = "rgb(";

		for (var i=0; i<3; i++){

			var random = Math.round(Math.random() * 255);

			color += random;

			if (i<2){
				color += ",";
			
			} else {
				color += ")";
		};
		//making color appear when event is executed
		document.querySelector("table").style.color = color;
	};
	//declaring new function clickMe()
	function clickme(){
		//giving alert with the following string
		alert('Hey, you clicked me!');
	};
	//making function execute when event "click" occurs
	document.querySelector("table").addEventListener("click", clickme)
});
};
//defining callback function to access response from fetch request
function debugCallback(response){
	//inserting GeoJSON data in string form
	document.querySelector('#myDiv').insertAdjacentHTML('beforeend', 'GeoJSON data: ' + JSON.stringify(response));
};
//defining fetch request
function debugAjax(){
	//fetching data
	fetch('data/MegaCities.geojson')
		//anonymous function returns data as an object...  ?
		.then(function(response){
			return response.json();
		})
		//running debugCallback function
		.then(debugCallback)
};
//running debugAjax function
document.addEventListener('DOMContentLoaded',debugAjax)