var u = require('util');
var type = "withdraw";
module.exports = {
  actionType: type,
  apply: (withdrawObject, resourceType, withdrawAmount) => {
    var id = _.random(0, Number.MAX_SAFE_INTEGER);

    var _dest;
    var _pos;
    if(typeof withdrawObject === 'string') {
      _dest = withdrawObject;
      _pos = Game.getObjectById(withdrawObject).pos;
    } else {
      _dest = withdrawObject.id;
      _pos = withdrawObject.pos;
    }

    return {
      id: id,
      actionType: type,
      params: [_dest,  resourceType, withdrawAmount],
      location: _pos, 
      errors:[]
    }
  },
  perform: (creep, withdrawObjectId, resourceType, withdrawAmount) => {
    var outcome = creep.withdraw(Game.getObjectById(withdrawObjectId), resourceType, withdrawAmount);
    if(outcome !== OK) {
      return u.TASK_FAILED;
    } else {
      return u.TASK_COMPLETE;
    }
  }
};
