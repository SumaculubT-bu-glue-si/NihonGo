#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Extracting hardcoded data for migration...');

// Function to read and parse TypeScript files
function extractDataFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Simple extraction - you'll need to manually review and format
    console.log(`\n📄 File: ${filePath}`);
    console.log('📊 Data structure found:');
    
    // Look for export statements
    const exportMatches = content.match(/export\s+(const|let|var)\s+(\w+)\s*=/g);
    if (exportMatches) {
      exportMatches.forEach(match => {
        console.log(`  - ${match}`);
      });
    }
    
    // Look for interface definitions
    const interfaceMatches = content.match(/interface\s+(\w+)\s*{/g);
    if (interfaceMatches) {
      interfaceMatches.forEach(match => {
        console.log(`  - ${match}`);
      });
    }
    
    // Count approximate data size
    const lines = content.split('\n').length;
    console.log(`  📏 File size: ${lines} lines`);
    
    return {
      filePath,
      content,
      exports: exportMatches || [],
      interfaces: interfaceMatches || [],
      lineCount: lines
    };
  } catch (error) {
    console.error(`❌ Error reading ${filePath}:`, error.message);
    return null;
  }
}

// Files to analyze
const filesToAnalyze = [
  'src/lib/grammar-lessons-data.ts',
  'src/lib/quiz-data.ts',
  'src/lib/challenge-items-data.ts',
  'src/lib/initial-data.ts',
  'src/lib/guidebook-data.ts'
];

console.log('\n📋 Analyzing hardcoded data files...\n');

const analysis = [];

filesToAnalyze.forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath);
  if (fs.existsSync(fullPath)) {
    const data = extractDataFromFile(fullPath);
    if (data) {
      analysis.push(data);
    }
  } else {
    console.log(`⚠️  File not found: ${filePath}`);
  }
});

console.log('\n📊 Analysis Summary:');
console.log('===================');

analysis.forEach(data => {
  console.log(`\n📁 ${path.basename(data.filePath)}`);
  console.log(`   📏 Lines: ${data.lineCount}`);
  console.log(`   📤 Exports: ${data.exports.length}`);
  console.log(`   🔧 Interfaces: ${data.interfaces.length}`);
});

console.log('\n📝 Migration Instructions:');
console.log('========================');
console.log('\n1. Review the extracted data structure above');
console.log('2. Copy your actual data from the hardcoded files');
console.log('3. Replace the sample data in src/server/migrations/migrate-content.ts');
console.log('4. Run the migration: node scripts/migrate-content.js');
console.log('\n💡 Tip: You can use the data structure information above to help format your data correctly.');

// Create a template file for easy migration
const templatePath = path.join(process.cwd(), 'MIGRATION_TEMPLATE.md');
const template = `# Migration Template

## Grammar Lessons
Replace the sample data in \`src/server/migrations/migrate-content.ts\`:

\`\`\`typescript
const grammarLessons: GrammarLesson[] = [
  // Copy your data from src/lib/grammar-lessons-data.ts here
  {
    id: uuidv4(),
    title: "Your Lesson Title",
    level: "N5",
    explanation: "Your explanation",
    examples: ["Example 1", "Example 2", "Example 3"]
  }
];
\`\`\`

## Quizzes
Replace the sample data:

\`\`\`typescript
const quizzes: Quiz[] = [
  // Copy your data from src/lib/quiz-data.ts here
  {
    id: uuidv4(),
    title: "Your Quiz Title",
    category: "grammar",
    level: "N5",
    questions: [
      {
        id: uuidv4(),
        questionText: "Your question",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        correctAnswer: "Option 1",
        explanation: "Your explanation"
      }
    ]
  }
];
\`\`\`

## Challenge Items
Replace the sample data:

\`\`\`typescript
const challengeItems: ChallengeItem[] = [
  // Copy your data from src/lib/challenge-items-data.ts here
  {
    id: 1,
    grammar_point: "Your grammar point",
    english_sentence: "English sentence",
    correct_japanese: "Correct Japanese",
    word_bank: ["Word1", "Word2", "Word3"],
    hint: "Your hint",
    distractors: ["Wrong1", "Wrong2", "Wrong3"]
  }
];
\`\`\`

## Next Steps
1. Replace the sample data with your actual data
2. Run: \`node scripts/migrate-content.js\`
3. Test the migration
4. Update your frontend components to use the new API endpoints
`;

fs.writeFileSync(templatePath, template);
console.log(`\n📄 Created migration template: ${templatePath}`);
console.log('\n✅ Data extraction complete! Review the analysis above and use the template to migrate your data.'); 