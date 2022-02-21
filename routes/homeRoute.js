const express=require('express');
const Route=express.Router();
const homeController=require('../controllers/homeController');
const verify=require('../middleware/verify');

Route.get('/',homeController.login);
Route.post('/add-login',homeController.addLogin);
Route.get('/show-register',homeController.register);
Route.post('/add-register',[verify.verifyUser],homeController.addRegister); //submit data
Route.get('/dashboard',homeController.userAuth,homeController.dashboard);
Route.get('/logout',homeController.logout);

module.exports=Route