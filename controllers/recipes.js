const { response } = require('express');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res,) => {
   //#swagger.tags=['recipes']
    const result = await mongodb.getDatabase().db().collection('recipes').find();
    result.toArray().then((recipes) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(recipes);
  });
};

const getSingle = async (req, res,) => {
   //#swagger.tags=['recipes']
  const recipesId = new ObjectId(req.params.id);  
  const result = await mongodb.getDatabase().db().collection('recipes').find({ _id: recipesId});
  result.toArray().then((recipes) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(recipes[0]);
  });
};

const createRecipe = async (req, res,) => {
   //#swagger.tags=['recipes']
  const recipe = {
    title: { type: String, required: true },
    ingredients: [String],
    instructions: { type: String, required: true },
    cookTime: Number,
    servings: Number,
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
    author: String,
    tags: [String]
};
  const response = await mongodb.getDatabase().db().collection('recipes').insertOne(recipe);
  if (response.acknowledged) {res.status(204).send();
   } else {
      res.status(500).json(response.error || 'some error occurred while updating the recipe.');
    } 
};

const updateRecipe = async (req, res,) => {
   //#swagger.tags=['recipes']
  const recipesId = new ObjectId(req.params.id);
  const recipe = {
    title: { type: String, required: true },
    ingredients: [String],
    instructions: { type: String, required: true },
    cookTime: Number,
    servings: Number,
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
    author: String,
    tags: [String]
};
  const response = await mongodb.getDatabase().db().collection('recipes').replaceOne({ _id: recipesId},recipe);
  if (response.modifiedCount > 0) {res.status(204).send();
   } else {
      res.status(500).json(response.error || 'some error occurred while updating the recipe.');
    } 
};

const deleteRecipe = async (req, res,) => {
   //#swagger.tags=['recipes']
  const recipesId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('recipes').deleteOne({ _id: recipesId});
   if (response.deletedCount > 0) {
    res.status(204).send();
   } else {
      res.status(500).json(response.error || 'some error occurred while deleting the recipe.');
    } 

};
module.exports = {
    getAll,
    getSingle,
    createRecipe,
    updateRecipe,
    deleteRecipe
};