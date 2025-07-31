#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Starting content migration...');

try {
  // First, let's check if we can run the TypeScript directly
  console.log('📋 Attempting to run TypeScript migration...');
  
  execSync(`npx ts-node --esm src/server/migrations/migrate-content.ts`, {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
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
  console.log('💡 Trying alternative approach...');
  
  try {
    // Try with different ts-node options
    execSync(`npx ts-node --transpile-only src/server/migrations/migrate-content.ts`, {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });
    
    console.log('✅ Content migration completed successfully!');
    
  } catch (secondError) {
    console.error('❌ Alternative approach also failed:', secondError.message);
    console.log('');
    console.log('🔧 Manual migration steps:');
    console.log('1. Install ts-node globally: npm install -g ts-node');
    console.log('2. Run: ts-node src/server/migrations/migrate-content.ts');
    console.log('3. Or compile to JS first: npx tsc src/server/migrations/migrate-content.ts');
    process.exit(1);
  }
} 