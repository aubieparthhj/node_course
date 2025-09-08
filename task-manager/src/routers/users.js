const express = require('express');
const router = new express.Router();
const User = require('../models/users');
const multer = require('multer');
const auth = require('../middleware/auth');
const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/accounts');
const sharp = require('sharp');

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
        sendCancellationEmail(req.user.email, req.user.name);
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
        sendWelcomeEmail(user.email, user.name);
        res.status(201).send({user,token});
    }catch(e){
        res.status(400);
        res.send(e.message);
    }
    
})

const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image with jpg, jpeg or png format only'));
        }
        cb(undefined,true);
    }
})

router.post('/users/me/avatar',auth,upload.single('avatar'),async(req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
   res.send(req.user);
}, (error,req,res,next)=>{
        res. status(400).send({error:error.message});

})

router.delete('/users/me/avatar',auth,async(req,res)=>{
    req.user.avatar = undefined;
    await req.user.save();
    res.send(req.user);
    
}, (error,req,res,next)=>{
    res. status(400).send({error:error.message});
})

router.get('/users/:id/avatar',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user || !user.avatar){
            throw new Error('User not found');
        }
        res.set('Content-Type','image/jpeg');
        res.send(user.avatar);
    }catch(e){
        res.status(404);
        res.send(e);
    }
})

module.exports = router;