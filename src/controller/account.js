import { Router } from 'express';
import config from '../config';
import mongoose from 'mongoose';
import Account from '../model/account';
import bodyParser from 'body-parser';
import passport from 'passport';

import { generateAccessToken, respond, authenticate } from '../middleware/authMiddleware';


export default ({config, db}) => {
    let api = Router();

    // v1/account
    api.post('/register', (req,res)=>{
        Account.register(new Account({ username: req.body.email}), req.body.password, (err, account)=>{
            if(err){
               return  res.status(500).send('An error has occured:'+ err);
            }
            passport.authenticate(
                'local', {
                    session: false
                })(req, res, ()=>{
                res.status(200).send('Succesfully created new account');
            });
        });
    });

    //v1/account/login

    api.post('/login', passport.authenticate(
        'local', {
            session: false,
            scope: []
        }), generateAccessToken, respond);

     //v1/account/logout
     api.get('/logout',authenticate, (req, res)=>{
         res.logout();
         res.status(200).send("Successfully logged ou");
     });

     api.get('/me', authenticate, (req, res)=>{
         res.status(200).json(req.user);
     });
     
    return api;
}


