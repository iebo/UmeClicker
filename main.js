var populationCount = 1;
var clickIncrease = 1;
var taxMoney = 1;
var taxPerPop = 1;
var taxCollectors = 0;
function showPopulation(){
	document.getElementById("population").innerHTML = populationCount + 1;
	return populationCount;
	taxes();

};
function taxes(){
	setInterval(function(){ 
  		taxMoney += populationCount * taxPerPop;
		document.getElementById("money").innerHTML = taxMoney + "kr";
}, 5000);
}
function showMoney(){
	document.getElementById("money").innerHTML = taxMoney + "kr";

}

function buyUpgrade (baseCost){
	cost = baseCost + baseCost * taxCollectors; 
	if (taxMoney >= cost){
		taxMoney -= cost;
		taxPerPop ++;
		taxCollectors ++;
		showMoney();
		document.getElementById("taxRate").innerHTML = taxPerPop + "kr per inhabitants";
		document.getElementById("taxCollectorCost").innerHTML = cost;

	} else {
		alert("You do not have enough money.")

	};

}