var roleRepair = {

  /** @param {Creep} creep **/
  run: function(creep) {
    if(creep.carry.energy == 0) {
      creep.memory.repairing = false;
    }
    if(creep.carry.energy == creep.carryCapacity) {
      creep.memory.repairing = true;
    }



    if(creep.memory.repairing) {
        var damagedUnits = creep.room.find(FIND_MY_CREEPS, {filter: (object) => {
            return (object.hits < object.hitsMax);
          }});
          
          if(damagedUnits.length > 0) {
            if(creep.repair(damagedUnits[0]) == ERR_NOT_IN_RANGE) {
              creep.moveTo(damagedUnits[0]);
            }    
          } else {
              var damagedStructures = creep.room.find(FIND_STRUCTURES, {filter: function(object){
                return (object.structureType != STRUCTURE_WALL && object.structureType !== STRUCTURE_RAMPART && object.hits < object.hitsMax -400) ||
                (object.structureType == STRUCTURE_WALL && object.hits < 200000) ||
                (object.structureType == STRUCTURE_RAMPART && object.hits < 200000);
              }});
    
    
              if(damagedStructures.length > 0) {
                if(creep.repair(damagedStructures[0]) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(damagedStructures[0]);
                }
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
