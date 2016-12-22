var roleMiner = {

  /** @param {Creep} creep **/
  run: function(creep) {
    creep.say('I mine');
  	if(creep.carry.energy == 0 || creep.memory.hungry === undefined) {
  	    var isOtherMiner = (_creep) => {return _creep.memory.role === 'miner' && creep !== _creep; };
  	    var miners = _.filter(Game.creeps,isOtherMiner);
  	    var freeSource = creep.pos.findClosestByRange(FIND_SOURCES, {filter: (source) => {
  	        return source.pos.findInRange(miners,3).length == 0;
  	    }});
  	    creep.memory.hungry = freeSource.id;
    }
    if(creep.carry.energy >= 48) {
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
          return structure.structureType === STRUCTURE_CONTAINER;
        }
      });

      if(target !== null) {
        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      }
    }
  }
};

module.exports = roleMiner
