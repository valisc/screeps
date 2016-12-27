var roleSolider = {

  /** @param {Creep} creep **/
  run: function(creep) {
    var postPosition = (position) => {
        var _pos;
        if(typeof position === 'string') {
            _pos = Game.getObjectById(position).pos
        } else {
            _pos = new RoomPosition(position.x, position.y, position.roomName);
        }
        return _pos;
    };
    
    var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if(target && creep.attack(target) === ERR_NOT_IN_RANGE) {
      if(creep.memory.post && creep.pos === postPosition(creep.memory.post)) {
      } else {
        creep.moveTo(target);    
      }
      
    } else {
        if(creep.memory.path && creep.memory.path.length > 0) {
            if(creep.move(creep.memory.path[0].direction) == OK) {
                creep.memory.path.shift();
            }
        } else {
            if(creep.memory.post) {
                creep.memory.path = creep.pos.findPathTo(postPosition(creep.memory.post));
            }
        }
    }
  }
};

module.exports = roleSolider;
