const { request } = require('express');
const express = require('express');
const router = express.Router();
const Post = require('../models/Ventilator');
const verify = require('../verifyToken');

/*router.get('/', (req,res)=>{
    res.send('We are on posts1');
});*/
//sending ventilator details to database (how to pass in postman: http://localhost:3000/posts1)
router.post('/', verify, (req,res) => {
console.log(req.body);   
const post = new Post({
        _id: req.body.ventilatorId,
        hId: req.body.hId,
        ventilatorId: req.body.ventilatorId,
        status: req.body.status,
        name: req.body.name
    });
    post.save();
    res.send("Successfully created Ventilator record");
  /* .then(data => {
        res.json(data);
    })
    .catch(err =>{
        res.json({message:err});
    });*/  
  // console.log(req.header);  
});
//printing by ventilator id (how to pass in postman: http://localhost:3000/posts1/H1V5)
router.get('/:postId', async (req,res)=>{
  const p = await Post.findById({_id: req.params.postId});
  res.json(p);
  res.send("post printed successfully");
});
//printing by status and hospital name (how to pass in postman: http://localhost:3000/posts1/occupied/Apollo hospital)
router.get('/:postId/:postId1', async (req,res)=>{
  const p = await Post.findOne({status: req.params.postId, name: req.params.postId1});
  res.json(p);
  res.send("post printed successfully");
});
//deleting by ventilator id (how to pass in postman: http://localhost:3000/posts1/H1V5)
router.delete('/:postId', verify, async (req,res)=>{
  const removePost = await Post.remove({_id: req.params.postId});
  res.json(removePost);
  res.send("post removed");
});
//updating by ventilator id (how to pass in postman: http://localhost:3000/posts1/H1V5)
router.patch('/:postId', verify, async(req,res)=>{
  const updatePost = await Post.updateOne({_id: req.params.postId},{$set:{hId: req.body.hId, ventilatorId: req.body.ventilatorId, status: req.body.status, name: req.body.name}});
  res.json(updatePost);
  res.send("post updated successfully");
});
module.exports = router;