const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const secretKey = "mySecretKey"; // better to keep in .env
let users = [];

const isValid = (username)=>{ //returns boolean
  //write code to check is the username is valid
return !(users.some(user => user.name === username ));
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
 return users.some(user => user.name === username && user.pass === password);
}

regd_users.get("/login", (req,res) => {
   res.render('log');
  //Write your code here
});
//only registered users can login
regd_users.post("/login", (req,res) => {

     const {username,password}=req.body
     
    if (authenticatedUser(username, password)) {
      req.session.user=username;
    return res.redirect("auth/review/1");
  } else {
    return res.status(401).json({ message: "Invalid username or password" });
  
}
});
regd_users.get("/auth/review/:isbn", (req, res) => {
  const id=req.params.isbn;
  const user=req.session.user;
 const header=books[id].reviews;
 console.log(user);
  return res.render('review',{id,header,user});
  //Write your code here
});

// Add a book review
regd_users.post("/auth/review/:isbn", (req, res) => {
   const header=req.session.user;
   const action=req.query.action;
   if(header){
    const {review}=req.body;
      if(action.toString()=="update")
      {
          books[req.params.isbn].reviews[header.toString()]=review;
          return res.send(books[req.params.isbn].reviews[header.toString()]);
          //Write your code here
      }
      else if(action=="delet"){
         delete books[req.params.isbn].reviews[header.toString()];
          return res.redirect("/customer/auth/review/"+req.params.isbn); 
      }
      }
        return res.send("error unauthrized access");
      });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
