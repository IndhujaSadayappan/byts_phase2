# Server-Side Validation Implementation - Walkthrough

## Overview

This document provides a comprehensive walkthrough of the server-side validation implementation for POST and PUT API requests. The validation aligns with existing client-side validation patterns to ensure data integrity and provide consistent error messages.

## What Was Implemented

### 1. Centralized Validation Utilities (`backend/utils/validationUtils.js`)

Created a comprehensive validation utility module with reusable validators:

#### Core Validators
- **`collegeEmail(email)`** - Validates college email format (must end with `.edu`, `.ac.in`, or `.college.com`)
- **`email(email)`** - Validates standard email format
- **`password(password)`** - Validates password (min 8 chars) and calculates strength
- **`phone(phone)`** - Validates 10-digit phone numbers
- **`url(url)`** - Validates URL format (optional fields)
- **`fullName(name)`** - Validates name length (2-100 characters)
- **`rollNumber(rollNum)`** - Validates roll number (min 3 characters)
- **`batch(batch)`** - Validates batch year (2000 to current year + 10)
- **`skills(skills)`** - Validates skills array (1-20 items)
- **`rating(rating)`** - Validates rating values (1-5)
- **`objectId(id)`** - Validates MongoDB ObjectId format

#### Composite Validators
- **`validateSignupData(data)`** - Validates signup form data
- **`validateLoginData(data)`** - Validates login form data
- **`validateProfileData(data, requiredFields)`** - Validates profile creation/update data
- **`validateExperienceMetadata(data)`** - Validates experience metadata
- **`validateExperienceRounds(rounds)`** - Validates experience rounds array
- **`validateExperienceMaterials(materials)`** - Validates experience materials array

### 2. Authentication Controller Updates (`backend/controllers/authController.js`)

#### Signup Endpoint (`POST /api/auth/signup`)
**Validations Added:**
- Email is required and must be a valid college email
- Password is required and must be at least 8 characters
- Confirm password must match password
- Email is normalized (lowercase, trimmed) before storage

**Error Response Format:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": "Please use a valid college email address",
    "password": "Password must be at least 8 characters",
    "confirmPassword": "Passwords do not match"
  }
}
```

#### Login Endpoint (`POST /api/auth/login`)
**Validations Added:**
- Email is required and must be valid format
- Password is required
- Email is normalized before lookup

### 3. Profile Controller Updates (`backend/controllers/profileController.js`)

#### Create Profile Endpoint (`POST /api/profile`)
**Validations Added:**
- Required fields: `fullName`, `rollNumber`, `collegeEmail`, `whatsappNumber`, `batch`
- Full name must be 2-100 characters
- Roll number must be at least 3 characters
- College email must be valid format
- WhatsApp number must be exactly 10 digits
- Batch year must be valid (2000 to current year + 10)
- Skills array must contain 1-20 items (if provided)
- LinkedIn and GitHub URLs must be valid (if provided)

**Error Response Format:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "fullName": "Full name must be between 2 and 100 characters",
    "whatsappNumber": "Phone number must be 10 digits",
    "skills": "Skills must contain between 1 and 20 items"
  }
}
```

#### Update Profile Endpoint (`PUT /api/profile`)
**Existing Validation Enhanced:**
- Uses the same `validateProfileData` function
- No required fields for updates (only validates provided fields)
- Prevents updating immutable fields (collegeEmail)

### 4. Experience Controller Updates (`backend/controllers/experienceController.js`)

#### Save Experience Metadata Endpoint (`POST /api/experience/metadata`)
**Validations Added:**
- Required fields: `companyName`, `roleAppliedFor`, `batch`
- Company name must be non-empty string
- Role must be non-empty string
- Batch year must be valid
- Placement season must be 'on-campus' or 'off-campus' (if provided)
- Outcome must be 'selected', 'not-selected', or 'in-process' (if provided)
- Difficulty rating must be 1-5 (if provided)
- Overall experience rating must be 1-5 (if provided)
- Interview year must be valid (if provided)
- Interview month must be 1-12 (if provided)
- Preparation time must be positive number (if provided)
- Package must be valid number (if provided)
- Experience ID must be valid MongoDB ObjectId (for updates)

