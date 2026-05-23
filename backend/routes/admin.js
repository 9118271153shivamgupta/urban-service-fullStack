const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/authMiddleware');

// 1. GET ALL BOOKINGS: Admin/SuperAdmin ke liye
router.get('/all-bookings', protect, authorize('superadmin', 'admin'), async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: "Error fetching bookings" });
    }
});

// 2. UPDATE STATUS: Booking accept/reject/complete (Admin/SuperAdmin)
router.put('/update-status/:id', protect, authorize('superadmin', 'admin'), async (req, res) => {
    try {
        const { status } = req.body;
        // Status must be: 'Pending', 'Accepted', 'Completed', 'Cancelled'
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json(updatedBooking);
    } catch (err) {
        res.status(500).json({ message: "Status update failed" });
    }
});

// 3. GET ALL USERS: Sirf Super Admin ke liye
router.get('/all-users', protect, authorize('superadmin'), async (req, res) => {
    try {
        // Humne '-password' hata diya hai taaki data fetch ho sake
        const users = await User.find(); 
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Error fetching users" });
    }
});

// 4. UPDATE USER ROLE: Role Management
router.put('/update-role/:id', protect, authorize('superadmin'), async (req, res) => {
    try {
        const { role } = req.body;
        const validRoles = ['customer', 'provider', 'admin', 'superadmin'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role type" });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id, 
            { role }, 
            { new: true }
        ).select('-password');

        res.json({ message: `User role updated to ${role}`, user });
    } catch (err) {
        res.status(500).json({ message: "Server error while updating role" });
    }
});

// 5. DELETE USER
router.delete('/delete-user/:id', protect, authorize('superadmin'), async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting user" });
    }
});

// 6. DETAILED DASHBOARD STATS (Fixed Case Sensitivity)
router.get('/dashboard-stats', protect, authorize('admin', 'superadmin'), async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // User Counts
        const totalAdmins = await User.countDocuments({ role: 'admin' });
        const totalCustomers = await User.countDocuments({ role: 'customer' });
        const totalProviders = await User.countDocuments({ role: 'provider' });

        // Booking Counts (Matched with your Model Enum: Capitalized)
        const totalLeads = await Booking.countDocuments();
        const todayLeads = await Booking.countDocuments({ createdAt: { $gte: today } });
        const acceptedLeads = await Booking.countDocuments({ status: 'Accepted' }); 
        const completedLeads = await Booking.countDocuments({ status: 'Completed' });
        const cancelledLeads = await Booking.countDocuments({ status: 'Cancelled' });

        // Service Analytics
        const totalServices = await Service.countDocuments();
        const activeServicesCount = await Service.countDocuments({ isActive: true });
        const inactiveServicesCount = await Service.countDocuments({ isActive: false });

        res.json({
            totalLeads,
            todayLeads,
            acceptedLeads,
            completedLeads,
            cancelledLeads,
            totalCustomers,
            totalAdmins,
            totalProviders,
            totalServices,
            activeServicesCount,
            inactiveServicesCount,
            successRate: totalLeads > 0 ? ((completedLeads / totalLeads) * 100).toFixed(1) : 0
        });
    } catch (err) {
        console.error("Stats Error:", err);
        res.status(500).json({ message: "Error fetching dashboard data" });
    }
});

module.exports = router;