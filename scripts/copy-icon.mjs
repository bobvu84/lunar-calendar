import sharp from 'sharp';

// iOS does not support alpha channel in app icons — flatten with the dark bg colour
await sharp('assets/icon.png')
  .flatten({ background: { r: 10, g: 15, b: 30 } })
  .png()
  .toFile('ios/LunarCalendar/Images.xcassets/AppIcon.appiconset/App-Icon-1024x1024@1x.png');

console.log('✓ iOS native icon updated');
