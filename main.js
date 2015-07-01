var populationCount = 1;
var clickIncrease = 1; //amount population increase for each click
var taxMoney = 1; 
var taxPerPop = 1; //amount tax gained every five seconds for each inhabitant

//variables for number of each upgrade bought
var taxCollectors = 0;
var realtors = 0; 

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

function buyMoneyUpgrade (baseCost, baseIncrease){
	cost = baseCost + baseCost * taxCollectors; 
	if (taxMoney >= cost){
		taxMoney -= cost;
		taxPerPop += baseIncrease;
		taxCollectors ++;
		showMoney();
		document.getElementById("taxRate").innerHTML = taxPerPop + "kr per inhabitants";
		document.getElementById("taxCollectorCost").innerHTML = cost + baseCost;

	} else {
		alert("You do not have enough money.")

	};

}


function buyPopUpgrade (baseCost, baseIncrease){
	cost = baseCost + baseCost * realtors; 
	if (taxMoney >= cost){
		taxMoney -= cost;
		clickIncrease += baseIncrease;
		realtors ++;
		showMoney();
		document.getElementById("popPerClick").innerHTML = clickIncrease + "population per click";
		document.getElementById("realtorCost").innerHTML = cost + baseCost;

	} else {
		alert("You do not have enough money.")

	};

}