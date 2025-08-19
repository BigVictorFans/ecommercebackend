const express = require("express");
//create a express router
const router = express.Router();


const {
  getItems,
  getItem,
  addItem,
  updateItem,
  deleteItem
} = require("../controllers/items");

/* 
  Routes for Items
  GET /Items - list all the Items
  GET /Items/68943cf564aa9f8354cef260 - get a specific Item
  POST /Items - add new Item
  PUT /Items/68943cf564aa9f8354cef260 - update Item
  DELETE /Items/68943cf564aa9f8354cef260 - delete Item
*/
// GET /Items - list all the Items
/*
  query params is everything after the ? mark
*/
router.get("/", async (req, res) => {
  const category = req.query.category; // retrieve the category from query params
  const items = await getItems(category);
  res.status(200).send(items);
});

// GET /Items/:id - get a specific Item
router.get("/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  const item = await getItem(id);
  res.status(200).send(item);
});

/* 
  POST /Items - add new Item
  This POST route need to accept the following parameters:
  - title
  - director
  - release_year
  - genre
  - rating
*/
router.post("/", async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;

    // check error - make sure all the fields are not empty
    if ( !name || !description || !price || !category) {
      return res.status(400).send("All fields are required"); // 400 is Bad Request
    }

    const newItem = await addItem(name, description, price, category);

    res.status(200).send(newItem);
  } 
  catch (error) {
    res.status(400).send("All fields are required");
  }
});


//  PUT /Items/68943cf564aa9f8354cef260 - update Item
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id; // id of the movie
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;yy

    // check error - make sure all the fields are not empty
    if ( !name || !description || !price || !category) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    const updatedItem = await updateItem(id, name, description, price, category);

    res.status(200).send(updatedItem);
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

//  DELETE /Items/68943cf564aa9f8354cef260 - delete Item
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id; // id of the Item
    const deletedItem = await deleteItem(id);
    res.status(200).send({
      message: `Item with the ID of ${id} has been deleted`
    });
  } 
  catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
})

module.exports = router;
