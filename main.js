var populationCount = 1;
var clickIncrease = 1;
var taxMoney = 0;
var taxPerPop = 1;
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
	taxMoney -= baseCost;
	taxPerPop ++;
	showMoney()
}