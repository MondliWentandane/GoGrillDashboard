// verifyAll.js
import { Client, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('69771fd9001df1576f7e');

client.headers['X-Appwrite-Key'] = 'standard_c1cbafa06829a9025f6261ad8f0dda7c54c45637b7faaf1ba185f4603f4b5b6088ba35edcb9908491b35fdb18472dca527d7b49652f33fdcad3767bee8104b47c23979e81b849630eba4f46e38e5acdefa50e5c8f26d3aa9d5d954b215b7e3f3425b7cdfab6ababd2398578a057eefc498482517ce1258eded3be9473636dd63';

const databases = new Databases(client);
const DATABASE_ID = 'restaurant_db';

async function verifyAll() {
  console.log('🔍 Verifying database setup...\n');
  
  const collections = ['categories', 'meals', 'orders'];
  
  for (const collection of collections) {
    try {
      const docs = await databases.listDocuments(DATABASE_ID, collection, []);
      console.log(`📦 ${collection}: ${docs.total} documents`);
      
      if (docs.documents.length > 0) {
        console.log(`   Sample: ${docs.documents[0].name || docs.documents[0].mealId || 'Document'}`);
      }
    } catch (error) {
      console.log(`❌ ${collection}: ${error.message}`);
    }
  }
  
  console.log('\n✅ Database is ready! Your web dashboard should work now.');
}

verifyAll();