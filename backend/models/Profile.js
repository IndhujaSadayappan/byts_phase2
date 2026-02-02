import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  fullName: String,
  rollNumber: String,
  collegeEmail: String,
  whatsappNumber: String,
  year: String,
  branch: String,
  batch: String,
  skills: [String],
  linkedinUrl: String,
  githubUrl: String,
  profilePicture: String,
  placementStatus: {
    type: String,
    default: 'not-placed'
  },
  company: String,
  role: String,
  internshipType: String,
  willingToMentor: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Profile', profileSchema)
