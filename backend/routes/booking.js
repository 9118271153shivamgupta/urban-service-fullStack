const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// 1. POST: Nayi booking create karein (For Customers)
router.post('/add', async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        const savedBooking = await newBooking.save();
        res.status(201).json({ success: true, data: savedBooking });
    } catch (err) {
        res.status(500).json({ message: "Booking failed", error: err });
    }
});

// 2. GET: Saari bookings nikalna (For Admin Dashboard)
router.get('/all', async (req, res) => {
    try {
        const allBookings = await Booking.find().populate('userId', 'name email phone').sort({ createdAt: -1 });
        res.json(allBookings);
    } catch (err) {
        res.status(500).json({ message: "Error fetching all bookings", error: err });
    }
});

// 3. GET: Kisi specific user ki bookings nikalna
router.get('/user/:userId', async (req, res) => {
    try {
        const userBookings = await Booking.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(userBookings);
    } catch (err) {
        res.status(500).json({ message: "Error fetching user bookings", error: err });
    }
});

// 4. PUT: Booking ka Status Update Karna
router.put('/update-status/:id', async (req, res) => {
    try {
        const { status } = req.body; 
        
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true } 
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found!" });
        }

        res.json({ success: true, message: `Booking status updated to ${status}`, data: updatedBooking });
    } catch (err) {
        res.status(500).json({ message: "Error updating booking status", error: err });
    }
});

// GET providers by service ID
router.get('/api/providers/service/:serviceId', async (req, res) => {
  try {
    const { serviceId } = req.params;
    // Un users ko find karein jinki services array mein yeh serviceId exist karti ho
    const providers = await mongoose.model('User').find({ services: serviceId });
    res.json(providers);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
});
module.exports = router;






// const express = require('express');
// const router = express.Router();
// const Booking = require('../models/Booking');
// // const bookingRoutes = require('./routes/booking');

// // 1. POST: Nayi booking create karein (For Customers)
// router.post('/add', async (req, res) => {
//     try {
//         const newBooking = new Booking(req.body);
//         const savedBooking = await newBooking.save();
//         res.status(201).json({ success: true, data: savedBooking });
//     } catch (err) {
//         res.status(500).json({ message: "Booking failed", error: err });
//     }
// });

// // 2. GET: Saari bookings nikalna (For Admin/Superadmin Dashboard)
// router.get('/all', async (req, res) => {
//     try {
//         // .populate('userId', 'name email phone') se customer ki extra details bhi mil jayengi
//         const allBookings = await Booking.find().populate('userId', 'name email phone').sort({ createdAt: -1 });
//         res.json(allBookings);
//     } catch (err) {
//         res.status(500).json({ message: "Error fetching all bookings", error: err });
//     }
// });

// // 3. GET: Kisi specific user ki bookings nikalna (For Customer Profile)
// router.get('/user/:userId', async (req, res) => {
//     try {
//         const userBookings = await Booking.find({ userId: req.params.userId }).sort({ createdAt: -1 });
//         res.json(userBookings);
//     } catch (err) {
//         res.status(500).json({ message: "Error fetching user bookings", error: err });
//     }
// });

// // 4. PUT: Booking ka Status Update Karna (Pending -> Accepted -> Completed / Cancelled)
// router.put('/update-status/:id', async (req, res) => {
//     try {
//         const { status } = req.body; // Expecting 'Accepted', 'Completed', or 'Cancelled'
        
//         const updatedBooking = await Booking.findByIdAndUpdate(
//             req.params.id,
//             { status },
//             { new: true } // Isse updated data return hota hai
//         );

//         if (!updatedBooking) {
//             return res.status(404).json({ message: "Booking not found!" });
//         }

//         res.json({ success: true, message: `Booking status updated to ${status}`, data: updatedBooking });
//     } catch (err) {
//         res.status(500).json({ message: "Error updating booking status", error: err });
//     }
// });

// module.exports = router;