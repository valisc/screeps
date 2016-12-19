var roleRepair = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if(creep.memory.repairing && creep.carry.energy == 0) {
      creep.memory.repairing = false;
      creep.say('harvesting');
    }
    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
      creep.memory.repairing = true;
      creep.say('repairing');
    }

    if(creep.memory.repairing) {
      var damagedStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: function(object){
        return (object.hits < object.hitsMax);
      }});
        
        
      if(damagedStructure) {
        if(creep.repair(damagedStructure) == ERR_NOT_IN_RANGE) {
          creep.moveTo(damagedStructure);
        }
      }
    }
    else {
      var sources = creep.room.find(FIND_SOURCES);
      if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
      }
    }
  }
};

module.exports = roleRepair;
