var roleTower = {

  /** @param {StructureTower} tower **/
  run: function(tower) {
    if(tower.energy > 0) {
      var hostiles = tower.room.find(FIND_HOSTILE_CREEPS);
      if(hostiles.length > 0) {
          tower.attack(hostiles[0]);
      } else {
          var damagedUnits = tower.room.find(FIND_MY_CREEPS, {filter: (object) => {
            return (object.hits < object.hitsMax - 149);
          }});
          if(damagedUnits.length > 0) {
            tower.heal(damagedUnits[0]);    
          } else {
      
              var damagedStructures = tower.room.find(FIND_STRUCTURES, {filter: (object) => {
                return (object.structureType != STRUCTURE_WALL && object.structureType != STRUCTURE_RAMPART && object.hits < object.hitsMax - 149) ||
                (object.structureType == STRUCTURE_WALL && object.hits < 120000) ||
                (object.structureType == STRUCTURE_RAMPART && object.hits < 120000);
              }});
        
              ;
              if(damagedStructures.length > 0) {
                tower.repair(_.sortBy(damagedStructures, (_struct) => {return _struct.hits;})[0]);
              }        
          }
      }
      
    }
  }
};

module.exports = roleTower;
