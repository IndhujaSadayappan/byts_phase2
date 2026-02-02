import express from 'express'
import passport from 'passport'
import { signup, login, authCallback } from '../controllers/authController.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)

// Google Auth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    authCallback
)

// GitHub Auth
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }))
router.get(
    '/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    authCallback
)

export default router
