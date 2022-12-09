const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static('public'));
let users = [];
let database = [];
let id = 0;

app.get('/api/database', (req, res) => {
  console.log("In database get");
  res.send(database);
});
app.get('/api/database/:id', (req, res) => {
  console.log("In database get");
  
});
app.post('/api/database/:id', (req, res) => {
  console.log("In database post");
  id = req.params.id;
  const foundItem = database.findIndex(item => item.id == id);
  if (foundItem == -1) {
      let item = {
        id: id,
        // quantity: 1,
        username: req.body.username,
        password: req.body.password
      };
      
     database.push(item);
     res.send(item);
  } 
  database[foundItem].quantity += 1;
  res.send(database[foundItem]);
  return;
});
app.post('/api/database/minus/:id', (req, res) => {
  console.log("In database post");
  id = req.params.id;
  const foundItem = database.findIndex(item => item.id == id);
  if (foundItem == -1) {
      let item = {
        id: id,
        quantity: 1
      };
      
     database.push(item);
     res.send(item);
  } 
  if (database[foundItem].quantity >0) {
    database[foundItem].quantity -= 1;
  }
  res.send(database[foundItem]);
  return;
});
app.get('/api/users', (req, res) => {
  console.log("In get");
  res.send(users);
});
app.post('/api/users/', (req, res) => {
  console.log("In post");
  id = id + 1;
  let user = {
    id: id,
    username: req.body.username,
    password: req.body.password
  };
  users.push(user);
  res.send(user);
});
app.delete('/api/database/:id', (req, res) => {
  console.log("In delete");
  let id = req.params.id;
  database = database.filter(itemInArray => id != itemInArray.id);
  res.sendStatus(200);
});
app.put('/api/database/:id/:quantity', (req,res) => {
    console.log("in put");
    let id = req.params.id;
    let quantity = parseInt(req.params.quantity);
    let foundItem = database.findIndex(item => item.id == id)
    if(database[foundItem]) {
        database[foundItem].quantity = quantity;
        if (database[foundItem].quantity == 0){//delete database item
            database = database.filter(itemInArray => id != itemInArray.id);
        }
        res.send(database[foundItem]);
    }
    else {return 404;}

});
app.listen(3000, () => console.log('Server listening on port 3000!'));