var u = require('util');
var type = "repair";
module.exports = {
  actionType: type,
  apply: (repairObject) => {
    var id = _.random(0, Number.MAX_SAFE_INTEGER);

    var _dest;
    var _pos;
    if(typeof repairObject === 'string') {
      _dest = repairObject;
      _pos = Game.getObjectById(repairObject).pos;
    } else {
      _dest = repairObject.id;
      _pos = repairObject.pos;
    }

    return {
      id: id,
      actionType: type,
      params: [_dest],
      location: _pos, 
      errors:[]
    }
  },
  perform: (creep, repairObjectId) => {
    var outcome = creep.repair(Game.getObjectById(repairObjectId));
    if(outcome !== OK && outcome !== ERR_NOT_ENOUGH_RESOURCES) {
      return u.TASK_FAILED;
    } else if(creep.carry.energy > 0) {
      return u.TASK_ONGOING;  
    } else {
      return u.TASK_COMPLETE;
    }
  }
};
