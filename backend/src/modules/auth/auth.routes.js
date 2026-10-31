/*import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { User } from '../users/user.model.js';
import { env } from '../../config/env.js';
const router=Router();
const registerSchema=z.object({email:z.email(),password:z.string().min(8),role:z.enum(['STUDENT','TEACHER','STAFF','PARENT']).optional()});
const sign=(user,secret,expiresIn)=>jwt.sign({sub:user._id.toString(),roles:user.roles},secret,{expiresIn});
router.post('/register',async(req,res,next)=>{try{const data=registerSchema.parse(req.body); const exists=await User.findOne({email:data.email}); if(exists)return res.status(409).json({message:'An account with this email already exists.'}); const passwordHash=await bcrypt.hash(data.password,12); const user=await User.create({email:data.email,passwordHash,roles:[data.role||'STUDENT'],status:'PENDING'}); res.status(201).json({message:'Account created. Email verification will be added next.',userId:user._id});}catch(e){next(e)}});
router.post('/login',async(req,res,next)=>{try{const data=z.object({email:z.email(),password:z.string().min(1)}).parse(req.body); const user=await User.findOne({email:data.email}).select('+passwordHash'); if(!user||!(await bcrypt.compare(data.password,user.passwordHash)))return res.status(401).json({message:'Invalid email or password.'}); if(user.status==='DISABLED'||user.status==='SUSPENDED')return res.status(403).json({message:'This account is not currently active.'}); user.lastLoginAt=new Date(); await user.save(); res.json({accessToken:sign(user,env.accessSecret,env.accessExpiresIn),refreshToken:sign(user,env.refreshSecret,env.refreshExpiresIn),user:{id:user._id,email:user.email,roles:user.roles,status:user.status,emailVerified:user.emailVerified}});}catch(e){next(e)}});
export default router;
*/

import express from 'express';

import {
  register,
  login,
  refreshToken,
  me,
  logout,
  verifyEmail,
  resendVerification,
   requestPasswordReset,
  resetPassword,
} from './auth.controller.js';

import { authenticate } from './auth.middleware.js';

const router = express.Router();


// ─────────────────────────────────────────────
// PUBLIC AUTH ROUTES
// ─────────────────────────────────────────────

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Refresh access token
router.post('/refresh', refreshToken);


// ─────────────────────────────────────────────
// PROTECTED AUTH ROUTES
// ─────────────────────────────────────────────

// Current authenticated user
router.get('/me', authenticate, me);

// Logout
router.post('/logout', authenticate, logout);

router.get('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerification);

router.post('/forgot-password', requestPasswordReset);
router.post('/reset-password', resetPassword);



export default router;