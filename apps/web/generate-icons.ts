#!/usr/bin/env tsx
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

async function generateIcons() {
  // Read the SVG logo file
  const svgPath = path.join(__dirname, 'public', 'images', 'logo.svg');
  const svgContent = await fs.readFile(svgPath, 'utf8');

  // Define required icon sizes (standard PWA sizes)
  const sizes = [16, 32, 48, 64, 96, 128, 192, 256, 384, 512];

  // Render SVG to a high-res PNG first
  const resvg = new Resvg(svgContent, { fitTo: { mode: 'width', value: 2048 } });
  const highResPng = resvg.render().asPng();

  const iconsDir = path.join(__dirname, 'public', 'icons');

  // Generate each size
  for (const size of sizes) {
    const outputPath = path.join(iconsDir, `icon-${size}.png`);
    const maskablePath = path.join(iconsDir, `icon-maskable-${size}.png`);

    // Generate standard icon
    await sharp(highResPng)
      .resize(size, size)
      .png()
      .toFile(outputPath);

    // Generate maskable icon (adjust padding as needed)
    // For maskable, we'll add some padding to make sure it fits
    const padding = Math.floor(size * 0.1); // 10% padding
    await sharp(highResPng)
      .resize(size - padding * 2, size - padding * 2)
      .extend({
        top: padding,
        bottom: padding,
        left: padding,
        right: padding,
        background: { r: 0, g: 0, b: 0, alpha: 0 }, // transparent
      })
      .png()
      .toFile(maskablePath);
  }

  console.log('✅ All icons generated successfully!');
}

generateIcons().catch((err) => {
  console.error('❌ Error generating icons:', err);
  process.exit(1);
});
