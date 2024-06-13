const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const posts = require('../model/posts');
const cors = require('cors');

const options = {
  origin: 'http://localhost:3000'
}

router.use(cors(options));

router.get('/all', (req, res) => { 
  res.json(JSON.stringify(posts.getAll()))
});

router.post('/new', bodyParser.json(), (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const registeredPosts = posts.getAll();
  const id = registeredPosts.length + 1;
  const registeredTitles = registeredPosts.filter((item) => item.title === title);

  if (registeredTitles.length) {
    return res.status(406).send('Esse nome de título já existe');
  }

  posts.newPost(id, title, description);

  res.send('Post adicionado com sucesso!');  
});

module.exports = router;