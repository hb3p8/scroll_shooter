function PlayerState(initHull, initEnergy, maxHull, maxEnergy){

	this.maxHull = maxHull;
	this.maxEnergy = maxEnergy;

	this.hull = initHull;
	this.energy = initEnergy;

	this.rechargeRate = 1.5;
	this.laserShootEnergyCost = 0.5;
	this.shieldHitCost = 3.0;
	this.hullHitCost = 1.0;

}

PlayerState.prototype.updateState = function(deltaTime){

	this.energy += this.rechargeRate * deltaTime;
	if(this.energy > this.maxEnergy)
		this.energy = this.maxEnergy;

}

PlayerState.prototype.hitByEnemy = function(){

	this.energy -= this.shieldHitCost;
	if(this.energy < 0.0){
		this.hull -= this.hullHitCost;
		this.energy = 0.0;
	}

}

PlayerState.prototype.shoot = function(){

	if(this.energy >= this.laserShootEnergyCost){
		this.energy -= this.laserShootEnergyCost;
		return true;
	}	
	else 
		return false;

}