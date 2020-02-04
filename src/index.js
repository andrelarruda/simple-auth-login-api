// api criada através do tutorial:
// https://www.youtube.com/watch?v=Ud5xKCYQTjM

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let users = [];
const bcrypt = require('bcrypt');

app.use(express.json());

app.get('/users', (req, res) => {
  return res.json(users);
});

app.post('/users', async (req, res) => {
   try{
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = {
         name: req.body.name,
         password: hashedPassword,
      }
      users.push(user);
      return res.status(201).send();
   } catch{
      return res.status(500).send();
   }
});

app.post('/users/login', async (req, res) => {
   const user = users.find(user => user.name == req.body.name);
   if (user == null){
      return res.status(400).send('Cannot find user');
   }
   try{
      if (await bcrypt.compare(req.body.password, user.password)){
         return res.send('Success');
      } else {
         return res.send('Not Allowed')
      }
   } catch{
      return res.status(500).send();
   }
});

app.listen(3333, () => console.log(`App listening...`));