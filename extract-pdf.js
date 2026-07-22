
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const pdfPath = path.join(__dirname, 'kukunet web', 'Presentation (A) (2).pdf');

async function extractText() {
  try {
    // Force install pdf-parse
    console.log('Installing pdf-parse...');
    execSync('npm install pdf-parse@1.1.1', { cwd: __dirname, stdio: 'inherit' });

    const pdf = require('pdf-parse');
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    console.log('=== PDF TEXT EXTRACTED ===');
    console.log(data.text);
    console.log('==========================');
  } catch (err) {
    console.error('Error extracting PDF text:', err);
  }
}

extractText();
