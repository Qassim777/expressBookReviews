const express = require('express');
const jwt = require('jsonwebtoken');

const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/view'); // folder for your EJS files
app.use(express.static('pages'));
app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))
// app.use("/customer/auth/*", function auth(req,res){
// //Write the authenication mechanism here
// });
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
