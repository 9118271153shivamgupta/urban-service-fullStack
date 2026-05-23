const Booking = require('../models/Booking');

// 1. CREATE NEW BOOKING (Jab customer book karega)
exports.createBooking = async (req, res) => {
    try {
        const { userId, userName, serviceName, serviceId, address, phone, date } = req.body;

        const newBooking = new Booking({
            userId,
            userName,
            serviceName,
            serviceId,
            address,
            phone,
            date,
            status: 'Pending'
        });

        await newBooking.save();
        res.status(201).json({ success: true, message: "Booking created successfully!", booking: newBooking });
    } catch (error) {
        console.error("Create Booking Error:", error);
        res.status(500).json({ success: false, message: "Server Error during booking creation" });
    }
};

// 2. GET ALL BOOKINGS (For Admin / Providers)
exports.getAllBookings = async (req, res) => {
    try {
        // Bookings ko naye se purane order me fetch karega (Latest first)
        const bookings = await Booking.find().populate('userId', 'name email').sort({ createdAt: -1 });
        res.status(200).json({ success: true, bookings });
    } catch (error) {
        console.error("Get Bookings Error:", error);
        res.status(500).json({ success: false, message: "Server Error fetching bookings" });
    }
};

// 3. UPDATE BOOKING STATUS (Accepted, Completed, Cancelled)
exports.updateBookingStatus = async (req, res) => {
    try {
        const { bookingId, status } = req.body;

        // Validation check for Enum fields
        const validStatuses = ['Pending', 'Accepted', 'Completed', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid Status Value" });
        }

        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId, 
            { status }, 
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ success: false, message: "Booking record not found!" });
        }

        res.status(200).json({ success: true, message: `Booking marked as ${status}!`, booking: updatedBooking });
    } catch (error) {
        console.error("Update Booking Status Error:", error);
        res.status(500).json({ success: false, message: "Server Error changing booking status" });
    }
};