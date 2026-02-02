/**
 * Centralized Validation Utilities
 * Provides validation functions that align with client-side validation patterns
 */

// Email Validators
export const validators = {
  /**
   * Validate college email format
   * Must end with .edu, .ac.in, or .college.com
   */
  collegeEmail: (email) => {
    if (!email || typeof email !== 'string') return false
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const collegePattern = /\.(edu|ac\.in|college\.com)$/i
    return emailRegex.test(email) && collegePattern.test(email)
  },

  /**
   * Validate standard email format
   */
  email: (email) => {
    if (!email || typeof email !== 'string') return false
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  /**
   * Validate password strength
   * Returns object with isValid and strength level
   */
  password: (password) => {
    if (!password || typeof password !== 'string') {
      return { isValid: false, message: 'Password is required' }
    }
    
    if (password.length < 8) {
      return { isValid: false, message: 'Password must be at least 8 characters' }
    }

    // Calculate strength
    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    let strength = 'weak'
    if (score <= 1) strength = 'weak'
    else if (score === 2) strength = 'fair'
    else if (score === 3) strength = 'good'
    else strength = 'strong'

    return { isValid: true, strength, score }
  },

  /**
   * Validate phone number (10 digits)
   */
  phone: (phone) => {
    if (!phone) return false
    const phoneRegex = /^[0-9]{10}$/
    return phoneRegex.test(phone)
  },

  /**
   * Validate URL format
   */
  url: (url) => {
    if (!url) return true // URLs are optional
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  },

  /**
   * Validate full name (2-100 characters)
   */
  fullName: (name) => {
    if (!name || typeof name !== 'string') return false
    const trimmed = name.trim()
    return trimmed.length >= 2 && trimmed.length <= 100
  },

  /**
   * Validate roll number (minimum 3 characters)
   */
  rollNumber: (rollNum) => {
    if (!rollNum || typeof rollNum !== 'string') return false
    return rollNum.trim().length >= 3
  },

  /**
   * Validate batch year
   */
  batch: (batch) => {
    if (!batch) return false
    const year = parseInt(batch)
    const currentYear = new Date().getFullYear()
    return year >= 2000 && year <= currentYear + 10
  },

  /**
   * Validate skills array (1-20 items)
   */
  skills: (skills) => {
    return Array.isArray(skills) && skills.length >= 1 && skills.length <= 20
  },

  /**
   * Validate required string field
   */
  requiredString: (value, fieldName = 'Field') => {
    if (!value || typeof value !== 'string' || !value.trim()) {
      return { isValid: false, message: `${fieldName} is required` }
    }
    return { isValid: true }
  },

  /**
   * Validate enum value
   */
  enum: (value, allowedValues, fieldName = 'Field') => {
    if (!allowedValues.includes(value)) {
      return { 
        isValid: false, 
        message: `${fieldName} must be one of: ${allowedValues.join(', ')}` 
      }
    }
    return { isValid: true }
  },

  /**
   * Validate rating (1-5)
   */
  rating: (rating, fieldName = 'Rating') => {
    const num = parseInt(rating)
    if (isNaN(num) || num < 1 || num > 5) {
      return { isValid: false, message: `${fieldName} must be between 1 and 5` }
    }
    return { isValid: true }
  },

  /**
   * Validate MongoDB ObjectId
   */
  objectId: (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id)
  }
}

/**
 * Validate authentication signup data
 */
