var u = require('util');
var type = "upgrade";
module.exports = {
  actionType: type,
  apply: (controller) => {
    var id = _.random(0, Number.MAX_SAFE_INTEGER);

    var _dest;
    var _pos;
    if(typeof controller === 'string') {
      _dest = controller;
      _pos = Game.getObjectById(controller).pos;
    } else {
      _dest = controller.id;
      _pos = controller.pos;
    }

    return {
      id: id,
      actionType: type,
      params: [_dest],
      location: _pos, 
      errors:[]
    }
  },
  perform: (creep, controllerId) => {
    var outcome = creep.upgradeController(Game.getObjectById(controllerId));
    if(outcome !== OK && outcome !== ERR_NOT_ENOUGH_RESOURCES) {
      return u.TASK_FAILED;
    } else if(creep.carry.energy > 0) {
      return u.TASK_ONGOING;  
    } else {
      return u.TASK_COMPLETE;
    }
  }
};
