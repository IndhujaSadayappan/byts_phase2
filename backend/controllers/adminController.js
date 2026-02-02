import User from '../models/User.js';
import Profile from '../models/Profile.js';
import Experience from '../models/Experience.js';
import Problem from '../models/Problem.js';

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        // Assuming students are users with role 'student' (or all users for now if role was just added)
        // Detailed requirement: "Total Students"
        const totalStudents = await User.countDocuments({ role: 'student' });

        // "Total Placed Students" - based on Profile placementStatus
        const totalPlacedStudents = await Profile.countDocuments({ placementStatus: 'placed' });

        const totalProblems = await Problem.countDocuments();

        res.json({
            totalUsers,
            totalStudents,
            totalPlacedStudents,
            totalProblems
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get all students
// @route   GET /api/admin/students
// @access  Private/Admin
export const getAllStudents = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, year } = req.query;
        const query = {};

        // Filter by year (using Profile)
        // Since User and Profile are separate, we need to query Profile first probably, 
        // or populate.

        // Strategy: Find Profiles matching search/year, then populate User.
        // Or Find Users matching search (email), then look for profiles.

        // Better strategy for "Search by student name or email":
        // If search is email, find User. If name, find Profile.
        // This is complex with separated models.

        // Let's build a pipeline or simplistic approach for now.
        // Since "Students Overview Page" groups by Passing Year, it likely leans on Profile data.

        // Let's aggregate from Profile
        let profileQuery = {};
        if (year) {
            profileQuery.year = year; // Assuming 'year' field in Profile is Passing Year
        }
        if (search) {
            // Search by name in Profile
            profileQuery.$or = [
                { fullName: { $regex: search, $options: 'i' } }
            ];
        }

        // Pagination
        const skip = (page - 1) * limit;

        // Find profiles first
        let profiles = await Profile.find(profileQuery)
            .populate('userId', 'email role') // Get email from User
            .skip(skip)
            .limit(Number(limit));

        // If we need to search by email, we might have to filter after receive or complex aggregate.
        // For MVP, if search looks like email, we might do a User lookup first.
        if (search && search.includes('@')) {
            const user = await User.findOne({ email: { $regex: search, $options: 'i' } });
            if (user) {
                profiles = await Profile.find({ userId: user._id });
            } else {
                profiles = [];
            }
        }

        const total = await Profile.countDocuments(profileQuery); // Approximation if email search used

        res.json({
            students: profiles,
            page: Number(page),
            pages: Math.ceil(total / limit),
            total
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get student details
// @route   GET /api/admin/students/:id
// @access  Private/Admin
export const getStudentDetails = async (req, res) => {
    try {
        // id param is userId or profileId? Let's assume userId for consistency
        const profile = await Profile.findOne({ userId: req.params.id })
            .populate('userId', 'email');

        if (!profile) {
            return res.status(404).json({ message: 'Student profile not found' });
        }

        const experiences = await Experience.find({ userId: req.params.id });
        const problems = await Problem.find({ uploadedBy: req.params.id });

        res.json({
            profile,
            experiences,
            problems
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete user (student/placed student)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // TODO: Send email notification here (mock for now or implement if nodemailer set up)
        console.log(`Sending email to ${user.email}: Your account has been removed by admin.`);

        await Profile.deleteOne({ userId: req.params.id });
        await Experience.deleteMany({ userId: req.params.id });
        await Problem.deleteMany({ uploadedBy: req.params.id });
        await User.findByIdAndDelete(req.params.id);

        res.json({ message: 'User removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get all placed students
// @route   GET /api/admin/placed-students
// @access  Private/Admin
export const getAllPlacedStudents = async (req, res) => {
    try {
        const { page = 1, limit = 10, search } = req.query;
        const query = { placementStatus: 'placed' };

        if (search) {
            query.$or = [
                { fullName: { $regex: search, $options: 'i' } },
                { company: { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (page - 1) * limit;

        const profiles = await Profile.find(query)
            .populate('userId', 'email')
            .skip(skip)
            .limit(Number(limit));

        const total = await Profile.countDocuments(query);

        res.json({
            students: profiles,
            page: Number(page),
            pages: Math.ceil(total / limit),
            total
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get all problems
// @route   GET /api/admin/problems
// @access  Private/Admin
export const getAllProblems = async (req, res) => {
    try {
        const { page = 1, limit = 10, difficulty } = req.query;
        const query = {};

        if (difficulty) {
            query.difficulty = difficulty;
        }

        const skip = (page - 1) * limit;

        const problems = await Problem.find(query)
            .populate('uploadedBy', 'email') // Get uploader info if needed
            .skip(skip)
            .limit(Number(limit));

        const total = await Problem.countDocuments(query);

        res.json({
            problems,
            page: Number(page),
            pages: Math.ceil(total / limit),
            total
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get problem details
// @route   GET /api/admin/problems/:id
// @access  Private/Admin
export const getProblemDetails = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id).populate('uploadedBy', 'email');
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        res.json(problem);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete problem
// @route   DELETE /api/admin/problems/:id
// @access  Private/Admin
export const deleteProblem = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id).populate('uploadedBy', 'email');
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        // TODO: Send email notification
        if (problem.uploadedBy) {
            console.log(`Sending email to ${problem.uploadedBy.email}: Your problem has been removed.`);
        }

        await Problem.findByIdAndDelete(req.params.id);

        res.json({ message: 'Problem removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
