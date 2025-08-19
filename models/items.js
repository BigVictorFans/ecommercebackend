const mongoose = require("mongoose");

// tvshow schema
const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: Number,
    required: true,
  },
});

// create a Modal from the schema
const Items = mongoose.model("Items", ItemSchema);


// export the Modal
module.exports = Items;