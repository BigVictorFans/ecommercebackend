// import the Item model
const Item = require("../models/items");

async function getItems(category) {
    // create a empty container for filter
  let filter = {};
  // if genre exists, then only add it into the filter container
  if (category) {
    filter.category = category;
  }

  // load the Items data from Mongodb
  const items = await Item.find(filter);

  return items; // return the Items
}

async function getItem(id) {
  // load the Item data based on id
  const item = await Item.findById(id);

  return item; // return the Item
}

async function addItem(name, description, price, category) {
    //create a new Item
    const newItem = new Item({
        name: name,
        description: description,
        price: price,
        category: category
    })
    // save the Item to MongoDB
    await newItem.save(); //clicking on a save button

    return newItem; //return the newly created Item
}

async function updateItem( id, name, description, price, category) {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      {
        name: name,
        description: description,
        price: price,
        category: category
      },
      {
        new: true, // return the updated data
      }
    );
    return updatedItem; //return the updated Item
}

async function deleteItem(id) {
    const deletedItem = await Item.findByIdAndDelete(id);
    return deletedItem; // return the deleted Item
}


module.exports = {
    getItems,
    getItem,
    addItem,
    updateItem,
    deleteItem
}
