// types/restaurant.types.ts - UPDATED (Fix strict types)
export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
export type DeliveryType = 'delivery' | 'pickup';
export type PaymentMethod = 'cash' | 'card' | 'mobile';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface Order {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  orderNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: string; // JSON string
  subtotal: number;
  deliveryFee: number;
  tax: number;
  totalAmount: number;
  deliveryType: DeliveryType;
  deliveryAddress?: string;
  deliveryInstructions?: string;
  status: OrderStatus;
  statusHistory?: string; // JSON string
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  transactionId?: string;
  orderTime: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  assignedTo?: string;
  kitchenNotes?: string;
  rating?: number;
  feedback?: string;
}

export interface OrderItem {
  mealId: string;
  mealName: string;
  quantity: number;
  unitPrice: number;
  specialInstructions?: string;
}

export interface Meal {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  mealId: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  categoryName: string;
  image: string;
  preparationTime: number;
  ingredients: string[];
  calories?: number;
  spiceLevel?: number;
  isAvailable: boolean;
  isPopular: boolean;
  isDiscounted: boolean;
  discountPercentage?: number;
  sku?: string;
  sortOrder: number;
  notes?: string;
  createdBy: string;
}

export interface Category {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  categoryId: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  sortOrder: number;
  mealCount: number;
  isActive: boolean;
}

// Helper types for UI
export interface UIMeal {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  categoryName: string;
  image: string;
  preparationTime: number;
  ingredients: string[];
  calories?: number;
  spiceLevel?: number;
  isAvailable: boolean;
  isPopular: boolean;
  isDiscounted: boolean;
  discountPercentage?: number;
  sku?: string;
  sortOrder: number;
  notes?: string;
  createdBy: string;
}

export interface UICategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  sortOrder: number;
  mealCount: number;
  isActive: boolean;
}

export interface UIOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[]; // Changed from string to OrderItem[]
  subtotal: number;
  deliveryFee: number;
  tax: number;
  totalAmount: number;
  deliveryType: DeliveryType;
  deliveryAddress?: string;
  deliveryInstructions?: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  transactionId?: string;
  orderTime: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  assignedTo?: string;
  kitchenNotes?: string;
  rating?: number;
  feedback?: string;
}

// Redux State Types
export interface OrdersState {
  orders: UIOrder[];
  newOrders: UIOrder[];
  preparingOrders: UIOrder[];
  readyOrders: UIOrder[];
  isLoading: boolean;
  error: string | null;
}

export interface MealsState {
  meals: UIMeal[];
  categories: UICategory[];
  isLoading: boolean;
  error: string | null;
}

export interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}