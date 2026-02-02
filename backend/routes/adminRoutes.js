import express from 'express';
import {
    getDashboardStats,
    getAllStudents,
    getStudentDetails,
    deleteUser,
    getAllPlacedStudents,
    getAllProblems,
    getProblemDetails,
    deleteProblem
} from '../controllers/adminController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All routes are protected and admin only
router.use(authenticate, authorizeAdmin);

router.get('/stats', getDashboardStats);

router.get('/students', getAllStudents);
router.get('/students/:id', getStudentDetails);
router.delete('/students/:id', deleteUser); // user ID

router.get('/placed-students', getAllPlacedStudents);
// We can reuse getStudentDetails for placed students as it returns profile + experience
router.get('/placed-students/:id', getStudentDetails);
router.delete('/placed-students/:id', deleteUser); // user ID

router.get('/problems', getAllProblems);
router.get('/problems/:id', getProblemDetails);
router.delete('/problems/:id', deleteProblem);

export default router;
