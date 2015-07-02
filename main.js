var populationCount = 199999;
var clickIncrease = 1; //amount population increase for each click
var taxMoney = 100000000; 
var taxPerPop = 1; //amount tax gained every ten seconds for each inhabitant
var populationGrowth = 0  // population growth every five second(inhabitants added)

//variables for number of each upgrade bought
var taxCollectors = 0;
var realtors = 0; 
var advertisers = 0;

//cost of upgrades
var taxCollectorCost = 100;
var realtorCost = 1000;
var advertiserCost = 10000;

var past200 = 0;



function showPopulation(){
	document.getElementById("population").innerHTML = populationCount + 1;
	return populationCount;
	taxes();

};

function updateData(){ //updates all data points with correcct values
	document.getElementById("population").innerHTML = populationCount;
	document.getElementById("money").innerHTML = (""+taxMoney).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " kr" ;
	document.getElementById("taxRate").innerHTML = taxPerPop + " kr per inhabitants";
	document.getElementById("populationGrowth").innerHTML = "+ " + populationGrowth + " population every five seconds";
	document.getElementById("popPerClick").innerHTML = clickIncrease + " inhabitants per click";
	document.getElementById("realtorCost").innerHTML = costIncrease (realtorCost, realtors) + " kr";	
	document.getElementById("taxCollectorCost").innerHTML = costIncrease (taxCollectorCost, taxCollectors) + " kr";
	document.getElementById("advertiserCost").innerHTML = costIncrease (advertiserCost, advertisers) + " kr";

}

function taxes(){
	setInterval(function(){ 
  		taxMoney += populationCount * taxPerPop;
		document.getElementById("money").innerHTML = taxMoney + " kr";
  		populationCount += populationGrowth;
		document.getElementById("population").innerHTML = populationCount;
		check200();
}, 10000);
}


function showMoney(){
	document.getElementById("money").innerHTML = taxMoney + " kr";

}

function costIncrease (baseCost, upgradeNumber){ //
	return baseCost + Math.pow(upgradeNumber, 2) + upgradeNumber * baseCost * 2; 

};

function buyGrowthUpgrade(baseCost, baseIncrease){
	cost = costIncrease(baseCost, realtors); 
	if (taxMoney >= cost){
		taxMoney -= cost;
		populationGrowth += baseIncrease;
		advertisers ++;
		showMoney();
		document.getElementById("populationGrowth").innerHTML = "+ " + populationGrowth + " population every five seconds";
		document.getElementById("advertiserCost").innerHTML = costIncrease(baseCost, advertisers + 1) + " kr";
		taxCollectorCost = baseCost;
	} else {
		alert("You do not have enough money.")

	};

	
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
		document.getElementById("realtorCost").innerHTML = costIncrease (realtorCost, realtors + 1) + " kr";
		realtorCost = baseCost;
	} else {
		alert("You do not have enough money.")

	};

}

function check200(){
	if (populationCount >= 200000 && past200 === 0){
		addImage("Umea2012.jpg", "heart")
		past200 += 1;
	}
}

function addImage(imageLink, imageID) {
			    var x = document.createElement("IMG");
			    var imageLink;
			    var imageID;
			    x.setAttribute("src", imageLink);
			    x.setAttribute("width", "100");
			    x.setAttribute("width", "100");
			    x.setAttribute("alt", imageID);
			    document.body.appendChild(x);
}


function saveGame (){
	var save = {
		populationCount: populationCount,
		clickIncrease: clickIncrease, //amount population increase for each click
		taxMoney: taxMoney,
		taxPerPop: taxPerPop, //amount tax gained every five seconds for each inhabitant
		populationGrowth: populationGrowth,
		//variables for number of each upgrade bought
		taxCollectors: taxCollectors,
		realtors: realtors, 		
		advertisers: advertisers,
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
	if (typeof savegame.advertisers !== "undefined") advertisers = savegame.advertisers;
	if (typeof savegame.populationGrowth !== "undefined") populationGrowth = savegame.populationGrowth;

	check200();

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