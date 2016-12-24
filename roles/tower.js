var roleTower = {

  /** @param {StructureTower} tower **/
  run: function(tower) {
    if(tower.energy > 0) {
      var hostiles = tower.room.find(FIND_HOSTILE_CREEPS);
      if(hostiles.length > 0) {
          tower.attack(hostiles[0]);
      }
      
      var damagedStructures = tower.room.find(FIND_STRUCTURES, {filter: (object) => {
        return (object.structureType != STRUCTURE_WALL && object.hits < object.hitsMax) ||
        (object.structureType == STRUCTURE_WALL && object.hits < 20000);
      }});


      if(damagedStructures.length > 0) {
        tower.repair(damagedStructures[0]);
      }
    }
  }
};

module.exports = roleTower;
