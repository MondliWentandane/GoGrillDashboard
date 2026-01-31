// services/appwriteService.ts - FIXED VERSION
import { Client, Databases, Query, ID } from 'appwrite';

// Server-side client with API key
const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('69771fd9001df1576f7e');

// Add API key to headers for ALL requests
client.headers['X-Appwrite-Key'] = 'standard_c1cbafa06829a9025f6261ad8f0dda7c54c45637b7faaf1ba185f4603f4b5b6088ba35edcb9908491b35fdb18472dca527d7b49652f33fdcad3767bee8104b47c23979e81b849630eba4f46e38e5acdefa50e5c8f26d3aa9d5d954b215b7e3f3425b7cdfab6ababd2398578a057eefc498482517ce1258eded3be9473636dd63';

export const databases = new Databases(client);
export { ID, Query };

const DATABASE_ID = 'restaurant_db';

// Helper function to convert AppWrite document to our type
const mapDocument = <T>(doc: any): T => {
  return {
    id: doc.$id,
    ...doc
  } as T;
};

const mapDocuments = <T>(docs: any[]): T[] => {
  return docs.map(doc => mapDocument<T>(doc));
};

export class ApiService {
  static DATABASE_ID = DATABASE_ID;

  // ============ CATEGORIES ============
  static async getCategories() {
    try {
      console.log('📦 Fetching categories from AppWrite...');
      const response = await databases.listDocuments(
        DATABASE_ID,
        'categories',
        [
          Query.orderAsc('sortOrder'),
          Query.equal('isActive', true),
          Query.limit(100)
        ]
      );
      
      console.log(`✅ Found ${response.total} categories`);
      return {
        ...response,
        documents: mapDocuments<any>(response.documents)
      };
    } catch (error: any) {
      console.error('❌ Error fetching categories:', error.message || error);
      throw error;
    }
  }

  // ============ MEALS ============
  static async getMeals(categoryId?: string) {
    try {
      let queries = [
        Query.limit(100),
        Query.orderAsc('sortOrder')
      ];
      
      if (categoryId) {
        queries.push(Query.equal('categoryId', categoryId));
      }
      
      queries.push(Query.equal('isAvailable', true));
      
      const response = await databases.listDocuments(
        DATABASE_ID,
        'meals',
        queries
      );
      
      console.log(`✅ Found ${response.total} meals`);
      return {
        ...response,
        documents: mapDocuments<any>(response.documents)
      };
    } catch (error: any) {
      console.error('❌ Error fetching meals:', error.message || error);
      throw error;
    }
  }

  static async createMeal(mealData: any) {
    try {
      console.log('🍔 Creating meal:', mealData);
      
      const data = {
        mealId: ID.unique(),
        ...mealData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      console.log('Sending to AppWrite:', data);
      
      const response = await databases.createDocument(
        DATABASE_ID,
        'meals',
        ID.unique(),
        data
      );
      
      console.log('✅ Meal created successfully:', response.$id);
      console.log('Response:', response);
      
      return mapDocument<any>(response);
    } catch (error: any) {
      console.error('❌ Error creating meal:', error);
      console.error('Error details:', error.message, error.code, error.type);
      throw new Error(error.message || 'Failed to create meal');
    }
  }

  static async updateMeal(mealId: string, mealData: any) {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        'meals',
        mealId,
        {
          ...mealData,
          updatedAt: new Date().toISOString(),
        }
      );
      
      console.log('✅ Meal updated:', mealId);
      return mapDocument<any>(response);
    } catch (error: any) {
      console.error('❌ Error updating meal:', error.message || error);
      throw error;
    }
  }

  static async deleteMeal(mealId: string) {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        'meals',
        mealId
      );
      
      console.log('✅ Meal deleted:', mealId);
      return mealId;
    } catch (error: any) {
      console.error('❌ Error deleting meal:', error.message || error);
      throw error;
    }
  }

  // ============ ORDERS ============
  static async getOrders(status?: string) {
    try {
      let queries = [
        Query.orderDesc('$createdAt'), 
        Query.limit(50)
      ];
      
      if (status) {
        queries.push(Query.equal('status', status));
      }
      
      const response = await databases.listDocuments(
        DATABASE_ID,
        'orders',
        queries
      );
      
      console.log(`✅ Found ${response.total} orders`);
      return {
        ...response,
        documents: mapDocuments<any>(response.documents)
      };
    } catch (error: any) {
      console.error('❌ Error fetching orders:', error.message || error);
      throw error;
    }
  }

  static async updateOrderStatus(orderId: string, status: string, notes?: string) {
    try {
      // First get the current order
      const order = await databases.getDocument(
        DATABASE_ID,
        'orders',
        orderId
      );
      
      const statusHistory = order.statusHistory 
        ? JSON.parse(order.statusHistory as string)
        : [];
      
      statusHistory.push({
        status,
        timestamp: new Date().toISOString(),
        updatedBy: 'admin',
      });
      
      const response = await databases.updateDocument(
        DATABASE_ID,
        'orders',
        orderId,
        {
          status,
          statusHistory: JSON.stringify(statusHistory),
          updatedAt: new Date().toISOString(),
          ...(notes && { kitchenNotes: notes }),
        }
      );
      
      console.log(`✅ Order ${orderId} status updated to: ${status}`);
      return mapDocument<any>(response);
    } catch (error: any) {
      console.error('❌ Error updating order status:', error.message || error);
      throw error;
    }
  }

  // ============ REAL-TIME SUBSCRIPTIONS ============
  static subscribeToOrders(_callback: (order: any) => void) {
    console.warn('Real-time subscriptions require proper authentication setup');
    return () => {}; // Return empty unsubscribe function
  }

  static subscribeToOrderUpdates(_orderId: string, _callback: (order: any) => void) {
    console.warn('Real-time subscriptions require proper authentication setup');
    return () => {}; // Return empty unsubscribe function
  }
}

export default ApiService;