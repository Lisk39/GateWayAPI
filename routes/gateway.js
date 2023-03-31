var express = require('express');
var router = express.Router();

var gateMethods = require('../APILibrary/gatewayAPI');

/* GET default. */
router.get('/', function(req, res, next) {
  res.send('Hello Gateway');
});

/* GET users email check */
router.get('/email', async function(req, res, next) {
  const email = req.body;
  
  try{
    let found = await gateMethods.verifyEmail(email);
    
    res.json(found);
  }
  catch(err){
    res.status(400).json({message: err.message});
  }
  


});
/* GET users password check */
router.get('/password', async function(req, res, next) {
  const password = req.body;
  
  try{
    let user = await gateMethods.passcheck(password);
    req.session.isAuth = true;
    res.json(user);
  }
  catch(err){
    res.status(400).json({message: err.message});
  }


});

/* GET confirmation if local user / browser is authenticated with valid session */
router.get('/isAuthenticated', async function(req, res, next){
  try{

    if(req.session.isAuth === true) {
      res.json({"isAuth": true})
      
    }
    else{
      res.json({"isAuth": false})
    }
  
    
  }
  catch(err){
    res.status(400).json({message: err.message});
  }
  
})


/* GET users logout*/
router.get('/logout', async function(req, res, next) {
  
  
  
  req.session.destroy((err) => {
  if(err)
  {
    throw err;
  }
  var mess = new Object();
  mess.logout = true;
  res.json(mess);


})
  
});

/* POST create user */
router.post('/adduser', async function(req, res, next) {
  
 const userData = req.body;
  
  try{
    let user = await gateMethods.addUser(userData);
    req.session.isAuth = true;
    res.json(user);
  }
  catch(err){
    res.status(400).json({message: err.message});
  }
  
});

/* GET store data*/
router.get('/getdata', async function(req, res, next) {
  
  
  try{
    let data = await gateMethods.getData();
   
    res.json(data);
  }
  catch(err){
    res.status(400).json({message: err.message});
  }


});
/* POST add data from scraper */
router.post('/adddata', async function(req, res, next) {
  
  const data = req.body;
   
   try{
     let confirm = await gateMethods.addDataScrap(data);

     res.json(confirm);
   }
   catch(err){
     res.status(400).json({message: err.message});
   }
   
 });
 /* PATCH item Liked */
/* Jsons user and item need to be collected in to an array in one json which is passed to this API*/
router.patch('/itemliked', async function(req, res, next) {
  
  const data = req.body;


   
   try{
    
    let newItem = await gateMethods.likeItem(data);
     res.json(newItem);
   }
   catch(err){
     res.status(400).json({message: err.message});
   }
   
 });
/* PATCH item DisLiked */
/* Jsons user and item need to be collected in to an array in one json which is passed to this API*/
router.patch('/itemdisliked', async function(req, res, next) {

  const data = req.body;
  
   try{
     let newItem = await gateMethods.dislikeItem(data);
    res.json(newItem);
   }
   catch(err){
     res.status(400).json({message: err.message});
   }
   
 });


module.exports = router;
