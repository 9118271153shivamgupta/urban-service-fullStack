// src/data/servicesPageData.js

export const servicesCategories = [
  {
    id: 1,
    name: "Home Repair & Maintenance",
    services: [
      { 
        id: 101, 
        title: "Electrician", 
        slug: "electrician",
        price: "199",
        about: "Expert electrical wiring, switchboard repair, and appliance setup for your home and office.",
        included: ["Short Circuit Fix", "New Wiring", "Fan/Light Installation", "MCB Repair"]
      },
      { 
        id: 102, 
        title: "Plumber", 
        slug: "plumber",
        price: "199",
        about: "Professional plumbing services for leakages, tap installations, and bathroom fittings.",
        included: ["Leakage Repair", "Taps & Mixer Fitting", "Water Tank Cleaning", "Pipeline Repair"]
      },
      { id: 103, title: "Carpenter", slug: "carpenter", price: "299", about: "Furniture repair and assembly by skilled carpenters.", included: ["Hinge Repair", "Furniture Assembly", "Door Lock Fitting"] },
      { id: 104, title: "Home Painter", slug: "home-painter", price: "999", about: "Full home painting services with premium finish.", included: ["Interior Painting", "Exterior Painting", "Wall Putty"] },
      { id: 105, title: "Gardening Services", slug: "gardening", price: "399", about: "Complete lawn maintenance and plant care.", included: ["Lawn Mowing", "Potting & Soil Mix", "Pruning"] },
      { id: 106, title: "ac-repaires", slug: "ac-repair", price: "399", about: "Complete lawn maintenance and plant care.", included: ["Lawn Mowing", "Potting & Soil Mix", "Pruning"] },
    ],
  },
  {
    id: 2,
    name: "Cleaning & Hygiene",
    services: [
      { 
        id: 201, 
        title: "Home Deep Cleaning", 
        slug: "home-deep-cleaning",
        price: "1999",
        about: "Complete deep cleaning of your entire house using professional equipment.",
        included: ["Floor Scrubbing", "Window Cleaning", "Dusting & Vacuuming", "Kitchen Degreasing"]
      },
      { id: 202, title: "Kitchen Cleaning", slug: "kitchen-cleaning", price: "999", about: "Specialized cleaning for your kitchen and cabinets.", included: ["Chimney Cleaning", "Cabinet Degreasing", "Floor Mopping"] },
      { id: 203, title: "Sofa Cleaning", slug: "sofa-cleaning", price: "499", about: "Deep shampooing and vacuuming of sofas.", included: ["Fabric Shampooing", "Stain Removal", "Vacuuming"] },
      { id: 204, title: "Mattress Cleaning", slug: "mattress-cleaning", price: "399", about: "Sanitization and cleaning for a healthy sleep.", included: ["Dust Mite Removal", "Dry Vacuuming"] },
      { id: 205, title: "Carpet Cleaning", slug: "carpet-cleaning", price: "599", about: "Industrial grade carpet shampooing.", included: ["Dry Vacuuming", "Shampooing"] },
      { id: 206, title: "Pest Control", slug: "pest-control", price: "799", about: "Effective removal of cockroaches, termites, and bugs.", included: ["Termite Control", "General Pest Spray"] },
      { id: 207, title: "Sanitization Service", slug: "sanitization", price: "499", about: "Anti-viral sanitization for homes and offices.", included: ["Surface Disinfection"] },
      { id: 208, title: "Glass Cleaning", slug: "glass-cleaning", price: "299", about: "Crystal clear glass cleaning for windows and facades.", included: ["Exterior Glass", "Window Frames"] },
      { id: 209, title: "Car Washing", slug: "car-washing", price: "349", about: "Foam wash and interior cleaning at your doorstep.", included: ["Pressure Wash", "Tire Polishing"] },
      { id: 210, title: "Car Detailing", slug: "car-detailing", price: "2499", about: "Premium car coating and interior restoration.", included: ["Wax Polishing", "Interior Deep Clean"] },
      { id: 211, title: "Car Cleaning", slug: "car-cleaning", price: "199", about: "Regular exterior and interior dry cleaning.", included: ["Vacuuming", "Dusting"] },
    ],
  },
  {
    id: 3,
    name: "Lifestyle & Personal Services",
    services: [
      { id: 301, title: "Makeup Artist", slug: "makeup-artist", price: "1500", about: "Professional makeup for all occasions.", included: ["Party Makeup", "HD Makeup"] },
      { id: 302, title: "Bridal Makeup", slug: "bridal-makeup", price: "5000", about: "Premium bridal makeup packages.", included: ["Hair Styling", "Draping"] },
      { id: 303, title: "Mehndi Artist", slug: "mehndi-artist", price: "499", about: "Beautiful mehndi designs for hands.", included: ["Arabic Design", "Bridal Mehndi"] },
    ],
  },
  {
    id: 4,
    name: "Movers & Packers",
    services: [
      { id: 401, title: "Local Shifting", slug: "local-shifting", price: "2999", about: "Safe shifting within the city.", included: ["Packing", "Unloading"] },
      { id: 402, title: "Domestic Shifting", slug: "domestic-shifting", price: "8999", about: "Inter-city relocation services.", included: ["Transit Insurance", "Bubble Wrap"] },
      { id: 403, title: "Packing Materials", slug: "packing-materials", price: "999", about: "High-quality boxes and wrapping material.", included: ["Carton Boxes", "Tapes"] },
      { id: 404, title: "Labour Services", slug: "labour-services", price: "500", about: "Skilled labor for heavy lifting.", included: ["Loading", "Unloading"] },
    ],
  },
  {
    id: 5,
    name: "Healthcare at Home",
    services: [
      { id: 501, title: "Physiotherapy at Home", slug: "physiotherapy", price: "499", about: "Professional physiotherapists for recovery.", included: ["Pain Management", "Exercise Plan"] },
    ],
  },
  {
    id: 6,
    name: "Event Management & Entertainment",
    services: [
      { id: 601, title: "Event Management", slug: "event-management", price: "4999", about: "End-to-end management for any event.", included: ["Planning", "Execution"] },
      { id: 602, title: "Marriage Planning", slug: "marriage-planning", price: "19999", about: "Full wedding coordination services.", included: ["Venue Search", "Decor"] },
      { id: 603, title: "Birthday Party", slug: "birthday-party", price: "2499", about: "Fun themes and decoration for birthdays.", included: ["Balloon Decor", "Cakes"] },
      { id: 604, title: "Marriage Hall", slug: "marriage-hall", price: "25000", about: "Best marriage hall bookings.", included: ["AC Hall", "Parking"] },
      { id: 605, title: "Flower Decoration", slug: "flower-decoration", price: "1999", about: "Fresh flower decor for any event.", included: ["Stage Decor", "Entrance"] },
      { id: 606, title: "Catering Services", slug: "catering-services", price: "250", about: "Delicious food for your guests (Per plate).", included: ["Multi-cuisine", "Servers"] },
      { id: 607, title: "Bhajan Mandali for Events", slug: "bhajan-mandali", price: "5000", about: "Traditional bhajan performances.", included: ["Singers", "Instruments"] },
      { id: 608, title: "Kirtan Party Booking", slug: "kirtan-party", price: "4000", about: "Devotional kirtan for family functions.", included: ["Sound System", "Singers"] },
      { id: 609, title: "Dholak & Tabla Players", slug: "dholak-tabla", price: "2000", about: "Skilled percussionists for events.", included: ["Live Performance"] },
      { id: 610, title: "Geet/Bhakti Singer Booking", slug: "singer-booking", price: "3000", about: "Melodious singers for your special day.", included: ["Live Music"] },
      { id: 611, title: "Shiv Charcha Group Booking", slug: "shiv-charcha", price: "1500", about: "Spiritual gatherings and discussions.", included: ["Group Setup"] },
      { id: 612, title: "Satyanarayan Katha & Puja-Paath", slug: "puja-paath", price: "1100", about: "Vedic pandits for home rituals.", included: ["Puja Material List", "Rituals"] },
      { id: 613, title: "Choreographer", slug: "choreographer", price: "5000", about: "Dance training for weddings and events.", included: ["Sangeet Prep"] },
      { id: 614, title: "Photographer", slug: "photographer", price: "3000", about: "Candid and traditional photography.", included: ["Edited Photos", "Digital Copy"] },
    ],
  },
  {
    id: 7,
    name: "Interior Design & Décor",
    services: [
      { id: 701, title: "Interior Designing", slug: "interior-design", price: "5000", about: "Transform your home with expert designs.", included: ["Space Planning", "Moodboard"] },
      { id: 702, title: "3D Design", slug: "3d-design", price: "2000", about: "Realistic 3D walkthroughs of your space.", included: ["Visual Rendering"] },
      { id: 703, title: "2D Design", slug: "2d-design", price: "1000", about: "Technical floor plans and layouts.", included: ["Blueprints"] },
    ],
  },
];