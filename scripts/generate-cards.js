const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../assets/cards');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// ============================================================
// SUIT SYMBOL PATHS
//
// Every suit is defined in a local 0–100 coordinate box.
// Visual center is at (50, 50).
// All four suits occupy roughly the same visual area.
// ============================================================

const SUIT_PATHS = {
  // Spade: point-up body with a stem below
  S: 'M 50 8 C 50 8 20 32 20 52 C 20 70 36 78 50 66 C 64 78 80 70 80 52 C 80 32 50 8 50 8 Z ' +
     'M 44 66 L 40 92 L 60 92 L 56 66',

  // Heart: two lobes at top, point at bottom
  H: 'M 50 84 C 50 84 14 56 14 36 C 14 20 28 10 50 30 C 72 10 86 20 86 36 C 86 56 50 84 50 84 Z',

  // Diamond: simple rhombus
  D: 'M 50 6 L 88 50 L 50 94 L 12 50 Z',

  // Club: three lobes with a stem
  C: 'M 50 22 C 38 22 28 14 28 28 C 28 40 40 46 50 40 ' +
     'C 60 46 72 40 72 28 C 72 14 62 22 50 22 Z ' +
     'M 48 40 C 34 48 16 42 20 58 C 22 66 36 68 46 60 Z ' +
     'M 52 40 C 66 48 84 42 80 58 C 78 66 64 68 54 60 Z ' +
     'M 44 60 L 42 92 L 58 92 L 56 60',
};

// Unicode suit characters for corner indexes
const SUIT_CHAR = { S: '\u2660', H: '\u2665', D: '\u2666', C: '\u2663' };
const SUIT_COLOR = { S: '#1a1a1a', H: '#cc0000', D: '#cc0000', C: '#1a1a1a' };

const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const SUITS = ['S', 'H', 'D', 'C'];

// ============================================================
// renderSuit(symbol, x, y, size, color, rotated)
//
// Places the suit centered at card position (x, y).
// The suit path lives in a 0–100 local box with center at (50, 50).
//
// NON-ROTATED:
//   translate(x - size/2, y - size/2) scale(size/100)
//   Local center (50, 50) → scaled to (size/2, size/2) → card (x, y)
//
// ROTATED 180°:
//   translate(x, y) rotate(180) translate(-size/2, -size/2) scale(size/100)
//   Rotates around the pip's OWN center at (x, y) — NOT the card center.
//
// No transform-origin is used. Safe for react-native-svg.
// ============================================================

function renderSuit(symbol, x, y, size, color, rotated) {
  const s = size / 100;       // scale factor
  const half = size / 2;      // half the rendered size
  if (rotated) {
    return (
      `<g transform="translate(${x}, ${y}) rotate(180) ` +
      `translate(${-half}, ${-half}) scale(${s})">` +
      `<path d="${SUIT_PATHS[symbol]}" fill="${color}"/></g>`
    );
  }
  return (
    `<g transform="translate(${x - half}, ${y - half}) scale(${s})">` +
    `<path d="${SUIT_PATHS[symbol]}" fill="${color}"/></g>`
  );
}

// ============================================================
// CORNER INDEXES
//
// Top-left: rank text + suit character stacked vertically.
// Bottom-right: exact 180° rotation of the top-left group
// around the card center (120, 168).
// ============================================================

function cornerIndexes(rank, suit) {
  const color = SUIT_COLOR[suit];
  const suitChar = SUIT_CHAR[suit];

  // "10" needs a slightly smaller font and shifted x to avoid clipping
  const fontSize = rank === '10' ? 22 : 26;
  const x = rank === '10' ? 22 : 20;

  const group =
    `<text x="${x}" y="38" font-family="Arial, Helvetica, sans-serif" ` +
    `font-size="${fontSize}" font-weight="bold" fill="${color}" ` +
    `text-anchor="middle">${rank}</text>` +
    `<text x="${x}" y="58" font-family="Arial, Helvetica, sans-serif" ` +
    `font-size="18" fill="${color}" text-anchor="middle">${suitChar}</text>`;

  // Top-left (as-is) + bottom-right (mirrored around card center)
  return group + '\n  ' +
    `<g transform="rotate(180, 120, 168)">${group}</g>`;
}

// ============================================================
// PIP LAYOUTS — standard playing-card pip positions
//
// Content area: x ∈ [55, 185], y ∈ [80, 256]
// Two columns: x = 85 (left), x = 155 (right)
// Center column: x = 120
// Card center: y = 168
//
// All layouts are vertically symmetric around y = 168.
// Bottom-half pips have rot=true (upside-down).
// ============================================================

