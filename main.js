var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');
var roleEndOfLife = require('role.end_of_life');
var rolePorter = require('role.porter');
var roleMiner = require('role.miner');

var BUILDER = 'builder';
var UPGRADER = 'upgrader';
var HARVESTER = 'harvester';
var REPAIR = 'repair';
var END_OF_LIFE = 'end_of_life';
var PORTER = 'porter';
var MINER = 'miner';

var populate = function(role, count) {
  if(Game.creeps.length < count) {
    var size = [WORK,CARRY,MOVE];
    
    if(Game.spawns['Spawn1'].room.energyAvailable >= 650) { 
      size = [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE];
    } else if(Game.spawns['Spawn1'].room.energyAvailable >= 500) { 
      size = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE];
    } else if(Game.spawns['Spawn1'].room.energyAvailable >= 350) {
      size = [WORK,WORK,CARRY,MOVE, MOVE];
    }
    
    var newName = Game.spawns['Spawn1'].createCreep(size, undefined, {role: HARVESTER});
    console.log('Spawning new '+ HARVESTER +': ' + newName); 
  }
}

module.exports.loop = function () {
  //populate(7);
  
  for(var name in Game.creeps) {
    if(!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }

    var creep = Game.creeps[name];
    if(creep.ticksToLive < 100 || creep.memory.renewing || creep.memory.role == END_OF_LIFE) {
        roleEndOfLife.run(creep);
    } else {
        if(creep.memory.role == UPGRADER) {
          roleUpgrader.run(creep);
        }
       if(creep.memory.role == BUILDER) {
          roleBuilder.run(creep);
        }
       if(creep.memory.role == REPAIR) {
          roleRepair.run(creep);
        }
        if(creep.memory.role == PORTER) {
          rolePorter.run(creep);
        }
        if(creep.memory.role == MINER) {
          roleMiner.run(creep);
        }
    
        if(creep.memory.role == HARVESTER ) {
          if(creep.room.energyAvailable <= creep.room.energyCapacityAvailable  ||
                (creep.memory.hungry && creep.pos.isNearTo(Game.spawns['Spawn1']))   ) {
            roleHarvester.run(creep);
          } else {
            roleUpgrader.run(creep);
          }
        }
        
    }
    

  }
}
