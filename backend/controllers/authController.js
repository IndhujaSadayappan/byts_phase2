import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import { validateSignupData, validateLoginData } from '../utils/validationUtils.js'

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

export const signup = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body

    // Comprehensive validation using validation utilities
    const validation = validateSignupData({ email, password, confirmPassword })

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors,
      })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      })
    }

    // Create new user
    const user = new User({ email: email.toLowerCase().trim(), password })
    await user.save()

    // Generate token
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

    // Comprehensive validation using validation utilities
    const validation = validateLoginData({ email, password })

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors,
      })
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase().trim() })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    // Generate token
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
