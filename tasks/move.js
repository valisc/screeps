var u = require('util');
var type = "move";
module.exports = {
  actionType: type,
  apply: (destination) => {
    var _pos;
    if(destination.pos) {
      _pos = destination.pos;
    } else {
      _pos = destination;
    }
    var id = _.random(0, Number.MAX_SAFE_INTEGER);
    return {
      id: id,
      actionType: type,
      params: [_pos],
      location: _pos, 
      errors:[]
    }
  },
  perform: (creep, roomPosition) => { // Params: RoomPosition
    if(creep.pos.isNearTo(u.unpackPosition(roomPosition))) {
      return u.TASK_OK;
    } else {
      return u.TASK_FAILED;
    }
  }
};
