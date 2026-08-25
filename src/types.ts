export interface Produce {
  id: string;
  name: string;
  category: string;
  unit: string;
  price: number;
  supermarket: number;
  farmerShare: string;
  farm: string;
  stock: "In stock" | "Low" | "Selling fast";
  badge?: string;
  rating: number;
  desc: string;
  emoji: string;
}

export interface HubTypeOption {
  id: string;
  label: string;
  icon: string;
}

export interface Hub {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
  distance: number;
  hours: string;
  stock: string;
  stockStatus: "Well stocked" | "Refilling" | "Open today";
  crops: string;
  phone: string;
}

export interface BatchTrace {
  code: string;
  crop: string;
  plot: string;
  harvestDate: string;
  agronomist: string;
  temperature: string;
  market: string;
  status: string;
  steps: { label: string; detail: string; done: boolean }[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

export interface Testimonial {
  name: string;
  area: string;
  quote: string;
  initials: string;
}

export interface CartItem {
  productId: string;
  name: string;
  unit: string;
  price: number;
  weight: number;
  quantity: number;
  emoji: string;
}