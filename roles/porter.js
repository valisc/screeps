var rolePorter = {

  /** @param {Creep} creep **/
  run: function(creep) {
    var findDest = () => {
        var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
              var spawn = (structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
              var needyTower = structure.structureType == STRUCTURE_TOWER && structure.energy*4 < structure.energyCapacity
              return spawn || needyTower;
            }
          });
        
    
        if(target === null) {
            targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
              var container = (structure.structureType == STRUCTURE_CONTAINER ||
                    structure.structureType == STRUCTURE_STORAGE) && 
                    structure.store[RESOURCE_ENERGY]*4 < structure.storeCapacity  && structure.room.find(FIND_SOURCES).every((source) => source.pos.getRangeTo(structure) > 2) ;
              return container;
            }
            
            
          });
          targets.sort((a,b) => {
                if(a.structureType == STRUCTURE_CONTAINER) {
                    if(b.structureType == STRUCTURE_CONTAINER) {
                        return a.store[RESOURCE_ENERGY] - b.store[RESOURCE_ENERGY]
                    } else {
                        return -1;
                    }
                } else if(a.structureType == STRUCTURE_STORAGE) {
                    return 1;
                }
            });
            target = targets[0];
        }   
        return target;
    };
    var findSource = () => {
        var storageContainer = [STRUCTURE_CONTAINER, STRUCTURE_STORAGE];
        var sources = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
            return storageContainer.some((container) => {return container === structure.structureType}) &&
                    structure.store[RESOURCE_ENERGY] > 0  && structure.room.find(FIND_SOURCES).some((source) => source.pos.getRangeTo(structure) <=2) ;
        }});
        var sourceIndex = Math.floor(Game.time / 130) % sources.length;
        return sources[sourceIndex];
    };
    /*
    if(creep.memory.target === null || creep.memory.target === undefined) {
        // find one
        if(creep.carry.energy > 0) {
            creep.memory.target = findDest();
            
        } else {
            creep.memory.target = findSource();
        }
        define if it is a withdraw or deposit
    } else if(! creep.pos.isNearTo(creep.memory.target)) {
        creep.moveTo(target);
    } else {
        if(creep.carry.energy > 0) {
            creep.transfer(target,creep.carry.energy);
        } else { // assume it is a withdraw
            creep.withdraw(target, RESOURCE_ENERGY, creep.carryCapacity - creep.carry);
        }
    }*/
    var dest = Game.getObjectById("58589b1bfb90299a321dd9c7");
    dest = Game.getObjectById('585c23fcc330fe943a04247f');
    var src = Game.getObjectById("58594ab6e7f714d4184322ea");
    //TODO better porter management
    // ReWrite as state machine
    // empty, select source, select dest, moving, opportunistic benefits
    // porters must search for dropped energy
    // carry to workers
    // take from source containers and move to dump containers
    // source containers are containers within a range of a source point
    // keep that source as a target until the task is completed or it remains empty for more than _some_time_
    

    var target = findDest();
    var source = findSource();

    var energy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 1);

    if (energy.length) {
        console.log('found ' + energy[0].energy + ' energy at ', energy[0].pos);
        creep.pickup(energy[0]);
    }

    
    if(creep.carry.energy == 0 && creep.withdraw(source, RESOURCE_ENERGY, creep.carryCapacity - creep.carry) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
    } else if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    }
    var nearby = creep.pos.findInRange(_.filter(Game.creeps, (_creep) => {
        return _creep.memory.role !== 'porter' && _creep.carry.energy < _creep.carryCapacity;
    }), 1);
    if(creep.carry.energy > 0 && nearby.length > 0){
        var desires = nearby[0].carryCapacity - nearby[0].carry.energy;
        creep.transfer(nearby[0], Math.min(desires, creep.carry.energy));
    }
    
  }
};

module.exports = rolePorter
