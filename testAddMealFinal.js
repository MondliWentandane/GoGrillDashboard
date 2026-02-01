// testAddMealFinal.js
import { Client, Databases, ID } from 'appwrite';

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('69771fd9001df1576f7e');

// Add API key to headers
client.headers['X-Appwrite-Key'] = 'standard_c1cbafa06829a9025f6261ad8f0dda7c54c45637b7faaf1ba185f4603f4b5b6088ba35edcb9908491b35fdb18472dca527d7b49652f33fdcad3767bee8104b47c23979e81b849630eba4f46e38e5acdefa50e5c8f26d3aa9d5d954b215b7e3f3425b7cdfab6ababd2398578a057eefc498482517ce1258eded3be9473636dd63';

const databases = new Databases(client);
const DATABASE_ID = 'restaurant_db';

async function testAddMeal() {
  try {
    console.log('🍔 Testing meal creation with Collections API...\n');
    
    // Get first category
    const categories = await databases.listDocuments(
      DATABASE_ID,
      'categories',
      []
    );
    
    const firstCategory = categories.documents[0];
    console.log(`Using category: ${firstCategory.name} (${firstCategory.categoryId})`);
    
    // Create a test meal - ingredients must be an ARRAY, not JSON string
    const testMeal = {
      mealId: ID.unique(),
      name: 'Test Burger Deluxe',
      description: 'A delicious test burger with all the fixings',
      price: 29.99,
      categoryId: firstCategory.categoryId,
      categoryName: firstCategory.name,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
      preparationTime: 15,
      ingredients: ['Bun', 'Beef Patty', 'Lettuce', 'Tomato', 'Cheese', 'Special Sauce'], // ARRAY!
      calories: 550,
      spiceLevel: 2,
      isAvailable: true,
      isPopular: true,
      isDiscounted: false,
      discountPercentage: 0,
      sku: 'TBURG001',
      sortOrder: 0,
      notes: 'Test meal for system verification',
      createdBy: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    console.log('\n📤 Creating test meal...');
    
    const response = await databases.createDocument(
      DATABASE_ID,
      'meals',
      ID.unique(),
      testMeal
    );
    
    console.log('\n✅ SUCCESS! Meal created!');
    console.log('Document ID:', response.$id);
    console.log('Meal ID:', response.mealId);
    console.log('Name:', response.name);
    console.log('Price: R', response.price);
    
    // Check all meals
    const allMeals = await databases.listDocuments(
      DATABASE_ID,
      'meals',
      []
    );
    
    console.log(`\n📊 Total meals in database: ${allMeals.total}`);
    
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('Full error:', error);
  }
}

testAddMeal();