const PIP_SIZE = 30;

// Vertical reference points (symmetric around 168):
//   top = 90    bottom = 246   (±78 from center)
//   mid = 168                  (center)
//   Between top & mid: 129     (midpoint of 90..168)
//   Between mid & bot: 207     (midpoint of 168..246)
// For 4-row layouts (9, 10):
//   row1 = 90   row2 = 142   row3 = 194   row4 = 246  (±78, ±26)
//   Between r1 & r2: 116      Between r3 & r4: 220

const PIP_LAYOUTS = {
  // 2: one top, one bottom — centered column
  '2': [
    { x: 120, y: 90,  rot: false },
    { x: 120, y: 246, rot: true },
  ],
  // 3: top, center, bottom — centered column
  '3': [
    { x: 120, y: 90,  rot: false },
    { x: 120, y: 168, rot: false },
    { x: 120, y: 246, rot: true },
  ],
  // 4: two top, two bottom — perfectly symmetrical
  '4': [
    { x: 85,  y: 90,  rot: false },
    { x: 155, y: 90,  rot: false },
    { x: 85,  y: 246, rot: true },
    { x: 155, y: 246, rot: true },
  ],
  // 5: four corners + center
  '5': [
    { x: 85,  y: 90,  rot: false },
    { x: 155, y: 90,  rot: false },
    { x: 120, y: 168, rot: false },
    { x: 85,  y: 246, rot: true },
    { x: 155, y: 246, rot: true },
  ],
  // 6: two columns × three rows
  '6': [
    { x: 85,  y: 90,  rot: false },
    { x: 155, y: 90,  rot: false },
    { x: 85,  y: 168, rot: false },
    { x: 155, y: 168, rot: false },
    { x: 85,  y: 246, rot: true },
    { x: 155, y: 246, rot: true },
  ],
  // 7: same as 6 + one center pip between top and middle row
  '7': [
    { x: 85,  y: 90,  rot: false },
    { x: 155, y: 90,  rot: false },
    { x: 120, y: 129, rot: false },
    { x: 85,  y: 168, rot: false },
    { x: 155, y: 168, rot: false },
    { x: 85,  y: 246, rot: true },
    { x: 155, y: 246, rot: true },
  ],
  // 8: same as 7 + one center pip between middle and bottom row
  '8': [
    { x: 85,  y: 90,  rot: false },
    { x: 155, y: 90,  rot: false },
    { x: 120, y: 129, rot: false },
    { x: 85,  y: 168, rot: false },
    { x: 155, y: 168, rot: false },
    { x: 120, y: 207, rot: true },
    { x: 85,  y: 246, rot: true },
    { x: 155, y: 246, rot: true },
  ],
  // 9: four rows of two + center pip  (4-1-4 pattern)
  '9': [
    { x: 85,  y: 90,  rot: false },
    { x: 155, y: 90,  rot: false },
    { x: 85,  y: 142, rot: false },
    { x: 155, y: 142, rot: false },
    { x: 120, y: 168, rot: false },
    { x: 85,  y: 194, rot: true },
    { x: 155, y: 194, rot: true },
    { x: 85,  y: 246, rot: true },
    { x: 155, y: 246, rot: true },
  ],
  // 10: four rows of two + two center pips  (4-2-4 pattern)
  '10': [
    { x: 85,  y: 90,  rot: false },
    { x: 155, y: 90,  rot: false },
    { x: 120, y: 116, rot: false },
    { x: 85,  y: 142, rot: false },
    { x: 155, y: 142, rot: false },
    { x: 85,  y: 194, rot: true },
    { x: 155, y: 194, rot: true },
    { x: 120, y: 220, rot: true },
    { x: 85,  y: 246, rot: true },
    { x: 155, y: 246, rot: true },
  ],
};

// ============================================================
// ACE — single large centered suit
// ============================================================

function renderAce(suit) {
  return renderSuit(suit, 120, 168, 80, SUIT_COLOR[suit], false);
}

// ============================================================
// NUMBER CARDS (2–10)
// ============================================================

function renderNumberCard(rank, suit) {
  const layout = PIP_LAYOUTS[rank];
  if (!layout) return '';
  const color = SUIT_COLOR[suit];
  return layout
    .map(p => renderSuit(suit, p.x, p.y, PIP_SIZE, color, p.rot))
    .join('\n  ');
}