export const validateSignupData = (data) => {
  const errors = {}

  // Email validation
  if (!data.email) {
    errors.email = 'Email is required'
  } else if (!validators.collegeEmail(data.email)) {
    errors.email = 'Please use a valid college email address'
  }

  // Password validation
  if (!data.password) {
    errors.password = 'Password is required'
  } else {
    const passwordCheck = validators.password(data.password)
    if (!passwordCheck.isValid) {
      errors.password = passwordCheck.message
    }
  }

  // Confirm password validation
  if (!data.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password'
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Validate authentication login data
 */
export const validateLoginData = (data) => {
  const errors = {}

  if (!data.email) {
    errors.email = 'Email is required'
  } else if (!validators.email(data.email)) {
    errors.email = 'Invalid email format'
  }

  if (!data.password) {
    errors.password = 'Password is required'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Validate profile data
 */
export const validateProfileData = (data, requiredFields = []) => {
  const errors = {}

  // Check required fields
  for (const field of requiredFields) {
    if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
      errors[field] = `${field} is required`
    }
  }

  // Validate specific fields if provided
  if (data.fullName && !validators.fullName(data.fullName)) {
    errors.fullName = 'Full name must be between 2 and 100 characters'
  }

  if (data.collegeEmail && !validators.email(data.collegeEmail)) {
    errors.collegeEmail = 'Invalid email format'
  }

  if (data.whatsappNumber && !validators.phone(data.whatsappNumber)) {
    errors.whatsappNumber = 'Phone number must be 10 digits'
  }

  if (data.linkedinUrl && !validators.url(data.linkedinUrl)) {
    errors.linkedinUrl = 'Invalid LinkedIn URL'
  }

  if (data.githubUrl && !validators.url(data.githubUrl)) {
    errors.githubUrl = 'Invalid GitHub URL'
  }

  if (data.batch && !validators.batch(data.batch)) {
    errors.batch = `Batch year must be between 2000 and ${new Date().getFullYear() + 10}`
  }

  if (data.skills && !validators.skills(data.skills)) {
    errors.skills = 'Skills must contain between 1 and 20 items'
  }

  if (data.rollNumber && !validators.rollNumber(data.rollNumber)) {
    errors.rollNumber = 'Roll number must be at least 3 characters'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Validate experience metadata
 */
export const validateExperienceMetadata = (data) => {
  const errors = {}

  // Required fields
  const companyCheck = validators.requiredString(data.companyName, 'Company name')
  if (!companyCheck.isValid) errors.companyName = companyCheck.message

  const roleCheck = validators.requiredString(data.roleAppliedFor, 'Role')
  if (!roleCheck.isValid) errors.roleAppliedFor = roleCheck.message

  if (!data.batch) {
    errors.batch = 'Batch year is required'
  } else if (!validators.batch(data.batch)) {
    errors.batch = `Batch year must be between 2000 and ${new Date().getFullYear() + 10}`
  }

  // Optional but validated if provided
  if (data.placementSeason) {
    const seasonCheck = validators.enum(
      data.placementSeason, 
      ['on-campus', 'off-campus'], 
      'Placement season'
    )
    if (!seasonCheck.isValid) errors.placementSeason = seasonCheck.message
  }

  if (data.outcome) {
    const outcomeCheck = validators.enum(
      data.outcome,
      ['selected', 'not-selected', 'in-process'],
      'Outcome'
    )
    if (!outcomeCheck.isValid) errors.outcome = outcomeCheck.message
  }

  if (data.difficultyRating) {
    const difficultyCheck = validators.rating(data.difficultyRating, 'Difficulty rating')
    if (!difficultyCheck.isValid) errors.difficultyRating = difficultyCheck.message
  }

  if (data.overallExperienceRating) {
    const experienceCheck = validators.rating(data.overallExperienceRating, 'Overall experience rating')
    if (!experienceCheck.isValid) errors.overallExperienceRating = experienceCheck.message
  }

  if (data.interviewYear) {
    const year = parseInt(data.interviewYear)
    const currentYear = new Date().getFullYear()
    if (isNaN(year) || year < 2000 || year > currentYear + 1) {
      errors.interviewYear = 'Invalid interview year'
    }
  }

  if (data.interviewMonth) {
    const month = parseInt(data.interviewMonth)
    if (isNaN(month) || month < 1 || month > 12) {
      errors.interviewMonth = 'Invalid interview month'
    }
  }

  if (data.preparationTime && data.preparationTime !== '') {
    const prepTime = parseInt(data.preparationTime)
    if (isNaN(prepTime) || prepTime < 0) {
      errors.preparationTime = 'Preparation time must be a positive number'
    }
  }

  if (data.package && data.package !== '') {
    const packageValue = parseFloat(data.package)
    if (isNaN(packageValue) || packageValue < 0) {
      errors.package = 'Package must be a valid number'
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Validate experience rounds data
 */
export const validateExperienceRounds = (rounds) => {
  const errors = {}

  if (!Array.isArray(rounds)) {
    errors.rounds = 'Rounds must be an array'
    return { isValid: false, errors }
  }

  // Validate each round has required structure
  rounds.forEach((round, index) => {
    if (!round.roundName || !round.roundName.trim()) {
      errors[`round_${index}_name`] = `Round ${index + 1} name is required`
    }
  })

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Validate experience materials data
 */
export const validateExperienceMaterials = (materials) => {
  const errors = {}

  if (!Array.isArray(materials)) {
    errors.materials = 'Materials must be an array'
    return { isValid: false, errors }
  }

  // Validate each material has required structure
  materials.forEach((material, index) => {
    if (!material.title || !material.title.trim()) {
      errors[`material_${index}_title`] = `Material ${index + 1} title is required`
    }
    if (material.url && !validators.url(material.url)) {
      errors[`material_${index}_url`] = `Material ${index + 1} has invalid URL`
    }
  })

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}
