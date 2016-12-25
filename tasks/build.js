var u = require('util');
var type = "build";
module.exports = {
  actionType: type,
  apply: (constructionSite) => {
    var id = _.random(0, Number.MAX_SAFE_INTEGER);

    var _dest;
    var _pos;
    if(typeof constructionSite === 'string') {
      _dest = constructionSite;
      _pos = Game.getObjectById(constructionSite).pos;
    } else {
      _dest = constructionSite.id;
      _pos = constructionSite.pos;
    }

    return {
      id: id,
      actionType: type,
      params: [_dest],
      location: _pos, 
      errors:[]
    }
  },
  perform: (creep, constructionSiteId) => {
    var outcome = creep.build(Game.getObjectById(constructionSiteId));
    if(outcome !== OK && outcome !== ERR_NOT_ENOUGH_RESOURCES) {
      return u.TASK_FAILED;
    } else if(creep.carry.energy > 0) {
      return u.TASK_ONGOING;  
    } else {
      return u.TASK_COMPLETE;
    }
  }
};
