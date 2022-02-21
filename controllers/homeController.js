const express=require('express');
const path=require('path');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const userModel=require('../models/userModel');


//login page controller.
exports.login=(req,res)=>{
    res.render('login')
}

//login store data controller.
exports.addLogin=(req,res)=>{
    userModel.findOne({
        userName:req.body.username
    }, (err,data)=>{
        if(data){
            if(data.status){
                const hashpwd=data.password;
                if(bcrypt.compareSync(req.body.password, hashpwd)) {
                    const token=jwt.sign({
                        id:data._id,
                        username:data.userName
                    },'mitra123',{expiresIn:'3m'});
                    res.cookie('userToken',token);
                    res.redirect('/dashboard');
                }else{
                    console.log('Password does not match...');
                    res.redirect('/');
                }
            }else{
                console.log('Status false...');
                res.redirect('/');
            }
        }else{
            console.log('Username does not exist...');
            res.redirect('/');
        }
    })
}

//userAuth middleware controller.
exports.userAuth=(req,res,next)=>{
    if(req.user){
        console.log(req.user);
        next();
    }else{
        console.log(req.user,'err');
        res.redirect('/')
    }
}

//register page controller.
exports.register=(req,res)=>{
    res.render('register',{
        title:'Register | Page',
        data:"register page"
    })
}

//register store data controller
exports.addRegister=(req,res)=>{
    userModel({
        userName: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }).save().then(result => {
        console.log("User added....");
        res.redirect('/')
    }).catch(err => {
        console.log(err, "error while add user");
    })
}

//dashboard page controller.
exports.dashboard=(req,res)=>{
    res.render('dashboard',{
        data:req.user
    })
}

//logout controller.
exports.logout=(req,res)=>{
    res.clearCookie('userToken');
    res.redirect('/')
}