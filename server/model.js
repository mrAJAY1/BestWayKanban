const { Schema, model } = require("mongoose");

const cardSchema = new Schema({
  title: String,
  img: String,
  list: {
    type: String,
    enum: ["todo", "completed", "active"],
  },
});

const Card = model("Card", cardSchema);

module.exports = Card;
