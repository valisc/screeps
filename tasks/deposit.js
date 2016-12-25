var u = require('util');
var type = "deposit";
module.exports = {
  actionType: type,
  apply: (depositObject, resourceType, depositAmount) => {
    var id = _.random(0, Number.MAX_SAFE_INTEGER);

    var _dest;
    var _pos;
    if(typeof depositObject === 'string') {
      _dest = depositObject;
      _pos = Game.getObjectById(depositObject).pos;
    } else {
      _dest = depositObject.id;
      _pos = depositObject.pos;
    }

    return {
      id: id,
      actionType: type,
      params: [_dest,  resourceType, depositAmount],
      location: _pos, 
      errors:[]
    }
  },
  perform: (creep, depositObjectId, resourceType, depositAmount) => {
    var outcome = creep.transfer(Game.getObjectById(depositObjectId), resourceType, depositAmount);
    if(outcome !== OK) {
      return u.TASK_FAILED;
    } else {
      return u.TASK_COMPLETE;
    }
  }
};
