module.exports = {
  TASK_FAILED: -1,
  TASK_ONGOING: -2,
  TASK_COMPLETE: 1,
  unpackPosition: (_p) => { return new RoomPosition(_p.x, _p.y, _p.roomName); },
  spawnTaskRunner: (spawn, body) => {
    return spawn.createCreep(
      body,
      undefined,
      {
        tasks: [],
        path: [],
        navigationErrors:0,
        currentTaskId:-1
      }
    );
  }
};
