var roleKite = {

  /** @param {Creep} creep **/
  run: function(creep) {
      if(Game.flags['ExpansionRoom'].room !== creep.room) {
        creep.moveTo(Game.flags['ExpansionRoom']);  
      } else {
      
        //function(enemy){enemy.owner.username !== 'Source Keeper'}
        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        var range = creep.pos.getRangeTo(target);
        console.log(target);
        if(range > 3){
          creep.moveTo(target);
        } else if(range == 3) {
          creep.attack(target);
        } else {
          creep.moveTo((creep.pos.getDirectionTo(target) + 4) % 8);
  }    
      }
      
  }
};

module.exports = roleKite;
