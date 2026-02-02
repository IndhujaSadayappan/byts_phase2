import Profile from '../models/Profile.js'
import User from '../models/User.js'
import { validateProfileData } from '../utils/validationUtils.js'

export const createProfile = async (req, res) => {
  try {
    const userId = req.user.userId
    const profileData = req.body

    // Check if profile already exists
    let profile = await Profile.findOne({ userId })
    if (profile) {
      return res.status(400).json({
        success: false,
        message: 'Profile already exists',
      })
    }

    // Define required fields for profile creation
    const requiredFields = ['fullName', 'rollNumber', 'collegeEmail', 'whatsappNumber', 'batch']

    // Comprehensive validation
    const validation = validateProfileData(profileData, requiredFields)

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors,
      })
    }

    // Create new profile
    profile = new Profile({
      userId,
      ...profileData,
    })

    await profile.save()

    // Update user profileCompleted flag
    await User.findByIdAndUpdate(userId, { profileCompleted: true })

    res.status(201).json({
      success: true,
      message: 'Profile created successfully',
      profile,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId

    const profile = await Profile.findOne({ userId })
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found',
      })
    }

    res.status(200).json({
      success: true,
      profile,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId
    const profileData = req.body

    // Validate provided data
    const validation = validateProfileData(profileData)
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors,
      })
    }

    let profile = await Profile.findOne({ userId })
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found',
      })
    }

    // Allowed fields to update (removed collegeEmail)
    const allowedFields = [
      'fullName',
      'rollNumber',
      'whatsappNumber',
      'year',
      'branch',
      'batch',
      'skills',
      'linkedinUrl',
      'githubUrl',
      'profilePicture',
      'placementStatus',
      'company',
      'role',
      'internshipType',
      'willingToMentor',
    ]

    // Update only allowed fields
    for (const field of allowedFields) {
      if (field in profileData) {
        profile[field] = profileData[field]
      }
    }

    profile.updatedAt = new Date()
    await profile.save()

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      profile,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