// ============================================================
// FACE CARDS — J, Q, K
//
// Minimalist casino-style vector illustrations.
// All three share:
//   • Inner decorative frame: x=48..192, y=52..284
//   • Center dividing line at y=168
//   • Small suit at card center
//   • Head centered at (120, 92) with rx=16, ry=18
//   • Mirrored top/bottom via rotate(180, 120, 168)
//
// Differences:
//   Jack  — feathered cap, tunic, no beard
//   Queen — three-pointed crown with jewels, flowing gown
//   King  — tall five-pointed crown, beard, robe with sash
// ============================================================

function renderFaceCard(rank, suit) {
  const c = SUIT_COLOR[suit]; // main color

  // --- Shared elements ---
  let art = '';

  // Inner decorative frame (centered, doesn't touch outer border)
  art += `<rect x="48" y="52" width="144" height="232" rx="6" ` +
         `fill="none" stroke="${c}" stroke-width="1.5" opacity="0.35"/>`;

  // Subtle center dividing line
  art += `\n  <line x1="48" y1="168" x2="192" y2="168" ` +
         `stroke="${c}" stroke-width="0.8" opacity="0.25"/>`;

  // Small suit symbol at center
  art += '\n  ' + renderSuit(suit, 120, 168, 16, c, false);

  // --- Build the top-half artwork ---
  // Head (same position & size for all three)
  let top =
    `<ellipse cx="120" cy="92" rx="16" ry="18" fill="none" stroke="${c}" stroke-width="2.5"/>` +
    // Eyes
    `<circle cx="113" cy="89" r="2" fill="${c}"/>` +
    `<circle cx="127" cy="89" r="2" fill="${c}"/>`;

  if (rank === 'J') {
    // --- JACK ---
    // Subtle smile
    top += `<path d="M 114 97 Q 120 101 126 97" fill="none" stroke="${c}" stroke-width="1.5"/>`;
    // Feathered cap
    top += `<path d="M 100 78 Q 112 60 132 68 Q 142 74 142 80 L 100 78 Z" ` +
           `fill="${c}" opacity="0.12"/>`;
    top += `<path d="M 100 78 Q 112 62 132 68" fill="none" stroke="${c}" stroke-width="2"/>`;
    // Feather
    top += `<path d="M 132 68 Q 146 54 148 42" fill="none" stroke="${c}" stroke-width="1.5"/>`;
    top += `<path d="M 132 68 Q 149 57 150 46" fill="none" stroke="${c}" stroke-width="1"/>`;
    // Tunic collar
    top += `<path d="M 104 110 L 100 126 L 120 136 L 140 126 L 136 110" ` +
           `fill="none" stroke="${c}" stroke-width="2"/>`;
    // Decorative V on chest
    top += `<path d="M 110 120 L 120 132 L 130 120" fill="none" stroke="${c}" stroke-width="1.5"/>`;
    // Shoulders to edges
    top += `<path d="M 100 126 L 72 146 L 72 168" fill="none" stroke="${c}" stroke-width="2"/>`;
    top += `<path d="M 140 126 L 168 146 L 168 168" fill="none" stroke="${c}" stroke-width="2"/>`;
    // Small suit on chest
    top += renderSuit(suit, 120, 150, 12, c, false);

  } else if (rank === 'Q') {
    // --- QUEEN ---
    // Lips
    top += `<path d="M 115 98 Q 120 103 125 98" fill="${c}" opacity="0.4"/>`;
    // Three-pointed crown
    top += `<path d="M 103 78 L 106 62 L 113 72 L 120 58 L 127 72 L 134 62 L 137 78 Z" ` +
           `fill="${c}" opacity="0.15" stroke="${c}" stroke-width="1.5"/>`;
    // Crown jewels
    top += `<circle cx="120" cy="63" r="2.5" fill="${c}"/>`;
    top += `<circle cx="108" cy="68" r="1.8" fill="${c}" opacity="0.5"/>`;
    top += `<circle cx="132" cy="68" r="1.8" fill="${c}" opacity="0.5"/>`;
    // Neckline / bodice
    top += `<path d="M 106 110 Q 113 118 120 124 Q 127 118 134 110" ` +
           `fill="none" stroke="${c}" stroke-width="2"/>`;
    // Necklace
    top += `<path d="M 109 106 Q 120 113 131 106" fill="none" stroke="${c}" stroke-width="1" opacity="0.5"/>`;
    // Gown flowing outward
    top += `<path d="M 106 110 Q 82 132 72 168" fill="none" stroke="${c}" stroke-width="2"/>`;
    top += `<path d="M 134 110 Q 158 132 168 168" fill="none" stroke="${c}" stroke-width="2"/>`;
    // Small suit on bodice
    top += renderSuit(suit, 120, 142, 12, c, false);

  } else if (rank === 'K') {
    // --- KING ---
    // Beard
    top += `<path d="M 108 100 Q 112 116 120 118 Q 128 116 132 100" ` +
           `fill="none" stroke="${c}" stroke-width="2"/>`;
    top += `<path d="M 112 106 Q 120 113 128 106" fill="none" stroke="${c}" stroke-width="1"/>`;
    // Tall five-pointed crown
    top += `<path d="M 100 80 L 100 60 L 108 70 L 114 55 L 120 68 L 126 55 L 132 70 L 140 60 L 140 80 Z" ` +
           `fill="${c}" opacity="0.15" stroke="${c}" stroke-width="1.8"/>`;
    // Crown band
    top += `<rect x="100" y="76" width="40" height="5" fill="${c}" opacity="0.25" rx="1"/>`;
    // Crown jewel
    top += `<circle cx="120" cy="62" r="3" fill="${c}"/>`;
    // Robe / shoulders
    top += `<path d="M 104 112 L 94 126 L 72 142 L 72 168" ` +
           `fill="none" stroke="${c}" stroke-width="2.5"/>`;
    top += `<path d="M 136 112 L 146 126 L 168 142 L 168 168" ` +
           `fill="none" stroke="${c}" stroke-width="2.5"/>`;
    // Sash / robe cross
    top += `<path d="M 94 126 L 120 152 L 146 126" fill="none" stroke="${c}" stroke-width="1.5"/>`;
    // Small suit on chest
    top += renderSuit(suit, 120, 144, 12, c, false);
  }

  // Add top half directly, then mirrored bottom half
  art += '\n  ' + top;
  art += `\n  <g transform="rotate(180, 120, 168)">${top}</g>`;

  // Faint rank letter inside top-right and bottom-left of frame
  art += `\n  <text x="180" y="74" font-family="Arial, Helvetica, sans-serif" ` +
         `font-size="14" font-weight="bold" fill="${c}" text-anchor="middle" ` +
         `opacity="0.3">${rank}</text>`;
  art += `\n  <g transform="rotate(180, 120, 168)"><text x="180" y="74" ` +
         `font-family="Arial, Helvetica, sans-serif" font-size="14" ` +
         `font-weight="bold" fill="${c}" text-anchor="middle" ` +
         `opacity="0.3">${rank}</text></g>`;

  return art;
}

