const { request } = require('express');
const express = require('express');
const router = express.Router();
const Post = require('../models/Hospital');
const verify = require('../verifyToken');

/*router.get('/', (req,res)=>{
    const Postss = Post.find();
    res.json(Postss);
});*/
//(how to pass in postman: http://localhost:3000/posts)
router.post('/', verify, (req,res) => {
console.log(req.body);   
const post = new Post({
        _id: req.body.hId,
        hId: req.body.hId,
        name: req.body.name,
        location: req.body.location,
        address: req.body.address,
        contactNo: req.body.contactNo,
    });
    post.save();
    res.send("Successfully created hospital record");
  /* .then(data => {
        res.json(data);
    })
    .catch(err =>{
        res.json({message:err});
    });*/  
  // console.log(req.header);  
});
//printing by hospital name (how to pass in postman: http://localhost:3000/posts/Apollo hospital)
router.get('/:postId', async (req,res)=>{
    const p = await Post.findOne({name: req.params.postId});
    res.json(p);
    //res.send("post printed successfully");
});
//deleting by hospital id (how to pass in postman: http://localhost:3000/posts/H1)
router.delete('/:postId', verify, async (req,res)=>{
    const removePost = await Post.remove({_id: req.params.postId});
    res.json(removePost);
    res.send("post removed successfully");
});
//updating by hospital idS (how to pass in postman: http://localhost:3000/posts/H1)
router.patch('/:postId', verify, async(req,res)=>{
    const updatePost = await Post.updateOne({_id: req.params.postId},{$set:{hId: req.body.hId, name: req.body.name, location: req.body.location, address: req.body.address, contactNo: req.body.contactNo}});
    res.json(updatePost);
    res.send("post updated successfully");
});
/*
router.get('/:postId',(req,res)=>{
    //console.log(req.params.postId);
    const p = Post.findOne(req.params.postId);
    res.send(p);
});*/
module.exports = router;