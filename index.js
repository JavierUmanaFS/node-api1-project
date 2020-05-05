
const express = require('express');
const shortid = require('shortid');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());

let userList = [
  {
    id: shortid.generate(),
    name: "janet",
    bio: "my names janet"
  },
  {
    id: shortid.generate(),
    name: "hailey",
    bio: 'my names hailey'
  }
];

server.get('/api/users', (req, res) => {
  if(userList === undefined){
    res.status(500).json({ errorMessage: 'The users information could not be retrieved.'})
  } else {
    res.json(userList)
  }
});

server.post('/api/users', (req, res) => {
  const newUser = req.body;

  if( newUser.name && newUser.bio === undefined){
    res.status(400).json({ errorMessage: 'Please provide new user'})
  } else if(!newUser === undefined) {
    res.status(500).json({ errorMessage: 'There was an error while saving the user to the database'})
  } else {
    userList.push(newUser);
    res.status(201).json(userList)
  }

});

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;

  const user = userList.find((users) => users.id === id)

  if(user){
    res.status(200).json(user)
  } else  if(user === undefined) {
    res.status(404).json({ message: 'The user with the specified ID does not exist.'})
  } else {
    res.status(500).json({ errorMessage: "The user information could not be retrieved."})
  }
});

server.delete('/api/users/:id', (req, res) =>{
  const id = req.params.id;

  userList = userList.filter(user => user.id !== id)

  if(userList === undefined){
    res.status(404).json({ message: "The user with the specified ID does not exist."})
  } else if(userList){
    res.status(200).json(userList)
  } else {
    res.status(500).json({ errorMessage: "The user could not be removed" })
  }
} );

server.patch('/api/users/:id', (req, res) => {
  const id = req.params.id;

  if(req.body.id !== id){
    res.status(404).json({ errorMessage: 'The user with the specified ID does not exist.'})
  } else {
    res.status(200).json(req.body)
  }
  // if(newUserList === undefined){
  //   res.status(404).json({ errorMessage: 'The user with the specified ID does not exist.'})
  // } else if(req.body.name && req.body.bio === ''){
  //   res.status(400).json({ errorMessage: 'Please provide name and bio for the user'})
  // } else {
  //   res.status(200).json(newUserList)
  // }
});

server.put('/api/users/:id', (req, res) => {
  const id = req.params.id;

  if(req.body.id !== id){
    res.status(404).json({ errorMessage: 'The user with the specified ID does not exist.'})
  } else {
    res.status(200).json(req.body)
  }
});

server.listen(8000, () => console.log('API IS UP'));