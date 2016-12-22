var rolePorter = {

  /** @param {Creep} creep **/
  run: function(creep) {
    creep.say('I port');
    var dest = Game.getObjectById("58589b1bfb90299a321dd9c7");
    var src = Game.getObjectById("58594ab6e7f714d4184322ea");
    //TODO better porter management
    // porters must search for dropped energy
    // carry to workers
    // take from source containers and move to dump containers
    // source containers are containers within a range of a source point
    // keep that source as a target until the task is completed or it remains empty for more than _some_time_
    var sources = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
        return (structure.structureType == STRUCTURE_CONTAINER ||
                structure.structureType == STRUCTURE_STORAGE) &&
                structure.store[RESOURCE_ENERGY] > 0  && structure.room.find(FIND_SOURCES).some((source) => source.pos.getRangeTo(structure) <=2) ;
    }});

    var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        }
      });

    if(target === null) {
        target = dest;
    }

    var energy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 1);

    if (energy.length) {
        console.log('found ' + energy[0].energy + ' energy at ', energy[0].pos);
        creep.pickup(energy[0]);
    }

    var sourceIndex = Math.floor(Game.time / 100) % sources.length;
    if(creep.carry.energy == 0 && creep.withdraw(sources[sourceIndex], RESOURCE_ENERGY, creep.carryCapacity - creep.carry) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[sourceIndex]);
    } else if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    }
    
  }
};

module.exports = rolePorter
