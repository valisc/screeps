var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.say('I upgrade');
	    if(creep.carry.energy == 0 || creep.memory.hungry === undefined) {
	        creep.memory.hungry = true;
	    }
	    if(creep.carry.energy == creep.carryCapacity) {
	        creep.memory.hungry = false;
	    }
	    
	    if(creep.memory.hungry) {
	        var storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (struct) => {
	            return struct.structureType === STRUCTURE_CONTAINER && struct.store[RESOURCE_ENERGY] > 0;
	        }});
	        if(creep.pos.isNearTo(storage)) {
	            creep.withdraw(storage, RESOURCE_ENERGY, creep.carryCapacity - creep.carry);
	            creep.memory.hungry = false;
	        } else {
	            creep.moveTo(storage);
	        }
        }
        else {
            if(creep.pos.isNearTo(creep.room.controller)) {
	            creep.upgradeController(creep.room.controller);
	        } else {
	            creep.moveTo(creep.room.controller);
	        }
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
	}
};

module.exports = roleUpgrader;
