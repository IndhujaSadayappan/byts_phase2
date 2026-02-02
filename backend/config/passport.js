import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as GitHubStrategy } from 'passport-github2'
import User from '../models/User.js'
import dotenv from 'dotenv'

dotenv.config()

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (err) {
        done(err, null)
    }
})

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000'

// Google Strategy
if (process.env.GOOGLE_CLIENT_ID === 'your_google_client_id') {
    console.warn('WARNING: Google Client ID is not set in .env. OAuth will fail.')
}

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:5000/api/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id })

                if (user) {
                    return done(null, user)
                }

                const email = profile.emails[0].value
                user = await User.findOne({ email })

                if (user) {
                    user.googleId = profile.id
                    await user.save()
                    return done(null, user)
                }

                user = new User({
                    googleId: profile.id,
                    email: email,
                })
                await user.save()
                done(null, user)
            } catch (err) {
                done(err, null)
            }
        }
    )
)

// GitHub Strategy
if (process.env.GITHUB_CLIENT_ID === 'your_github_client_id') {
    console.warn('WARNING: GitHub Client ID is not set in .env. OAuth will fail.')
}

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: 'http://localhost:5000/api/auth/github/callback',
            scope: ['user:email'],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ githubId: profile.id })

                if (user) {
                    return done(null, user)
                }

                let email = profile.emails && profile.emails[0] ? profile.emails[0].value : null

                if (!email) {
                    return done(new Error("Email is required but not provided by GitHub Account"), null);
                }

                user = await User.findOne({ email })

                if (user) {
                    user.githubId = profile.id
                    await user.save()
                    return done(null, user)
                }

                user = new User({
                    githubId: profile.id,
                    email: email,
                })
                await user.save()
                done(null, user)
            } catch (err) {
                done(err, null)
            }
        }
    )
)
