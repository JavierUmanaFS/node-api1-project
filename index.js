
const express = require('express');
const shortid = require('shortid');

const server = express();

server.use(express.json());

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
  }
});

server.listen(8000, () => console.log('API IS UP'));