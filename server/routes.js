const Card = require("./model");
const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { title, img, list } = req.body;
  try {
    const todo = await Card.create({
      title,
      img,
      list,
    });
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  const { list, id } = req.body;
  try {
    const todo = await Card.findOneAndUpdate({ _id: id }, { list });
    res.json(todo);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
