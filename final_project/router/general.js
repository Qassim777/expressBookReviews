const express = require('express');
let books = require("./booksdb.js");
const path = require('path');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const secretKey = "mySecretKey"; 

public_users.post("/register", (req,res) => {
  console.log(users);
  const {username,password}=req.body
  if(isValid(username)){
      users.push({ name: username, pass: password });
      return res.json({message:"successfull sign up"});
  } else {
   return res.send("Invalid username");
  }
 
});

public_users.get("/register", (req,res) => {
 res.render('sgin');
});
// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books))
  //Write your code here
 
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here 
  res.send(books[req.params.isbn]) 
 
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let authorBooks=[];
 for(let i =1 ; i<Object.keys(books).length;i++){
    if(books[i].author ==req.params.author)
      authorBooks.push(books[i])
  };
  res.send(authorBooks);
 
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
    let titleBooks=[];
 for(let i =1 ; i<Object.keys(books).length;i++){
    if(books[i].title ==req.params.title){
      titleBooks.push(books[i])
      break;
    }
  };
  res.send(titleBooks);
 
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  res.send(books[req.params.isbn]) 
 
});

module.exports.general = public_users;
