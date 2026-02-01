// testAddMeal.mjs
import { Client, TablesDB, ID } from 'appwrite';

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('69771fd9001df1576f7e');

// Add API key to headers
client.headers['X-Appwrite-Key'] = 'standard_c1cbafa06829a9025f6261ad8f0dda7c54c45637b7faaf1ba185f4603f4b5b6088ba35edcb9908491b35fdb18472dca527d7b49652f33fdcad3767bee8104b47c23979e81b849630eba4f46e38e5acdefa50e5c8f26d3aa9d5d954b215b7e3f3425b7cdfab6ababd2398578a057eefc498482517ce1258eded3be9473636dd63';

const tablesDB = new TablesDB(client);
const DATABASE_ID = 'restaurant_db';

async function testAddMeal() {
  try {
    console.log('🍔 Testing meal creation...\n');
    
    // First, let's check what categories exist
    console.log('🔍 Checking existing categories...');
    const categories = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: 'categories',
      limit: 10
    });
    
    console.log(`Found ${categories.total} categories:`);
    
    // Check the actual data structure
    if (categories.rows.length > 0) {
      console.log('\nSample category structure:');
      console.log(JSON.stringify(categories.rows[0], null, 2));
    }
    
    let categoryId;
    let categoryName;
    
    if (categories.total === 0) {
      console.log('\n❌ No categories found. Creating a test category...');
      
      const testCategory = {
        categoryId: ID.unique(),
        name: 'Test Food',
        description: 'Test category for meals',
        icon: 'https://via.placeholder.com/50/ff9a03/ffffff?text=T',
        color: '#ff9a03',
        sortOrder: 1,
        mealCount: 0,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      const newCategory = await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: 'categories',
        rowId: ID.unique(),
        data: testCategory
      });
      
      console.log(`✅ Created category: ${newCategory.data.name}`);
      categoryId = newCategory.data.categoryId;
      categoryName = newCategory.data.name;
    } else {
      // Use the first category - check different possible structures
      const firstCategory = categories.rows[0];
      
      // Check different possible data structures
      if (firstCategory.data && firstCategory.data.name) {
        // Structure: { _id: '...', data: { name: '...', categoryId: '...' } }
        categoryId = firstCategory.data.categoryId || firstCategory.data.id || firstCategory._id;
        categoryName = firstCategory.data.name;
        console.log(`\n📝 Using category from data.name: ${categoryName} (${categoryId})`);
      } else if (firstCategory.name) {
        // Structure: { _id: '...', name: '...' } (direct properties)
        categoryId = firstCategory.categoryId || firstCategory.id || firstCategory._id;
        categoryName = firstCategory.name;
        console.log(`\n📝 Using category from direct name: ${categoryName} (${categoryId})`);
      } else {
        // Unknown structure, use the row ID
        categoryId = firstCategory._id;
        categoryName = 'Food';
        console.log(`\n📝 Using category ID: ${categoryId} (name: ${categoryName})`);
      }
    }
    
    // Create a test meal
    const testMeal = {
      mealId: ID.unique(),
      name: 'Test Burger Deluxe',
      description: 'A delicious test burger with all the fixings',
      price: 29.99,
      categoryId: categoryId,
      categoryName: categoryName,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
      preparationTime: 15,
      ingredients: JSON.stringify(['Bun', 'Beef Patty', 'Lettuce', 'Tomato', 'Cheese', 'Special Sauce']),
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
    console.log('Meal data:', JSON.stringify(testMeal, null, 2));
    
    const response = await tablesDB.createRow({
      databaseId: DATABASE_ID,
      tableId: 'meals',
      rowId: ID.unique(),
      data: testMeal
    });
    
    console.log('\n✅ SUCCESS! Meal created!');
    console.log('Row ID:', response._id);
    console.log('Meal data saved:', response.data ? 'Yes' : 'No');
    
    if (response.data) {
      console.log('Meal ID:', response.data.mealId);
      console.log('Name:', response.data.name);
      console.log('Price: R', response.data.price);
    }
    
    // Also check if meals table has existing data
    console.log('\n🔍 Checking all meals in database...');
    const allMeals = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: 'meals',
      limit: 10
    });
    
    console.log(`Total meals in database: ${allMeals.total}`);
    if (allMeals.rows.length > 0) {
      console.log('First meal sample:', JSON.stringify(allMeals.rows[0], null, 2));
    }
    
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('Full error:', error);
    
    // More detailed error info
    if (error.code) console.error('Error code:', error.code);
    if (error.type) console.error('Error type:', error.type);
    
    // Table might not exist - let's check
    console.log('\n🔍 Checking if tables exist...');
    try {
      const tables = await tablesDB.listTables({
        databaseId: DATABASE_ID
      });
      console.log(`Found ${tables.total} tables:`);
      tables.tables.forEach(table => {
        console.log(`  - ${table.name} (${table.$id})`);
      });
    } catch (tableError) {
      console.log('Cannot list tables:', tableError.message);
    }
  }
}

testAddMeal();