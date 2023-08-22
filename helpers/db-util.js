import { MongoClient } from "mongodb";

export async function connectDatabase() {
  
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ygkjxo9.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

  const client = await MongoClient.connect(
    connectionString
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort) {
  // connect to db and fetch all comments
  const db = client.db();

  const documents = await db
  .collection(collection)
  .find()
  .sort(sort)
  .toArray();

  return documents;
}

/*
import sqlite3 from "sqlite3";
import validator from "validator";

const db = new sqlite3.Database(':memory:');

/*
const sqlite3 = require('sqlite3').verbose();
const validator = require('validator');
*

const allowedKeys = {
  nftFraction: ['id', 'nftId', 'provider', 'currentSplits'],
  nfts: ['id', 'name', 'provider','category', 'isHighlighted', 'isPnft', 'temporality', 'isFractioned', 'image', 'description'],
  providers: ['id', 'mainnet', 'name', 'data', 'isHighlighted', 'image', 'bio', 'website', 'twitter', 'instagram'],
  comments: ['id', 'nftId','name', 'email', 'text'],
  users: ['id', 'email', 'walletAddress', 'password'],
  newsletter: ['email'],
  salesWhole: ['id', 'seller', 'buyer', 'provider', 'nftId', 'price', 'soldAt'],
  salesFraction: ['id', 'seller', 'buyer', 'provider', 'nftId','fractionId', 'price', 'soldAt'],
  listingsWhole: ['id', 'seller', 'provider', 'nftId', 'price'],
  listingsFraction:['id', 'seller', 'provider', 'nftId', 'price', 'fractionId'],
}
const allowedWords = [
  "ORDER BY", "LIMIT", "OFFSET", "OR", "AND", "NOT"
]

const allowedOperators = [
  "==", "=", "!=", ">", "<", "<=", ">=", 
]
const keysArray = Object.keys(allowedKeys)


export async function connectDatabase(filepath){
    return new sqlite3.Database(filepath); 
}

/**
 * Creates a new row in the chosen database table
 * @param {string} collection - name of the table, NEVER allow the user to choose this 
 * @param {Object} document - key-values for new row {name:Tare, etc.}
 * @returns {Number} Id of the document
 *

export async function insertDocument(client, collection, document) {
  if(!keysArray.includes(collection)){
    //validate collection/table name
    throw new Error("Invalid table");
  }
  const keys = Object.keys(document);
  for(let i = 0; i < keys.length; i++){
    if(!(allowedKeys[collection].includes(keys[i]))){
      
    //validate key parameters
    throw new Error("Invalid column from insert");
    }
  }

  const placeholders = keys.map(() => '?').join(', ');
  const values = keys.map(key => document[key]);

  const sql = `INSERT INTO ${collection} (${keys.join(', ')}) VALUES (${placeholders})`;

  return new Promise((resolve, reject) => {
    client.run(sql, values, function (err) {
      if (err) {
        reject(new Error(`Failed to execute query: ${err.message}`));
      } else {
        resolve(this.lastID);
      }
    });
  });
}
/**
 * Changes the values of chosen columns in a the all that fit filters' criteria
 * @param {string} collection - name of the table, NEVER allow user to choose this 
 * @param {Object} document - key-values to replace the old keys' values.
 * @param {Object[]} filtersArray - [{colName: "price", operator: "=", value: "20", word: "AND"},] for example. [] for all docs
 * @returns {Number} id of the row 
 *
export async function updateDocument(client, collection, filtersArray, document) {

  if(!keysArray.includes(collection)){
    //validate collection/table name
    throw new Error("Invalid table");
  }
  const keys = Object.keys(document);
  for(let i = 0; i < keys.length; i++){
    if(!allowedKeys[collection].includes(keys[i])){
    //validate key parameters
    throw new Error("Invalid column");
    }
  }
  const queryEnd = createQueryStringEnd(filtersArray, collection);
  if(queryEnd == ""){
    throw new Error('Invalid filter');
  }
  
  const placeholders = keys.map((key) => `${key} = ?`).join(', ');
  const values = keys.map(key => document[key]);

  const sql = `UPDATE ${collection} SET ${placeholders} WHERE ${queryEnd}`;

  return new Promise((resolve, reject) => {
    client.run(sql, [...values, ...filtersArray.map(obj => obj.value)], function (err) {
      if (err) {
        reject(new Error(`Failed to execute query: ${err.message}`));
      } else {
        resolve(this.lastID);
      }
    });
  });
}

/**
 * Returns all rows matching the filters. 
 * @param {string} collection - name of the table 
 * @param {string[]} colsToReturn - Select the columns you want returned, [] for all
 * @param {Object[]} filtersArray - [{colName: "price", operator: "=", value: "20", word: "AND"}....,{word: "OFFSET", number:50}] for example. [] for all docs
 * @returns {Object[]} Object of chosen colName: colValue pairs for all rows
 *
export async function getAllDocuments(client, collection, filtersArray, colsToReturn) {

  if(!keysArray.includes(collection)){
    //validate collection/table name
    throw new Error("Invalid column from get")
  }
  let cols = ["*"];
  if(colsToReturn.length > 0){
    for(const element of colsToReturn){ 
      if(!allowedKeys[collection].includes(element)){
        throw new Error("Invalid columns")
      }
    }
    cols = colsToReturn
  }
  if(filtersArray.length === 0){
    // No filters applied
    return new Promise((resolve, reject) => {
      client.all(`SELECT ${cols.join(", ")} FROM ${collection}`, (err, rows) => {
        if (err) {
          reject(new Error(`Failed to get rows: ${err.message}`));
          return
        } else {
          resolve(rows);
          return
        }
      });
    });
  }
  const queryString = createQueryStringGet(collection, filtersArray, cols);

  if(queryString == ""){
    //failed parameters validication 
    throw new Error('Invalid filter')
  }
  const paramValues = filtersArray.map(obj => obj.value);

  return new Promise((resolve, reject) => {
    client.all(queryString, paramValues, (err, rows) => {
      if (err) {
        reject(new Error(`Failed to get rows: ${err.message}`));
      } else {
        resolve(rows);
      }
    });
  });
}

/**
 * Deletes all rows matching the filters. Only for logged in users or admins
 * @param {string} collection - name of the table 
 * @param {Object[]} filtersArray - [{colName: "price", operator: "=", value: "20", word: "AND"}....,{word: "OFFSET", number:50}] for example. [] for all docs
 *
export async function deleteDocuments(client, collection, filtersArray, ){
  if(!keysArray.includes(collection)){
    //validate collection/table name
    throw new Error("Invalid column")
  }
  //Create the query 
  let queryStr = `DELETE FROM ${collection} WHERE ${createQueryStringEnd(filtersArray, collection)}`;
  if(queryStr == ""){
    throw new Error('Invalid filter');
  }

  return new Promise((resolve, reject) => {
    client.run(queryStr, filtersArray.map(obj => obj.value), function (err) {
      if (err) {
        reject(new Error(`Failed to execute query: ${err.message}`));
      } else {
        resolve(true);
      }
    });
  });
}

/**
 * @param {string} collection - name of the table
 * @param {Object[]} filtersArray - [{colName: "price", operator: "=", value: "20", word: "AND"},] for example.
 * @returns {string} End of the query string for update
 *
function createQueryStringEnd(filtersArray, collection){
  let queryStrArray = [""];
  for(let i = 0; i < filtersArray.length; i++){
    if(validateFilters(filtersArray[i], collection)){
      for(key in filtersArray[i]){
 
        switch(key){
          case "colName":
            queryStrArray.push(`${filtersArray[i][key]}`);
            break;
          case "operator":
            queryStrArray.push(`${filtersArray[i][key]}`);
            break;
          case "value":
            queryStrArray.push(`?`);
            break;
          case "word":
            queryStrArray.push(`${filtersArray[i][key]}`);
            break;
          default:
            break;
        }
      }
    } else {
      //If one filter validation fails, 
      return "";}
  }
  
  return queryStrArray.join(" ");
}

/**
 * validates the parameters and creates parametrized query string
 * @param {string} collection - name of the table
 * @param {string[]} colsToReturn - Select the columns you want returned
 * @param {Object[]} filtersArray - [{colName: "price", operator: "=", value: "20", word: "AND"},] for example.
 * @returns {string} query string for getting rows of data from db
 *
function createQueryStringGet(collection, filtersArray, colsToReturn){
  let queryStrArray =  [`SELECT ${colsToReturn.join(", ")} FROM ${collection} WHERE`];
  for(let i = 0; i < filtersArray.length; i++){
    if(validateFilters(filtersArray[i], collection)){
      const keys = Object.keys(filtersArray[i]);
      for (const key of keys){
      //for(key in filtersArray[i]){
 
        switch(key){
          case "colName":
            queryStrArray.push(`${filtersArray[i][key]}`);
            break;
          case "operator":
            queryStrArray.push(`${filtersArray[i][key]}`);
            break;
          case "value":
            queryStrArray.push(`?`);
            break;
          case "word":
            queryStrArray.push(`${filtersArray[i][key]}`);
            break;
          default:
            break;
        }
      }
    } else {
      //If one filter validation fails, 
      return "";}
  }
  
  return queryStrArray.join(" ");
}
/**
 * Validates the filter parameters in case of malicious attempts.
 * @param {Object} objectToCheck - Example: {colName: "rowId", operator: "=", value: 5, word: "OR"}, 
 * @param {string} collection - name of the table
 * @returns {boolean} return true if filters are valid
 *
function validateFilters(objectToCheck, collection){
  let noFailures = true;
  const keys = Object.keys(objectToCheck);
  for (const key of keys){
    switch(key){
      case "colName":
        if(!(allowedKeys[collection]).includes(objectToCheck[key])){
          noFailures = false;
        }
        break;
      case "number":
        if(!Number.isInteger(objectToCheck[key])){
          noFailures = false;
        };
        break;
      case "operator":
        if(!allowedOperators.includes(objectToCheck[key])){
          noFailures = false;
        }
        break;
      case "word": 
        if(!allowedWords.includes(objectToCheck[key])){
          noFailures = false;
        }
        break;
      default:
        break;
    }
  }
  return noFailures;
}
*/