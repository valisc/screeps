var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleBuilder = require('role.repair');

var BUILDER = 'builder';
var UPGRADER = 'upgrader';
var HARVESTER = 'harvester';
var REPAIR = 'repair';

var populate = function(role) {
  if(_.filter(Game.creeps, (creep) => creep.memory.role == role).length < 2) {
    var size = [WORK,CARRY,MOVE];
    if(Game.spawns['Spawn1'].room.energyAvailable >= 550) {
      size = [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE];
    }
    var newName = Game.spawns['Spawn1'].createCreep(size, undefined, {role: role});
    console.log('Spawning new '+ role +': ' + newName);
  }
}

module.exports.loop = function () {
  populate(BUILDER);
  populate(UPGRADER);
  populate(HARVESTER);

  for(var name in Game.creeps) {
    if(!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }

    var creep = Game.creeps[name];
    if(creep.memory.role == HARVESTER ) {
      if(creep.room.energyAvailable < creep.room.energyCapacityAvailable) {
        roleHarvester.run(creep);
      } else {
        roleBuilder.run(creep);
      }
    }
    if(creep.memory.role == UPGRADER) {
      if(creep.room.controller.ticksToDowngrade < 1000) {
        roleUpgrader.run(creep);
      } else { 
        roleBuilder.run(creep);
      }
    }
    if(creep.memory.role == BUILDER) {
      roleBuilder.run(creep);
    }
  }
}
