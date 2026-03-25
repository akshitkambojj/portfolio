const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({ size: 'A4', margin: 0 });
doc.pipe(fs.createWriteStream('public/resume.pdf'));

// A4 dimensions: 595.28 x 841.89 points
doc.image('public/resume.png', 0, 0, { width: 595.28, height: 841.89 });

doc.end();
console.log("PDF generated successfully.");
