var roleRepair = {

  /** @param {Creep} creep **/
  run: function(creep) {
    if(creep.memory.repairing && creep.carry.energy == 0) {
      creep.memory.repairing = false;
    }
    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
      creep.memory.repairing = true;
    }

    if(creep.memory.repairing) {
      var damagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: function(object){
        return (object.structureType != STRUCTURE_WALL && object.hits < object.hitsMax) ||
        (object.structureType == STRUCTURE_WALL && object.hits < 20000);
      }});


      if(damagedStructure) {
        if(creep.repair(damagedStructure) == ERR_NOT_IN_RANGE) {
          creep.moveTo(damagedStructure);
        }
      }
    }
    else {
      var source = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {
          return structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0;
      }});
      if(creep.withdraw(source, RESOURCE_ENERGY, creep.carryCapacity - creep.carry) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }
  }
};

module.exports = roleRepair;
