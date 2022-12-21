const express = require("express");

const router = express.Router();

const {
  createTodo,
  getTodo,
  deleteTodo,
  updateTodo,
} = require("../controller/todo");


router.post('/createtask',createTodo);
router.get('/gettask',getTodo);
router.delete('/:id/deletetask',deleteTodo);
router.put('/:id/updatetask',updateTodo);

module.exports = router;
