const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'Test - Interim Program Pricing to scale - Travel Pricing.csv');
const dest = path.join(__dirname, 'dist', 'Test - Interim Program Pricing to scale - Travel Pricing.csv');

if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest);
  console.log('Copied CSV to dist/');
} else {
  console.error('CSV file not found:', src);
  process.exit(1);
}
