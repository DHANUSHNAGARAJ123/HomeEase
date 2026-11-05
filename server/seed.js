const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Service = require('./models/Service');

dotenv.config();

const seed = async () => {
    try {
        await connectDB();

        // Create demo provider if not exists
        let provider = await User.findOne({ email: 'provider@demo.com' });
        if (!provider) {
            provider = await User.create({
                name: 'Demo Provider',
                email: 'provider@demo.com',
                password: 'password123',
                role: 'provider',
                phone: '9876543210',
                address: 'Chennai'
            });
            console.log('Provider created:', provider.email);
        } else {
            console.log('Provider already exists');
        }

        const serviceCount = await Service.countDocuments();
        if (serviceCount > 0) {
            console.log(`Services already exist (${serviceCount}). Skipping seed.`);
            process.exit(0);
        }

        const services = [
            {
                title: 'Plumbing Repair & Installation',
                category: 'plumber',
                description: 'Fix leaks, install pipes, unclog drains and handle all plumbing emergencies at your home or office.',
                price: 499,
                duration: '1-2 hours',
                location: 'Chennai',
                providerId: provider._id
            },
            {
                title: 'Electrical Wiring & Repairs',
                category: 'electrician',
                description: 'Certified electrician for wiring, switchboard repairs, fan installation and electrical fault diagnosis.',
                price: 599,
                duration: '1 hour',
                location: 'Chennai',
                providerId: provider._id
            },
            {
                title: 'Home Deep Cleaning',
                category: 'cleaner',
                description: 'Complete home deep cleaning including kitchen, bathrooms, floors and furniture dusting.',
                price: 1499,
                duration: '3-4 hours',
                location: 'Chennai',
                providerId: provider._id
            },
            {
                title: 'Math & Science Tuition',
                category: 'tutor',
                description: 'Experienced tutor for school and college students covering math, physics and chemistry.',
                price: 800,
                duration: '1 hour/session',
                location: 'Chennai',
                providerId: provider._id
            },
            {
                title: 'AC Service & Repair',
                category: 'ac repair',
                description: 'AC servicing, gas refill, filter cleaning and repair for all major brands.',
                price: 999,
                duration: '1-2 hours',
                location: 'Chennai',
                providerId: provider._id
            },
            {
                title: 'Carpentry & Furniture Repair',
                category: 'carpenter',
                description: 'Custom furniture, door/window repair, modular kitchen work and wood polishing.',
                price: 799,
                duration: '2-3 hours',
                location: 'Chennai',
                providerId: provider._id
            }
        ];

        await Service.insertMany(services);
        console.log(`Seeded ${services.length} services.`);
        process.exit(0);
    } catch (error) {
        console.error('Seed failed:', error.message);
        process.exit(1);
    }
};

seed();
