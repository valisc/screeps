module.exports = {
  TASK_FAILED: -1,
  TASK_OK: 1,
  unpackPosition: (_p) => { return new RoomPosition(_p.x, _p.y, _p.roomName); }
};
