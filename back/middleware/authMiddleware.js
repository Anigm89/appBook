const firebaseAdmin = require('../config/firebase')
const express = require('express');


const verifyUser = async (req, res, next) => {
    const token = req.headers.authorization;
console.log('token', token);
   /* if (token == null) {
        return res.status(401).json({ error: 'Token de acceso no proporcionado' });
       // return res.redirect('/');

    }*/
    try {
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
      req.user = decodedToken;
      console.log(req.user)
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token inválido o expirado' });
    }
  };

module.exports = verifyUser;