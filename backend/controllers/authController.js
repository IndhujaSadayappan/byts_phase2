import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import { validateSignupData, validateLoginData } from '../utils/validationUtils.js'

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

export const signup = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body

    const validation = validateSignupData({ email, password, confirmPassword })

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors,
      })
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      })
    }

    const user = new User({ email: email.toLowerCase().trim(), password })
    await user.save()

    const token = generateToken(user._id)

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      token,
      userId: user._id,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const validation = validateLoginData({ email, password })

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors,
      })
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    const token = generateToken(user._id)

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      userId: user._id,
      profileCompleted: user.profileCompleted,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const authCallback = async (req, res) => {
  try {
    const token = generateToken(req.user._id)
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'

    res.redirect(`${frontendUrl}/oauth-success?token=${token}&userId=${req.user._id}&profileCompleted=${req.user.profileCompleted}`)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
