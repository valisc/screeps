var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');
var roleEndOfLife = require('role.end_of_life');
var rolePorter = require('role.porter');
var roleMiner = require('role.miner');
var roleTower = require('role.tower');
var roleKite = require('role.kite');
var roleSolider = require('role.solider');

var BUILDER = 'builder';
var UPGRADER = 'upgrader';
var HARVESTER = 'harvester';
var REPAIR = 'repair';
var END_OF_LIFE = 'end_of_life';
var PORTER = 'porter';
var MINER = 'miner';
var SOLIDER = 'solider';

var populate = function(role, count) {
  if(Game.creeps.length < count) {
    var size = [WORK,CARRY,MOVE];
    // _.range(2 * Math.floor(Game.spawns.Spawn1.room.energyAvailable / (3*50))).map((_) => {return WORK;})
    //    .concat(2 * Math.floor(Game.spawns.Spawn1.room.energyAvailable / (3*50))).map((_) => {return MOVE;})
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
  for(var name in Memory.creeps) {
      if(!Game.creeps[name]) {
          delete Memory.creeps[name];
          console.log('Clearing non-existing creep memory:', name);    
      }
  }
  
  for(var name in Game.creeps) {
    var creep = Game.creeps[name];
    if(creep.ticksToLive < 100 || creep.memory.renewing || creep.memory.role == END_OF_LIFE) {
        roleEndOfLife.run(creep);
    } else {
        if(creep.memory.role == UPGRADER) {
          creep.say("I upgrade");
          roleUpgrader.run(creep);
        }
       if(creep.memory.role == BUILDER) {
          creep.say("I build");
          roleBuilder.run(creep);
        }
       if(creep.memory.role == REPAIR) {
          creep.say("I repair");
          roleRepair.run(creep);
        }
        if(creep.memory.role == PORTER) {
            creep.say("I port");
          rolePorter.run(creep);
        }
        
        if(creep.memory.role == SOLIDER) {
            creep.say("I fight");
          roleSolider.run(creep);
        }
        if(creep.memory.role == MINER) {
            creep.say("I mine");
          roleMiner.run(creep);
        }
        if(creep.memory.role == BUILDER) {
          if(creep.room.find(FIND_CONSTRUCTION_SITES).length > 0) {
            creep.say("I build");
            roleBuilder.run(creep);
          } else {
              creep.say("I upgrade");
            roleUpgrader.run(creep);
          }
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
  roleTower.run(Game.getObjectById("585c527a86a777c82637fcba"));
  roleTower.run(Game.getObjectById("58615ccddacba46869ff0e78"));
}
