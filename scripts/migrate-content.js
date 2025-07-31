#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Starting content migration...');

try {
  // Run the TypeScript migration script with proper ts-node configuration
  const migrationScript = path.join(__dirname, '../src/server/migrations/migrate-content.ts');
  
  // Use ts-node with proper configuration
  execSync(`npx ts-node --esm --project tsconfig.json ${migrationScript}`, {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
    env: {
      ...process.env,
      NODE_OPTIONS: '--loader ts-node/esm'
    }
  });
  
  console.log('✅ Content migration completed successfully!');
  console.log('');
  console.log('📊 Next steps:');
  console.log('1. Restart your server to apply the new database schema');
  console.log('2. Update your frontend components to use the new API endpoints');
  console.log('3. Test the admin dashboard to view user progress');
  console.log('');
  console.log('🔗 Admin Dashboard: http://localhost:9002/admin/user-progress');
  
} catch (error) {
  console.error('❌ Content migration failed:', error.message);
  console.log('');
  console.log('💡 Alternative: Try running the migration directly with:');
  console.log('npx ts-node --esm src/server/migrations/migrate-content.ts');
  process.exit(1);
} 