var populationCount = 0;

function increasePopulation(){
	populationCount + 1;

	document.getElementById("population").innerHTML = populationCount;
	return populationCount;

};