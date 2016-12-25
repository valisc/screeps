// check if primary task has been reassigned and recalculate
//go somewhere
//attempt to complete action
// if complete action
//   remove action from task list
//   find path to new task
// else 
//   log
//   retry
//   if retry > 3
//     aggregate logs
//     send email
//   end
// end
// Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {tasks:[], path:[],navigationErrors:0,currentTaskId:-1});
// Game.creeps.Colin.memory.tasks = [{id: 1, type: "move", params: [Game.getObjectById("e9fad649fe66e07cfa02c380").pos], location: Game.getObjectById("e9fad649fe66e07cfa02c380").pos, errors:[]}]

var u = require('util');
var tasks = [
  'tasks.move'
].map((moduleName) => {
  var module = require(moduleName);
  var out = {};
  out[module.actionType] = module.perform;
  return out;
});

var roleGeneralCreep = {
  actions: Object.assign({}, ...tasks),
  // actions -> Map[ActionType, function[Params, SuccessResult]]
  // path -> Creeps Path
  // tasks -> List[Task]
  // currentTaskId -> Int
  // navgationErrors = Int
  // Task {
  //   id: Int
  //   ActionType: String
  //   Params: List[?]
  //   location: RoomPosition
  //   Errors: List[String]
  // }
  /** @param {Creep} creep **/
  run: function(creep) {
    //check if reassigned 
    if(creep.memory.tasks[0] && creep.memory.taskId !== creep.memory.tasks[0].id) {
      creep.memory.path = creep.pos.findPathTo(u.unpackPosition(creep.memory.tasks[0].location));
      creep.memory.taskId = creep.memory.tasks[0].id;
    }

    if(creep.memory.path && creep.memory.path.length > 0) {
      if(creep.move(creep.memory.path[0].direction) == OK) {
        creep.memory.path.shift();
      } else {
        if(creep.memory.tasks[0]) {
          creep.memory.path = creep.pos.findPathTo(u.unpackPosition(creep.memory.tasks[0].location));
        }
      }
    } else {
      var task = creep.memory.tasks[0];
      if(task) {
        var action = this.actions[task.actionType];
        if(action && action(creep, ...task.params) == u.TASK_OK){
          console.log("Task OK");
          creep.memory.tasks.shift();
          if(creep.memory.tasks[0]) {
            creep.memory.path = creep.pos.findPathTo(u.unpackPosition(creep.memory.tasks[0].location));
          } else {
            creep.memory.taskId = -1;
          }

        } else {
          console.log("Task Failed");
          //   retry
          //   if retry > 3
          //     aggregate logs
          //     send email
        }
      }

    }
  }
};
module.exports = roleGeneralCreep;
