var roleEndOfLife = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.say('I renew');
        if(creep.memory.renewing === undefined || creep.ticksToLive < 100) {
           creep.memory.renewing = true; 
        } else if(creep.ticksToLive >= 1400) {
            creep.memory.renewing = false;
        }
        
        if(creep.memory.renewing && creep.pos.isNearTo(Game.spawns['Spawn1'])) {
            if(creep.carry.energy > 0) {
                creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY)
            }
            creep.say('renewing');
            Game.spawns['Spawn1'].renewCreep(creep);
        } else {
            creep.moveTo(Game.spawns['Spawn1']);
        }
	}
};

module.exports = roleEndOfLife;
