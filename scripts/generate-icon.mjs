import sharp from 'sharp';

// Use sharp's SVG rendering — no canvas dependency needed
const SIZE = 1024;

const svg = `<svg width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Deep navy-to-midnight gradient background -->
    <radialGradient id="bg" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#1a2744"/>
      <stop offset="100%" stop-color="#0a0f1e"/>
    </radialGradient>

    <!-- Subtle glow behind moon -->
    <radialGradient id="moonGlow" cx="58%" cy="42%" r="30%">
      <stop offset="0%" stop-color="#f5c842" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#f5c842" stop-opacity="0"/>
    </radialGradient>

    <!-- Rounded-square clip for icon shape -->
    <clipPath id="roundRect">
      <rect width="${SIZE}" height="${SIZE}" rx="230" ry="230"/>
    </clipPath>
  </defs>

  <g clip-path="url(#roundRect)">
    <!-- Background -->
    <rect width="${SIZE}" height="${SIZE}" fill="url(#bg)"/>

    <!-- Glow halo -->
    <ellipse cx="590" cy="400" rx="280" ry="280" fill="url(#moonGlow)"/>

    <!-- Stars scattered around -->
    <circle cx="180" cy="160" r="5" fill="white" opacity="0.9"/>
    <circle cx="280" cy="90"  r="3" fill="white" opacity="0.7"/>
    <circle cx="120" cy="300" r="4" fill="white" opacity="0.6"/>
    <circle cx="820" cy="130" r="4" fill="white" opacity="0.8"/>
    <circle cx="900" cy="250" r="3" fill="white" opacity="0.6"/>
    <circle cx="760" cy="80"  r="5" fill="white" opacity="0.7"/>
    <circle cx="150" cy="500" r="3" fill="white" opacity="0.5"/>
    <circle cx="870" cy="620" r="3" fill="white" opacity="0.5"/>
    <circle cx="200" cy="700" r="4" fill="white" opacity="0.4"/>
    <circle cx="950" cy="400" r="2" fill="white" opacity="0.6"/>
    <circle cx="60"  cy="620" r="3" fill="white" opacity="0.4"/>
    <circle cx="350" cy="140" r="2" fill="white" opacity="0.6"/>
    <circle cx="680" cy="60"  r="3" fill="white" opacity="0.7"/>

    <!-- 4-point sparkle stars -->
    <path d="M460 200 L464 212 L476 216 L464 220 L460 232 L456 220 L444 216 L456 212 Z" fill="white" opacity="0.85"/>
    <path d="M820 560 L823 569 L832 572 L823 575 L820 584 L817 575 L808 572 L817 569 Z" fill="#f5c842" opacity="0.8"/>
    <path d="M130 420 L133 429 L142 432 L133 435 L130 444 L127 435 L118 432 L127 429 Z" fill="white" opacity="0.6"/>

    <!-- Crescent moon — full circle minus overlapping circle -->
    <circle cx="570" cy="390" r="210" fill="#f5c842"/>
    <circle cx="650" cy="350" r="188" fill="#0d1628"/>

    <!-- Moon surface details (subtle craters) -->
    <circle cx="430" cy="330" r="18" fill="#e6b830" opacity="0.4"/>
    <circle cx="390" cy="420" r="12" fill="#e6b830" opacity="0.3"/>
    <circle cx="460" cy="480" r="10" fill="#e6b830" opacity="0.25"/>
    <circle cx="420" cy="260" r="8"  fill="#e6b830" opacity="0.3"/>

    <!-- Decorative arc below moon (calendar hint) -->
    <path d="M 260 640 Q 512 720 760 640" stroke="#f5c842" stroke-width="4" fill="none" opacity="0.35"/>
    <path d="M 280 660 Q 512 745 740 660" stroke="#f5c842" stroke-width="2" fill="none" opacity="0.2"/>

    <!-- BVP text -->
    <text
      x="512"
      y="870"
      font-family="'Georgia', 'Times New Roman', serif"
      font-size="148"
      font-weight="bold"
      text-anchor="middle"
      fill="#f5c842"
      letter-spacing="18"
    >BVP</text>

    <!-- Thin decorative line above BVP -->
    <line x1="260" y1="790" x2="762" y2="790" stroke="#f5c842" stroke-width="2.5" opacity="0.5"/>

    <!-- Small dots on the line -->
    <circle cx="260" cy="790" r="5" fill="#f5c842" opacity="0.6"/>
    <circle cx="762" cy="790" r="5" fill="#f5c842" opacity="0.6"/>
  </g>
</svg>`;

await sharp(Buffer.from(svg))
  .png()
  .toFile('assets/icon.png');

console.log('✓ assets/icon.png generated (1024×1024)');

// Also generate a matching splash icon (same design, slightly smaller)
const splashSvg = svg.replace('BVP</text>', 'BVP</text>');
await sharp(Buffer.from(splashSvg))
  .resize(200, 200)
  .png()
  .toFile('assets/splash-icon.png');

console.log('✓ assets/splash-icon.png generated (200×200)');
