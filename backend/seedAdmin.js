import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');

        const adminEmail = 'shanthidaarun@gmail.com';
        const adminPassword = 'PlaceHub@2026';

        const userExists = await User.findOne({ email: adminEmail });

        if (userExists) {
            // Delete existing user and recreate to ensure password is properly hashed
            await User.deleteOne({ email: adminEmail });
            console.log('Deleted existing admin user');
        }
        
        const adminUser = await User.create({
            email: adminEmail,
            password: adminPassword,
            role: 'admin',
            profileCompleted: true
        });
        console.log('Admin user created successfully with email:', adminEmail);

        process.exit();
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
