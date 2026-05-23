import CleaningIcon from '../assets/icons/cleaning.avif';
import room from '../assets/icons/room.jpg';
import kitchen from '../assets/icons/kitchen.jpg';
import livingbedroom from '../assets/icons/living&bedroom.jpg';
import cacroch from '../assets/icons/cacroch.jpg';
import termite from '../assets/icons/termite.jpg';
import bedbugs from '../assets/icons/bedbugs.jpg';
import ant from '../assets/icons/ant.jpg';
import ac from '../assets/icons/ac.jpg';
import washingmachine from '../assets/icons/washing-machine.jpg';
import refridgerator from '../assets/icons/refridgerator.jpg';
import telivition from '../assets/icons/telivition.jpg';
import chimny from '../assets/icons/chimny.jpg';
import microwave from '../assets/icons/microwave.jpg';
import stove from '../assets/icons/stove.jpg';
import laptop from '../assets/icons/laptop.jpg';
import ro from '../assets/icons/ro.jpg';
import geyser from '../assets/icons/geyser.jpg';
import aircooler from '../assets/icons/aircooler.jpg';
import RepairIcon from '../assets/icons/repair.png';
import PestIcon from '../assets/icons/pest.png';
import Electrician from '../assets/icons/electrician.jpg';
import Plumber from '../assets/icons/plumber.jpg';
import Carpenter from '../assets/icons/carpenter.jpg';
import Festival_light from '../assets/icons/festival_light.jpg';
import Fan from '../assets/icons/fan.jpg';
import Furniture from '../assets/icons/furniture_assembly.jpg';
import Geyser from '../assets/icons/Geyser_pic.jpg';
import Ikea_furniture from '../assets/icons/Ikea_furniture.jpg';
import Tile from '../assets/icons/tile_grouting.jpg';

// Fallback image generator (Random service icons from Unsplash)



