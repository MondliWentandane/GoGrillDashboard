// store/slices/ordersSlice.ts - COMPLETE UPDATED VERSION
import { createSlice, createAsyncThunk,type PayloadAction } from '@reduxjs/toolkit';
import type { UIOrder, OrderItem, OrderStatus, DeliveryType, PaymentMethod, PaymentStatus } from '../../types/restaurant.types';
import ApiService from '../../services/appwriteService';

interface OrdersState {
  orders: UIOrder[];
  newOrders: UIOrder[];
  preparingOrders: UIOrder[];
  readyOrders: UIOrder[];
  isLoading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  newOrders: [],
  preparingOrders: [],
  readyOrders: [],
  isLoading: false,
  error: null,
};

// Helper to parse JSON strings from AppWrite or use array directly
const parseOrderItems = (itemsData: any): OrderItem[] => {
  try {
    if (Array.isArray(itemsData)) {
      return itemsData;
    }
    if (typeof itemsData === 'string') {
      return JSON.parse(itemsData);
    }
    return [];
  } catch {
    return [];
  }
};

// Helper to convert AppWrite order to UIOrder
const mapToUIOrder = (doc: any): UIOrder => ({
  id: doc.$id,
  orderNumber: doc.orderNumber,
  customerName: doc.customerName,
  customerEmail: doc.customerEmail,
  customerPhone: doc.customerPhone,
  items: parseOrderItems(doc.items),
  subtotal: doc.subtotal || 0,
  deliveryFee: doc.deliveryFee || 0,
  tax: doc.tax || 0,
  totalAmount: doc.totalAmount || 0,
  deliveryType: (doc.deliveryType || 'delivery') as DeliveryType,
  deliveryAddress: doc.deliveryAddress,
  deliveryInstructions: doc.deliveryInstructions,
  status: (doc.status || 'pending') as OrderStatus,
  paymentMethod: (doc.paymentMethod || 'cash') as PaymentMethod,
  paymentStatus: (doc.paymentStatus || 'pending') as PaymentStatus,
  transactionId: doc.transactionId,
  orderTime: doc.orderTime || doc.$createdAt,
  estimatedDelivery: doc.estimatedDelivery,
  actualDelivery: doc.actualDelivery,
  assignedTo: doc.assignedTo,
  kitchenNotes: doc.kitchenNotes,
  rating: doc.rating,
  feedback: doc.feedback,
});

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiService.getOrders();
      const uiOrders = response.documents.map(mapToUIOrder);
      return uiOrders;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, status }: { orderId: string; status: OrderStatus }, { rejectWithValue }) => {
    try {
      await ApiService.updateOrderStatus(orderId, status);
      return { orderId, status };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<UIOrder>) => {
      state.orders.unshift(action.payload);
      state.newOrders.unshift(action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<UIOrder[]>) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.newOrders = action.payload.filter(order => order.status === 'pending');
        state.preparingOrders = action.payload.filter(order => 
          order.status === 'confirmed' || order.status === 'preparing'
        );
        state.readyOrders = action.payload.filter(order => order.status === 'ready');
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const { orderId, status } = action.payload;
        const orderIndex = state.orders.findIndex(order => order.id === orderId);
        
        if (orderIndex !== -1) {
          state.orders[orderIndex].status = status;
          
          // Re-categorize orders
          state.newOrders = state.orders.filter(order => order.status === 'pending');
          state.preparingOrders = state.orders.filter(order => 
            order.status === 'confirmed' || order.status === 'preparing'
          );
          state.readyOrders = state.orders.filter(order => order.status === 'ready');
        }
      });
  },
});

export const { addOrder, clearError } = ordersSlice.actions;
export default ordersSlice.reducer;