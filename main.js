module.exports.loop = function () {
  var creep = Game.creeps['Harvester1'];
  var sources = creep.room.find(FIND_SOURCES);
  if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
    creep.moveTo(sources[0]);
  }
}

