import type {
  Produce,
  Hub,
  BatchTrace,
  TeamMember,
  Testimonial,
  HubTypeOption,
} from "../types";

export const BRAND = {
  name: "Zackjay Agro Farms",
  tagline: "Straight from the farm to your doorstep",
  email: "orders@zackjayagro.ng",
  phone: "+234 812 345 6789",
  image:
    "https://storage.googleapis.com/dala-prod-public-storage/attachments/17ce64ee-e2c6-4af8-8915-9bc03a749116/1787347731050_Screenshot_2026-08-21-22-27-55-201_com.mi.globalbrowser.jpg",
};

export const STATS = [
  { value: 420, label: "Acres under cultivation" },
  { value: 12, label: "Partner market hubs" },
  { value: 6800, label: "Households served weekly" },
  { value: 0, label: "Middleman markup" },
];

export const CATEGORIES = [
  "Organic Vegetables",
  "Tubers & Grains",
  "Fresh Fruits",
  "Poultry & Livestock",
  "Oils & Honey",
];

export const PRODUCE: Produce[] = [
  { id: "p1", name: "Ugu Leaves (Pumpkin Greens)", category: "Organic Vegetables", unit: "bunch", price: 300, supermarket: 700, farmerShare: "88% to farmer", farm: "Plot A, Ochadamu", stock: "In stock", rating: 4.9, desc: "Harvested before sunrise, crisp and flavorful greens for soups.", emoji: "🍃" },
  { id: "p2", name: "Organic Sweet Potato", category: "Tubers & Grains", unit: "kg", price: 500, supermarket: 1100, farmerShare: "82% to farmer", farm: "Plot C, Ankpa", stock: "In stock", rating: 4.8, desc: "Dry, sweet tubers cured for long pantry life.", emoji: "🍠" },
  { id: "p3", name: "Fresh Watermelon", category: "Fresh Fruits", unit: "kg", price: 700, supermarket: 1500, farmerShare: "86% to farmer", farm: "Greenhouse 2, Idah", stock: "Selling fast", badge: "Harvested today", rating: 4.9, desc: "Deep red, juicy and chilled on arrival at pickup sites.", emoji: "🍉" },
  { id: "p4", name: "Premium Brown Eggs", category: "Poultry & Livestock", unit: "crate", price: 3400, supermarket: 6500, farmerShare: "90% to farm", farm: "Free-range Run, Ogbogbo", stock: "In stock", badge: "Free range", rating: 5.0, desc: "Cage-free hens, laid fresh and packed the same day.", emoji: "🥚" },
  { id: "p5", name: "Raw Honey (Forest Blend)", category: "Oils & Honey", unit: "jar", price: 3500, supermarket: 6200, farmerShare: "78% to farmer", farm: "Apiary 1, Okpanku", stock: "In stock", rating: 4.9, desc: "Unpasteurised, single-origin honey from our own hives.", emoji: "🍯" },
  { id: "p6", name: "Tomatoes (Gardener Blend)", category: "Organic Vegetables", unit: "kg", price: 800, supermarket: 1600, farmerShare: "80% to farmer", farm: "Plot B, Anyigba", stock: "Low", rating: 4.7, desc: "Sweet, dense-fleshed tomatoes for rich stews.", emoji: "🍅" },
  { id: "p7", name: "Yam Tubers (Crop Season)", category: "Tubers & Grains", unit: "tubers", price: 1800, supermarket: 3600, farmerShare: "84% to farmer", farm: "Plot A, Ochadamu", stock: "In stock", badge: "New season", rating: 4.8, desc: "Freshly dug, low moisture, perfect for pounded yam and porridge.", emoji: "🍠" },
  { id: "p8", name: "Fresh Pineapple", category: "Fresh Fruits", unit: "piece", price: 900, supermarket: 1900, farmerShare: "85% to farmer", farm: "Greenhouse 1, Idah", stock: "In stock", rating: 4.9, desc: "Sun-ripened, tangy-sweet pineapples picked at peak.", emoji: "🍍" },
  { id: "p9", name: "Cold-Pressed Palm Oil", category: "Oils & Honey", unit: "litre", price: 2600, supermarket: 4900, farmerShare: "79% to farmer", farm: "Mill, Ochadamu", stock: "In stock", rating: 4.8, desc: "Minimal processing, naturally rich red oil with deep aroma.", emoji: "🫒" },
  { id: "p10", name: "Free-Range Broiler", category: "Poultry & Livestock", unit: "whole", price: 6500, supermarket: 12000, farmerShare: "87% to farmer", farm: "Free-range Run, Ogbogbo", stock: "Selling fast", badge: "Fresh cut", rating: 5.0, desc: "Corn-fed birds, cleaned and chilled within hours of slaughter.", emoji: "🍗" },
  { id: "p11", name: "Local Capsicum (Ata Rodo)", category: "Organic Vegetables", unit: "kg", price: 950, supermarket: 2000, farmerShare: "83% to farmer", farm: "Plot B, Anyigba", stock: "In stock", rating: 4.8, desc: "Fiery and aromatic peppers, sun-dried option available.", emoji: "🌶️" },
  { id: "p12", name: "Ofada Rice (Unpolished)", category: "Tubers & Grains", unit: "5kg bag", price: 12500, supermarket: 22000, farmerShare: "81% to farmer", farm: "Plot C, Ankpa", stock: "Low", rating: 4.9, desc: "Ancient aromatic grains from regenerative paddy fields.", emoji: "🌾" },
];

