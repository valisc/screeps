var roleHarvester = {

  /** @param {Creep} creep **/
  run: function(creep) {
  	if(creep.carry.energy == 0 || creep.memory.hungry === undefined) {
        creep.memory.hungry = creep.pos.findClosestByRange(FIND_SOURCES).id;
    }
    if(creep.carry.energy == creep.carryCapacity) {
        creep.memory.hungry = null;
    }
    
    if(creep.memory.hungry) {
        var source = Game.getObjectById(creep.memory.hungry);
      if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }
    else {
      var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        }
      });

      if(target !== undefined) {
        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      }
    }
  }
};

module.exports = roleHarvester
