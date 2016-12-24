var roleBuilder = {
                                                                                                          
  /** @param {Creep} creep **/                                                                            
  run: function(creep) {   
    if(creep.memory.building && creep.carry.energy == 0) {                                                
      creep.memory.building = false;                                                                      
    }                                                                                                     
    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {                             
      creep.memory.building = true;                                                                       
    }                                                                                                     
                                                                                                          
    if(creep.memory.building) {
      var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);                                             
      if(target !== null ) {                                                                                
        if(creep.build(target) == ERR_NOT_IN_RANGE) {                                                 
          creep.moveTo(target);                                                                       
        }                                                                                                 
      }                                                                                                   
    }                                                                                                     
    else {
        /*
      var target;
      if(creep.memory.hungry) {
        target = Game.getObjectById(creep.memory.hungry);
      } else {
        target = creep.pos.findClosestByRange(FIND_SOURCES);   
      }
       
      if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }*/
        
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
  }                                                                                                       
};                                                                                                        
                                                                                                          
module.exports = roleBuilder;