// ============================================================
// ASSEMBLE A COMPLETE CARD SVG
// ============================================================

function generateCardSvg(suit, rank) {
  let content = '';

  if (rank === 'A') {
    content = renderAce(suit);
  } else if (['J', 'Q', 'K'].includes(rank)) {
    content = renderFaceCard(rank, suit);
  } else {
    content = renderNumberCard(rank, suit);
  }

  return (
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 336">
  <rect x="2" y="2" width="236" height="332" rx="12" ry="12" fill="#FFFFFF" stroke="#BBBBBB" stroke-width="1.5"/>
  ${cornerIndexes(rank, suit)}
  ${content}
</svg>`
  );
}

// ============================================================
// GENERATE ALL 52 CARDS + index.js
// ============================================================

const exportedCards = [];

SUITS.forEach(suit => {
  RANKS.forEach(rank => {
    const fileName = `${rank}${suit}`;
    const svg = generateCardSvg(suit, rank);
    fs.writeFileSync(path.join(outputDir, `${fileName}.svg`), svg, 'utf8');

    const varName = isNaN(fileName[0]) ? fileName : `card${fileName}`;
    exportedCards.push({ fileName, varName, svg });
  });
});

// Build index.js
let idx = '// Auto-generated by scripts/generate-cards.js\n';
idx += '// Regenerate: node scripts/generate-cards.js\n\n';

exportedCards.forEach(c => {
  const safe = c.svg.replace(/`/g, '\\`').replace(/\${/g, '\\${');
  idx += `export const ${c.varName} = \`${safe}\`;\n\n`;
});

idx += 'export const cards = {\n';
exportedCards.forEach(c => {
  idx += c.fileName === c.varName
    ? `  ${c.fileName},\n`
    : `  '${c.fileName}': ${c.varName},\n`;
});
idx += '};\n';

