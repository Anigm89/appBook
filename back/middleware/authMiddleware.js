const firebaseAdmin = require('../config/firebase')
const express = require('express');


const verifyUser = async (req, res, next) => {
    //const tokenback = req.body;
//console.log('tokenb', tokenback);
/*
    if(!tokenback){
      res.redirect('/')
      next();

    }*/
  
    const token = req.headers['authorization'];
    console.log('tokenb', token);
    if (!token) {
     return res.redirect('/');
    }
    try {
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
      req.user = decodedToken;
      console.log('ru',req.user)
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token inválido o expirado' });
    }
    
  };

module.exports = verifyUser;