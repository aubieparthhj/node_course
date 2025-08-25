const express = require('express');
const router = new express.Router();
const User = require('../models/users');
const auth = require('../middleware/auth');

router.get('/users/me',auth,async(req,res)=>{
    try{
        res.send(req.user);
    }catch(e){
        res.status(500);
        res.send(e);
    }
})

router.post('/users/login',async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password);
        const token = await user.generateAuthToken();
        res.send({user:user.toJSON(),token});
    }catch(e){
        res.status(400);
        res.send(e);
    }
})

router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token;
        })
        await req.user.save();
        res.send(req.user);
    }catch(e){
        res.status(500);
        res.send(e);
    }
})

router.post('/users/logoutAll',auth,async(req,res)=>{
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send(req.user);
    }catch(e){
        res.status(500);
        res.send(e);
    }
})


router.get('/users/:id',async(req,res)=>{
    const _id = req.params.id;
    try{
        const user = await User.findById(_id);
        res.send(user);
    }catch(e){
        res.status(404);
        res.send(e);
    }
})

router.patch('/users/me',auth,async(req,res)=>{
    const allowedUpdates = ['name','email','password','age'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update));
    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates!'});
    }
    try
    {
        updates.forEach((update)=>{
            req.user[update] = req.body[update];
        })
        console.log('before updating',req.user);
        await req.user.save();
        console.log('after updating',req.user);
        res.send(req.user);
    }catch(e){
        res.status(400);
        res.send(e);
    }
});

router.delete('/users/me',auth, async(req,res)=>{
    try{
        console.log('before removing',req.user);
        await req.user.deleteOne();
        
        console.log('after removing',req.user);
        res.send(req.user);
    }catch(e){
        res.status(400);
        res.send(e);
    }
});

router.post('/users',async(req,res)=>{
    const user = new User(req.body);
    try{
        await user.save();
        //console.log(user);
        const token = await user.generateAuthToken();
        console.log(token);
        res.status(201).send({user,token});
    }catch(e){
        res.status(400);
        res.send(e.message);
    }
    
})
module.exports = router;