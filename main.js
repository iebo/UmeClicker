var populationCount = 1;
var clickIncrease = 1; //amount population increase for each click
var taxMoney = 1; 
var taxPerPop = 1; //amount tax gained every five seconds for each inhabitant


//variables for number of each upgrade bought
var taxCollectors = 0;
var realtors = 0; 


//cost of upgrades
var taxCollectorCost = 100;
var realtorCost = 1000;

function showPopulation(){
	document.getElementById("population").innerHTML = populationCount + 1;
	return populationCount;
	taxes();

};

function updateData(){ //updates all data points with correcct values
	document.getElementById("population").innerHTML = populationCount;
	document.getElementById("money").innerHTML = taxMoney + " kr";
	document.getElementById("taxRate").innerHTML = taxPerPop + " kr per inhabitants";
	document.getElementById("popPerClick").innerHTML = clickIncrease + " inhabitants per click";
	document.getElementById("realtorCost").innerHTML = costIncrease (realtorCost, realtors) + " kr";	
	document.getElementById("taxCollectorCost").innerHTML = costIncrease (taxCollectorCost, taxCollectors) + " kr";

}

function taxes(){
	setInterval(function(){ 
  		taxMoney += populationCount * taxPerPop;
		document.getElementById("money").innerHTML = taxMoney + " kr";
}, 10000);
}
function showMoney(){
	document.getElementById("money").innerHTML = taxMoney + " kr";

}

function costIncrease (baseCost, upgradeNumber){ //
	return baseCost + Math.pow(upgradeNumber, 2) + upgradeNumber * baseCost * 2; 

};



function buyMoneyUpgrade (baseCost, baseIncrease){
	cost = costIncrease (baseCost, taxCollectors); 
	if (taxMoney >= cost){
		taxMoney -= cost;
		taxPerPop += baseIncrease;
		taxCollectors ++;
		showMoney();
		document.getElementById("taxRate").innerHTML = taxPerPop + " kr per inhabitants";
		document.getElementById("taxCollectorCost").innerHTML = costIncrease(baseCost, taxCollectors + 1) + "kr";
		taxCollectorCost = baseCost;
	} else {
		alert("You do not have enough money.")

	};

}


function buyPopUpgrade (baseCost, baseIncrease){
	cost = costIncrease(baseCost, realtors); 
	if (taxMoney >= cost){
		taxMoney -= cost;
		clickIncrease += baseIncrease;
		realtors ++;
		showMoney();
		document.getElementById("popPerClick").innerHTML = clickIncrease + " inhabitants per click";
		document.getElementById("realtorCost").innerHTML = costIncrease (realtorCost, realtors + 1);
		realtorCost = baseCost;
	} else {
		alert("You do not have enough money.")

	};

}

function saveGame (){
	var save = {
		populationCount: populationCount,
		clickIncrease: clickIncrease, //amount population increase for each click
		taxMoney: taxMoney,
		taxPerPop: taxPerPop, //amount tax gained every five seconds for each inhabitant

		//variables for number of each upgrade bought
		taxCollectors: taxCollectors,
		realtors: realtors, 		
	}
	localStorage.setItem("save",JSON.stringify(save));

}

function loadGame (){
	var savegame = JSON.parse(localStorage.getItem("save"));
	if (typeof savegame.populationCount !== "undefined") populationCount = savegame.populationCount;
	if (typeof savegame.clickIncrease !== "undefined") clickIncrease = savegame.clickIncrease;
	if (typeof savegame.taxMoney !== "undefined") taxMoney = savegame.taxMoney;
	if (typeof savegame.taxPerPop !== "undefined") taxPerPop = savegame.taxPerPop;
	if (typeof savegame.realtors !== "undefined") realtors = savegame.realtors;
	if (typeof savegame.taxCollectors !== "undefined") taxCollectors = savegame.taxCollectors;

}

function deleteGame(){
	if (confirm("Are you sure you want to delete your game permanently") == true){
			localStorage.removeItem("save");
			location.reload();

	};

}
$(document).ready(function(){
	loadGame();
});