fs.writeFileSync(path.join(outputDir, 'index.js'), idx, 'utf8');

// ============================================================
// COMPREHENSIVE VERIFICATION
// ============================================================

console.log('\n========================================');
console.log('  CARD GENERATION — VERIFICATION');
console.log('========================================\n');

let errors = 0;

// 1. Build expected file list
const expected = [];
SUITS.forEach(s => RANKS.forEach(r => expected.push(`${r}${s}.svg`)));
console.log(`Expected cards: ${expected.length}`);

// 2. Check every expected file exists
const missing = expected.filter(f => !fs.existsSync(path.join(outputDir, f)));
if (missing.length) {
  console.error(`MISSING: ${missing.join(', ')}`);
  errors += missing.length;
} else {
  console.log(`All ${expected.length} expected card files exist.`);
}

// 3. Count SVGs on disk
const svgs = fs.readdirSync(outputDir).filter(f => f.endsWith('.svg'));
console.log(`SVG files on disk: ${svgs.length}`);
if (svgs.length !== 52) {
  console.error(`ERROR: expected 52 SVGs, found ${svgs.length}`);
  errors++;
}

// 4. Per-suit count
SUITS.forEach(s => {
  const n = svgs.filter(f => f.endsWith(`${s}.svg`)).length;
  const ok = n === 13;
  console.log(`  ${s}: ${n}/13 [${ok ? 'OK' : 'ERROR'}]`);
  if (!ok) errors++;
});

// 5. Validate structure of every SVG
let badStructure = 0;
svgs.forEach(f => {
  const c = fs.readFileSync(path.join(outputDir, f), 'utf8');
  if (!c.startsWith('<svg') || !c.trimEnd().endsWith('</svg>')) {
    console.error(`BAD SVG TAGS: ${f}`);
    badStructure++;
  }
  if (!c.includes('viewBox="0 0 240 336"')) {
    console.error(`BAD VIEWBOX: ${f}`);
    badStructure++;
  }
});
if (badStructure === 0) {
  console.log('All SVGs valid: proper tags + viewBox="0 0 240 336".');
} else {
  errors += badStructure;
}

// 6. Verify index.js references all 52 cards
const idxPath = path.join(outputDir, 'index.js');
if (fs.existsSync(idxPath)) {
  const idxSrc = fs.readFileSync(idxPath, 'utf8');
  let idxMissing = 0;
  expected.forEach(f => {
    const key = f.replace('.svg', '');
    if (!idxSrc.includes(`${key},`) && !idxSrc.includes(`'${key}':`)) {
      console.error(`NOT IN index.js: ${key}`);
      idxMissing++;
    }
  });
  if (idxMissing === 0) {
    console.log('index.js references all 52 cards.');
  } else {
    errors += idxMissing;
  }
} else {
  console.error('ERROR: index.js not found');
  errors++;
}

// 7. Spot-check representative cards
const spotChecks = ['AS', '2S', '5H', '6D', '7C', '8H', '9D', '10C', 'JS', 'QH', 'KD'];
let spotFails = 0;
spotChecks.forEach(name => {
  const fp = path.join(outputDir, `${name}.svg`);
  if (!fs.existsSync(fp)) {
    console.error(`SPOT-CHECK MISSING: ${name}.svg`);
    spotFails++;
    return;
  }
  const c = fs.readFileSync(fp, 'utf8');
  // Must have corner indexes (rank text)
  const rank = name.replace(/[SHDC]$/, '');
  if (!c.includes(`>${rank}<`)) {
    console.error(`SPOT-CHECK: ${name} missing rank "${rank}" in index`);
    spotFails++;
  }
  // Must have suit character or suit path
  const suitLetter = name.slice(-1);
  if (!c.includes(SUIT_CHAR[suitLetter]) && !c.includes(SUIT_PATHS[suitLetter].slice(0, 20))) {
    console.error(`SPOT-CHECK: ${name} missing suit content`);
    spotFails++;
  }
});
if (spotFails === 0) {
  console.log(`Spot-checked ${spotChecks.length} cards: all OK.`);
} else {
  errors += spotFails;
}

// Final
console.log(`\n=== ${errors === 0 ? 'ALL CHECKS PASSED' : errors + ' ERROR(S) FOUND'} ===`);
console.log(`Output: ${outputDir}\n`);
if (errors > 0) process.exit(1);
