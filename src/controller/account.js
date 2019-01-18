import { Router } from 'express';
import config from '../config';
import mongoose from 'mongoose';
import Account from '../model/account';
import bodyParser from 'body-parser';
import passport from 'passport';

import { generateAccessToken, respond, authenticate } from '../middleware/authMiddleware';


export default ({config, db}) => {
    let api = Router;
    return api;
}