**Error Response Format:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "companyName": "Company name is required",
    "difficultyRating": "Difficulty rating must be between 1 and 5",
    "outcome": "Outcome must be one of: selected, not-selected, in-process"
  }
}
```

#### Save Experience Rounds Endpoint (`PUT /api/experience/:experienceId/rounds`)
**Validations Added:**
- Experience ID must be valid MongoDB ObjectId
- Rounds must be an array
- Each round must have a non-empty `roundName`

**Error Response Format:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "round_0_name": "Round 1 name is required",
    "round_2_name": "Round 3 name is required"
  }
}
```

#### Save Experience Materials Endpoint (`PUT /api/experience/:experienceId/materials`)
**Validations Added:**
- Experience ID must be valid MongoDB ObjectId
- Materials must be an array
- Each material must have a non-empty `title`
- Each material URL must be valid format (if provided)

**Error Response Format:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "material_0_title": "Material 1 title is required",
    "material_1_url": "Material 2 has invalid URL"
  }
}
```

## Alignment with Client-Side Validation

The server-side validation mirrors the client-side validation patterns:

### Signup Form (`frontend/src/components/SignupForm.jsx`)
- ✅ College email pattern validation
- ✅ Password minimum 8 characters
- ✅ Password strength calculation
- ✅ Confirm password matching

### Personal Details Step (`frontend/src/components/steps/PersonalDetailsStep.jsx`)
- ✅ Full name required
- ✅ Roll number required
- ✅ WhatsApp number 10 digits
- ✅ College email validation

### Experience Metadata Form (`frontend/src/pages/ExperienceMetadataForm.jsx`)
- ✅ Company name required
- ✅ Role required
- ✅ Batch year required
- ✅ Rating validations (1-5)
- ✅ Enum validations (placement season, outcome)

## Testing the Implementation

### Test Signup Validation

```bash
# Invalid college email
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@gmail.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'

# Expected: 400 error with "Please use a valid college email address"

# Short password
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@college.edu",
    "password": "short",
    "confirmPassword": "short"
  }'

# Expected: 400 error with "Password must be at least 8 characters"

# Mismatched passwords
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@college.edu",
    "password": "password123",
    "confirmPassword": "different123"
  }'

# Expected: 400 error with "Passwords do not match"
```

### Test Profile Validation

```bash
# Invalid phone number
curl -X POST http://localhost:5000/api/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "fullName": "John Doe",
    "rollNumber": "2024001",
    "collegeEmail": "john@college.edu",
    "whatsappNumber": "123",
    "batch": "2024"
  }'

# Expected: 400 error with "Phone number must be 10 digits"

# Invalid skills array
curl -X POST http://localhost:5000/api/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "fullName": "John Doe",
    "rollNumber": "2024001",
    "collegeEmail": "john@college.edu",
    "whatsappNumber": "1234567890",
    "batch": "2024",
    "skills": []
  }'

# Expected: 400 error with "Skills must contain between 1 and 20 items"
```

### Test Experience Validation

```bash
# Missing required fields
curl -X POST http://localhost:5000/api/experience/metadata \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "companyName": ""
  }'

# Expected: 400 error with "Company name is required"

# Invalid rating
curl -X POST http://localhost:5000/api/experience/metadata \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "companyName": "Google",
    "roleAppliedFor": "SDE",
    "batch": "2024",
    "difficultyRating": "10"
  }'

# Expected: 400 error with "Difficulty rating must be between 1 and 5"

# Invalid ObjectId
curl -X PUT http://localhost:5000/api/experience/invalid-id/rounds \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "rounds": []
  }'

# Expected: 400 error with "Invalid experience ID format"
```

## Benefits

1. **Data Integrity** - Prevents invalid data from being stored in the database
2. **Security** - Validates input to prevent injection attacks and malformed data
3. **Consistency** - Error messages match client-side validation for better UX
4. **Maintainability** - Centralized validation logic is easy to update and extend
5. **Reusability** - Validation functions can be used across multiple controllers
6. **Type Safety** - Ensures data types match expected formats before processing

## Future Enhancements

1. Add rate limiting to prevent abuse
2. Add sanitization for user input (XSS prevention)
3. Add more specific error codes for different validation failures
4. Add validation for file uploads (size, type)
5. Add custom validation messages based on locale/language
6. Add validation logging for monitoring and debugging