export const servicesData = [
  // --- CATEGORY: CLEANING & PEST CONTROL ---
  // Sub-Category: Cleaning
  {
    id: "bathroom-cleaning",
    category: "Cleaning & Pest Control",
    subCategory: "Cleaning",
    name: "Bathroom Cleaning",
    icon: CleaningIcon,
    // fallbackIcon: fallback("bathroom"),
    tagline: "Deep sanitization and scale removal for sparkling bathrooms.",
    price: "₹299 - ₹899",
    features: ["Tiles & Floor scrubbing", "Taps & Fixtures descaling", "Mirror & Glass cleaning", "Disinfection"]
  },
  {
    id: "room-cleaning",
    category: "Cleaning & Pest Control",
    subCategory: "Cleaning",
    name: "room Cleaning",
    icon: room,
    tagline: "Deep sanitization and scale removal for sparkling bathrooms.",
    price: "₹299 - ₹899",
    features: ["Tiles & Floor scrubbing", "Taps & Fixtures descaling", "Mirror & Glass cleaning", "Disinfection"]
  },
  {
    id: "kitchen-cleaning",
    category: "Cleaning & Pest Control",
    subCategory: "Cleaning",
    name: "Kitchen Cleaning",
    icon: kitchen,
    tagline: "Professional removal of oil and grease stains.",
    price: "₹599 - ₹1,499",
    features: ["Chimney degreasing", "Countertop cleaning", "Cabinet internal cleaning", "Floor scrubbing"]
  },
  {
    id: "living-bedroom-cleaning",
    category: "Cleaning & Pest Control",
    subCategory: "Cleaning",
    name: "Living & Bedroom Cleaning",
    icon: livingbedroom,
    tagline: "Complete dusting and vacuuming for a fresh home.",
    price: "₹799 - ₹1,999",
    features: ["Furniture dusting", "Floor mopping", "Window cleaning", "Fan & Light cleaning"]
  },
  {
    id: "full-home-cleaning",
    category: "Cleaning & Pest Control",
    subCategory: "Cleaning",
    name: "Full Home/ Book by Room Cleaning",
    icon: "./hero.jpg",
    tagline: "Deep cleaning for every corner of your house.",
    price: "₹2,499 - ₹5,999",
    features: ["End-to-end cleaning", "Kitchen & Bathroom deep clean", "Dry vacuuming", "Spot removal"]
  },
  // Sub-Category: Pest Control
  {
    id: "cockroach-control",
    category: "Cleaning & Pest Control",
    subCategory: "Pest Control",
    name: "Cockroach Control",
    icon: cacroch,
    tagline: "Herbal gel treatment for a roach-free home.",
    price: "₹399 - ₹999",
    features: ["Herbal gel application", "Safe for kids & pets", "Odorless treatment", "Kitchen & Cabinet focus"]
  },
  {
    id: "termite-control",
    category: "Cleaning & Pest Control",
    subCategory: "Pest Control",
    name: "Termite Control",
    icon: termite,
    tagline: "Advanced protection against wood-eating termites.",
    price: "₹1,200 - ₹4,500",
    features: ["Drilling treatment", "Chemical barrier", "Warranty covered", "Professional inspection"]
  },
  {
    id: "bed-bugs-control",
    category: "Cleaning & Pest Control",
    subCategory: "Pest Control",
    name: "Bed Bugs Control",
    icon: bedbugs,
    tagline: "Effective treatment to ensure a peaceful sleep.",
    price: "₹599 - ₹1,599",
    features: ["Spray treatment", "Targeted application", "Follow-up visit", "Safe chemical use"]
  },
  {
    id: "ant-control",
    category: "Cleaning & Pest Control",
    subCategory: "Pest Control",
    name: "Ant Control",
    icon: ant,
    tagline: "Say goodbye to ant trails in your kitchen.",
    price: "₹299 - ₹799",
    features: ["Sugar ant treatment", "Wall crevice filling", "Residual spray", "Safe environment"]
  },

  // --- CATEGORY: AC & APPLIANCE REPAIR ---
  // Sub-Category: Large appliances
  {
    id: "ac-repair",
    category: "AC & Appliance Repair",
    subCategory: "Large appliances",
    name: "AC",
    icon: ac,
    tagline: "Expert repair and servicing for all AC types.",
    price: "₹499 - ₹1,499",
    features: ["Filter cleaning", "Gas charging", "Leakage check", "Jet pump service"]
  },
  {
    id: "washing-machine-repair",
    category: "AC & Appliance Repair",
    subCategory: "Large appliances",
    name: "Washing Machine",
    icon: washingmachine,
    tagline: "On-site repair for top and front load machines.",
    price: "₹399 - ₹1,200",
    features: ["Drum cleaning", "Motor repair", "PCB troubleshooting", "Installation"]
  },
  {
    id: "refrigerator-repair",
    category: "AC & Appliance Repair",
    subCategory: "Large appliances",
    name: "Refrigerator",
    icon: refridgerator,
    tagline: "Cooling restoration and gas filling services.",
    price: "₹299 - ₹1,500",
    features: ["Gas refilling", "Thermostat check", "Door gasket change", "Compressor repair"]
  },
  {
    id: "television-repair",
    category: "AC & Appliance Repair",
    subCategory: "Large appliances",
    name: "Television",
    icon: telivition,
    tagline: "Fixing LED/LCD display and sound issues.",
    price: "₹499 - ₹2,999",
    features: ["Screen replacement", "Sound repair", "Board fixing", "Wall mounting"]
  },
  // Sub-Category: Other appliances
  {
    id: "chimney-repair",
    category: "AC & Appliance Repair",
    subCategory: "Other appliances",
    name: "Chimney",
    icon: chimny,
    tagline: "Deep cleaning and motor repair for kitchen chimneys.",
    price: "₹599 - ₹1,299",
    features: ["Filter degreasing", "Suction check", "Motor servicing", "Installation"]
  },
  {
    id: "microwave-repair",
    category: "AC & Appliance Repair",
    subCategory: "Other appliances",
    name: "Microwave",
    icon: microwave,
    tagline: "Fixing heating issues and magnetron problems.",
    price: "₹299 - ₹999",
    features: ["Magnetron change", "Touchpad repair", "Internal cleaning", "Fuse replacement"]
  },
  {
    id: "stove-repair",
    category: "AC & Appliance Repair",
    subCategory: "Other appliances",
    name: "Stove",
    icon: stove,
    tagline: "Burner cleaning and leakage check for gas stoves.",
    price: "₹199 - ₹599",
    features: ["Burner cleaning", "Gas leakage check", "Knob repair", "Glass top fixing"]
  },
  {
    id: "laptop-repair",
    category: "AC & Appliance Repair",
    subCategory: "Other appliances",
    name: "Laptop",
    icon: laptop,
    tagline: "Fast hardware and software troubleshooting.",
    price: "₹499 - ₹4,999",
    features: ["OS installation", "Screen repair", "Battery change", "Speed boost"]
  },
  {
    id: "water-purifier-repair",
    category: "AC & Appliance Repair",
    subCategory: "Other appliances",
    name: "RO/Water Purifier",
    icon: ro,
    tagline: "Ensure pure water with timely filter changes.",
    price: "₹399 - ₹2,500",
    features: ["Filter replacement", "TDS adjustment", "Membrane cleaning", "Pump repair"]
  },
  {
    id: "geyser-repair-appliance",
    category: "AC & Appliance Repair",
    subCategory: "Other appliances",
    name: "Geyser",
    icon: geyser,
    tagline: "Safe heating and thermostat repair.",
    price: "₹299 - ₹799",
    features: ["Heating element check", "Thermostat repair", "Installation", "Tank cleaning"]
  },
  {
    id: "air-cooler-repair",
    category: "AC & Appliance Repair",
    subCategory: "Other appliances",
    name: "Air Cooler",
    icon: aircooler,
    tagline: "Cooling pad change and motor servicing.",
    price: "₹199 - ₹699",
    features: ["Motor repair", "Pump change", "Cleaning", "Pad replacement"]
  },

  // --- CATEGORY: ELECTRICIAN, PLUMBER & CARPENTER ---
  // Sub-Category: Repairs
  {
    id: "electrician",
    category: "Electrician, Plumber & Carpenter",
    subCategory: "Repairs",
    name: "Electrician",
    icon: Electrician,
    tagline: "Certified electricians for all home wiring needs.",
    price: "₹99 - ₹499",
    features: ["Wiring check", "Switch repair", "MCB installation", "Socket fixing"]
  },
  {
    id: "plumber",
    category: "Electrician, Plumber & Carpenter",
    subCategory: "Repairs",
    name: "Plumber",
    icon: Plumber,
    tagline: "Fast leakage fixing and pipe repairs.",
    price: "₹149 - ₹799",
    features: ["Tap leak fix", "Pipe replacement", "Toilet repair", "Tank cleaning"]
  },
  {
    id: "carpenter",
    category: "Electrician, Plumber & Carpenter",
    subCategory: "Repairs",
    name: "Carpenter",
    icon: Carpenter,
    tagline: "Expert furniture repair and door fixing.",
    price: "₹199 - ₹1,200",
    features: ["Handle/Hinge repair", "Lock installation", "Wood polishing", "Furniture assembly"]
  },
  {
    id: "festival-lights",
    category: "Electrician, Plumber & Carpenter",
    subCategory: "Repairs",
    name: "Festival Lights Installation",
    icon: Festival_light,
    tagline: "Safe and beautiful lighting for your home.",
    price: "₹499 - ₹1,999",
    features: ["Safe wiring", "Height hanging", "Outdoor lighting", "Timer setup"]
  },
  // Sub-Category: Installations & other services
  {
    id: "fan-installation",
    category: "Electrician, Plumber & Carpenter",
    subCategory: "Installations & other services",
    name: "Fan Installation",
    icon: Fan,
    tagline: "Standard ceiling and wall fan installation.",
    price: "₹149 - ₹299",
    features: ["Ceiling fan fitting", "Regulator check", "Wall fan mounting", "Noise check"]
  },
  {
    id: "furniture-assembly",
    category: "Electrician, Plumber & Carpenter",
    subCategory: "Installations & other services",
    name: "Furniture Assembly",
    icon: Furniture,
    tagline: "Quick assembly of your new furniture pieces.",
    price: "₹499 - ₹2,500",
    features: ["Bed assembly", "Table setup", "Wardrobe fixing", "Instruction follow"]
  },
  {
    id: "geyser-installation",
    category: "Electrician, Plumber & Carpenter",
    subCategory: "Installations & other services",
    name: "Geyser",
    icon: Geyser,
    tagline: "Standard geyser fitting and plumbing.",
    price: "₹399 - ₹599",
    features: ["Wall mounting", "Pipe connection", "Electric wiring", "Leak check"]
  },
  {
    id: "ikea-furniture-assembly",
    category: "Electrician, Plumber & Carpenter",
    subCategory: "Installations & other services",
    name: "IKEA Furniture Assembly",
    icon: Ikea_furniture,
    tagline: "Specialized assembly for flat-pack IKEA products.",
    price: "₹699 - ₹3,000",
    features: ["Expert handling", "Flat-pack specialist", "All tools provided", "Final check"]
  },
  {
    id: "tile-grouting",
    category: "Electrician, Plumber & Carpenter",
    subCategory: "Installations & other services",
    name: "Tile Grouting",
    icon: Tile,
    tagline: "Filling gaps to prevent water seepage.",
    price: "₹299 - ₹999",
    features: ["Gap cleaning", "New grout filling", "Waterproofing", "Finish check"]
  }
];