export const HUB_TYPES: HubTypeOption[] = [
  { id: "all", label: "All hubs", icon: "MapPin" },
  { id: "farm", label: "Main agro farm", icon: "Sprout" },
  { id: "cold", label: "Cold storage pickup", icon: "Snowflake" },
  { id: "stand", label: "Community farm stand", icon: "Store" },
  { id: "greenhouse", label: "Organic greenhouse", icon: "Sun" },
  { id: "depot", label: "Regional depot", icon: "Warehouse" },
];

export const HUBS: Hub[] = [
  { id: "h1", name: "Zackjay Main Farm", type: "farm", x: 14, y: 24, distance: 4.2, hours: "6:00am - 6:00pm", stock: "Open today", stockStatus: "Open today", crops: "Leafy greens, yams, peppers", phone: "+234 812 345 6789" },
  { id: "h2", name: "Idah Cold Storage Pickup", type: "cold", x: 34, y: 56, distance: 18.5, hours: "7:00am - 8:00pm", stock: "Well stocked", stockStatus: "Well stocked", crops: "Watermelon, pineapple, dairy", phone: "+234 812 222 3344" },
  { id: "h3", name: "Anyigba Community Stand", type: "stand", x: 58, y: 40, distance: 27.0, hours: "6:30am - 5:00pm", stock: "Refilling", stockStatus: "Refilling", crops: "Tomatoes, peppers, tubers", phone: "+234 813 555 6677" },
  { id: "h4", name: "Ankpa Organic Greenhouse", type: "greenhouse", x: 72, y: 24, distance: 41.3, hours: "6:00am - 4:00pm", stock: "Well stocked", stockStatus: "Well stocked", crops: "Cherry tomatoes, salad greens", phone: "+234 814 888 9900" },
  { id: "h5", name: "Ogbogbo Regional Depot", type: "depot", x: 48, y: 78, distance: 63.8, hours: "24 hours", stock: "Open today", stockStatus: "Open today", crops: "Broilers, eggs, frozen crates", phone: "+234 815 111 2233" },
  { id: "h6", name: "Ochadamu Riverside Farm", type: "farm", x: 18, y: 70, distance: 9.1, hours: "6:00am - 6:00pm", stock: "Well stocked", stockStatus: "Well stocked", crops: "Oil palm, cassava, plantain", phone: "+234 812 345 6789" },
];

export const BATCHES: BatchTrace[] = [
  {
    code: "BATCH-ZK-2026",
    crop: "Organic Sweet Potato",
    plot: "Plot C, Ankpa Field 7",
    harvestDate: "Aug 21, 2026 · 06:40am",
    agronomist: "Ing. Amina Yusuf",
    temperature: "11°C constant",
    market: "Doorstep Express & Anyigba Stand",
    status: "In transit to pickup",
    steps: [
      { label: "Seeded", detail: "Certified disease-free slips, regenerative rotation", done: true },
      { label: "Cultivation", detail: "Manual weeding, zero synthetic inputs", done: true },
      { label: "Harvested", detail: "Aug 21 at 06:40am, cool morning pull", done: true },
      { label: "Cold chain", detail: "Chilled to 11°C within 40 minutes", done: true },
      { label: "Dispatch", detail: "Green crates sealed and loaded", done: false },
    ],
  },
  {
    code: "BATCH-ZK-2025",
    crop: "Free-Range Broiler",
    plot: "Ogbogbo Free-Range Run",
    harvestDate: "Aug 20, 2026 · 07:15am",
    agronomist: "Dr. Chinedu Okafor",
    temperature: "4°C blast chilled",
    market: "Regional Depot, Ogbogbo",
    status: "Delivered",
    steps: [
      { label: "Rearing", detail: "Corn-fed, antibiotic-free, 90-day grow", done: true },
      { label: "Slaughter", detail: "Humane, inspected by team veterinarian", done: true },
      { label: "Chilled", detail: "Blast chilled to 4°C same hour", done: true },
      { label: "Packed", detail: "Vacuum sealed with trace QR", done: true },
      { label: "Dispatch", detail: "Delivered to depot Aug 20", done: true },
    ],
  },
];

export const TEAM: TeamMember[] = [
  { name: "Zack Ocheja", role: "Founder & Lead Farmer", bio: "Third-generation agronomist building a transparent farm-to-table supply chain.", initials: "ZO" },
  { name: "Amina Yusuf", role: "Lead Agronomist", bio: "Oversees regenerative soil health and organic certification across all plots.", initials: "AY" },
  { name: "Chinedu Okafor", role: "Livestock Director", bio: "Veterinarian ensuring humane, antibiotic-free poultry and cattle welfare.", initials: "CO" },
];

export const TESTIMONIALS: Testimonial[] = [
  { name: "Adaeze N.", area: "Idah household", quote: "I can trace every bag of sweet potato to the exact field and farmer. This is how food should work.", initials: "AN" },
  { name: "Chef Tunde", area: "Lokoja restaurant", quote: "Zackjay crates cut my produce cost by a third and the quality beats any market run.", initials: "CT" },
  { name: "Mrs. Bolu", area: "Anyigba community", quote: "The pickup stand is 10 minutes away and the tomatoes taste like my grandmother's farm.", initials: "MB" },
];

export const shopAll = (c: string) => (c === "All" ? PRODUCE : PRODUCE.filter((p) => p.category === c));