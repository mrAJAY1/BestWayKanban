const router = require("express").Router();
const Todo = require("./model");

router.get("/", async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    ...(req.body.status && { status: req.body.status }),
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    res.json(deletedTodo);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body);
    res.json(updatedTodo);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
