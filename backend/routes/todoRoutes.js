const router = require("express").Router();
const Todo = require("../models/todos");

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(201).json({
      status: "success",
      data: {
        todo: todos,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
});

router.post("/todo", async (req, res) => {
  // checking if the todo is already  in the database
  const todoExist = await Todo.findOne({ todo: req.body.todo });
  if (todoExist) return res.status(400).send("todo already exist");

  // create a new todo

  try {
    const newTodo = await Todo.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        todo: newTodo,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
});

router.patch("/:id", async (req, res) => {
  // checking if the todo is already  in the database
  const todoExist = await Todo.findOne({ todo: req.body.todo });
  if (todoExist) return res.status(400).send("todo already exist");

  // create updated todo

  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        todo,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

module.exports = router;
