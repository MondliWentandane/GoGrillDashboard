// debugTables.mjs
import { Client, TablesDB } from 'appwrite';

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('69771fd9001df1576f7e');

client.headers['X-Appwrite-Key'] = 'standard_c1cbafa06829a9025f6261ad8f0dda7c54c45637b7faaf1ba185f4603f4b5b6088ba35edcb9908491b35fdb18472dca527d7b49652f33fdcad3767bee8104b47c23979e81b849630eba4f46e38e5acdefa50e5c8f26d3aa9d5d954b215b7e3f3425b7cdfab6ababd2398578a057eefc498482517ce1258eded3be9473636dd63';

const tablesDB = new TablesDB(client);
const DATABASE_ID = 'restaurant_db';

async function debugTables() {
  console.log('🔍 Debugging AppWrite Tables Structure...\n');
  
  try {
    // 1. List all tables
    console.log('📊 Listing all tables...');
    const tables = await tablesDB.listTables({
      databaseId: DATABASE_ID
    });
    
    console.log(`Found ${tables.total} tables:\n`);
    
    for (const table of tables.tables) {
      console.log(`📁 Table: ${table.name} (${table.$id})`);
      console.log(`   Created: ${table.$createdAt}`);
      console.log(`   Permissions: ${JSON.stringify(table.$permissions)}`);
      
      // 2. Get table attributes
      try {
        console.log('\n   📋 Table attributes:');
        const attributes = await tablesDB.listAttributes({
          databaseId: DATABASE_ID,
          tableId: table.$id
        });
        
        console.log(`   Total attributes: ${attributes.total}`);
        attributes.attributes.forEach(attr => {
          console.log(`     - ${attr.key} (${attr.type}) - required: ${attr.required}`);
        });
      } catch (attrError) {
        console.log(`   Cannot get attributes: ${attrError.message}`);
      }
      
      // 3. Get sample data
      try {
        console.log('\n   📄 Sample data:');
        const rows = await tablesDB.listRows({
          databaseId: DATABASE_ID,
          tableId: table.$id,
          limit: 2
        });
        
        console.log(`   Total rows: ${rows.total}`);
        if (rows.rows.length > 0) {
          rows.rows.forEach((row, index) => {
            console.log(`\n   Row ${index + 1} (${row._id}):`);
            console.log('   Data structure:', JSON.stringify(row, null, 4));
          });
        }
      } catch (rowError) {
        console.log(`   Cannot get rows: ${rowError.message}`);
      }
      
      console.log('\n' + '─'.repeat(50) + '\n');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Full error:', error);
  }
}

debugTables();