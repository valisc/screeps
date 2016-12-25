var u = require('util');
var type = "harvest";
module.exports = {
  actionType: type,
  apply: (source, depositAmount, resourceType) => {
    var id = _.random(0, Number.MAX_SAFE_INTEGER);

    var _dest;
    var _pos;
    if(typeof source === 'string') {
      _dest = source;
      _pos = Game.getObjectById(source).pos;
    } else {
      _dest = source.id;
      _pos = source.pos;
    }

    return {
      id: id,
      actionType: type,
      params: [_dest],
      location: _pos, 
      errors:[]
    }
  },
  perform: (creep, sourceId) => {
    var outcome = creep.harvest(Game.getObjectById(sourceId));
    if(outcome !== OK) {
      return u.TASK_FAILED;
    } else if(creep.carry.energy < creep.carryCapacity) {
      return u.TASK_ONGOING;
    } else {
      return u.TASK_COMPLETE;
    }
  }
};
