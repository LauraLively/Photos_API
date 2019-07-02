var express = require('express');
var router = express.Router();
// db stuff
// const db = require('monk')('localhost:27017/photos');
const db = require('monk')('mongodb://Laura:Helio1234@helio-shard-00-00-fphgm.mongodb.net:27017,helio-shard-00-01-fphgm.mongodb.net:27017,helio-shard-00-02-fphgm.mongodb.net:27017/photos?ssl=true&replicaSet=Helio-shard-0&authSource=admin&retryWrites=true');
const photos = db.get('photos');

//get Photos
router.get('/photos', async function (req, res){
  const results = await photos.find({})
  res.send(results)
  db.close()
});

//Create -upload- photos
router.post('/photo', async function (req, res){
  const body = req.body 
  console.log("post photos", body);
  const results = await photos.insert(body)
  res.send(results)
  db.close()
});

//Delete photos
router.delete('/photo/:id', async function (req, res){
  const results = await photos.remove({ _id :req.params.id })
  res.send(results)
  db.close()
});
//Update Photos
router.put('/photo/:id', async function (req, res){
  const body = req.body
  const results = await photos.update({_id :req.params.id}, body)
  res.send(results)
  db.close()
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: `Laura's Photos Express` });
});

module.exports = router;
