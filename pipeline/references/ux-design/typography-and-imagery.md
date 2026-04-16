# Typography and Imagery: UX/UI Design Reference

This guide covers typography and imagery strategies for building visually distinct bespoke SMB websites using Astro + React + Tailwind CSS v4. Use these techniques to elevate brand perception and create memorable visual experiences.

---

## Typography as Brand Expression

Typography is the primary way to convey brand personality. Choose scales, weights, and spacing strategically to differentiate each site.

### Heading Scale: Display vs Moderate

**Display Headings (Hero/Page Titles):** Use `clamp(48px, 8vw, 80px)` for maximum impact
- Creates immediate visual hierarchy and presence
- Works for dramatic hero sections, brand statements, service category pages
- Best for: agencies, creative studios, luxury brands, B2B thought leadership
- Risk: overwhelming if overused; reserve for 1-2 per page

```css
/* Tailwind CSS v4 - Display heading with clamp */
.heading-display {
  font-size: clamp(48px, 8vw, 80px);
  font-weight: 700;
  line-height: 1.0;
  letter-spacing: -0.02em;
}
```

**Moderate Headings (Section Titles):** Use `clamp(32px, 5vw, 50px)` for balanced authority
- Clear hierarchy without dominating the page
- Works for section introductions, service descriptions, testimonial headings
- Best for: most SMBs, professional services, e-commerce, hospitality
- More versatile and digestible than display scale

```css
/* Tailwind CSS v4 - Moderate heading with clamp */
.heading-moderate {
  font-size: clamp(32px, 5vw, 50px);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.01em;
}
```

### Weight as Personality

Weight conveys emotional tone and brand character:

- **Light/Thin (300-400)** = Luxury, elegance, minimalism, refinement
  - Best for: high-end services, creative professionals, wellness brands
  - Pair with generous letter-spacing and whitespace
  - Example: luxury spa, boutique consulting, artisanal goods

- **Medium (500)** = Professional, balanced, approachable, trustworthy
  - Best for: general SMBs, service providers, professional services
  - Safe default for most body text and subheadings
  - Example: plumbing, accounting, local agencies

- **Bold/Black (700-900)** = Energy, confidence, authority, modernity
  - Best for: tech startups, fitness brands, financial services, youth-oriented
  - Use sparingly to avoid aggression; pair with whitespace
  - Example: SaaS product, fitness gym, fintech, marketing agencies

```css
/* Weight personality in Tailwind CSS v4 */
.luxury-light {
  font-weight: 300;
  letter-spacing: 0.05em;
}

.professional-medium {
  font-weight: 500;
  letter-spacing: 0.01em;
}

.confident-bold {
  font-weight: 700;
  letter-spacing: -0.01em;
}
```

### Letter-Spacing as Tone

Tracking (letter-spacing) shapes the mood and pace of reading:

- **Tight Tracking (-0.02em to 0)** = Modern, tech-forward, dense, contemporary
  - Works for: SaaS, digital agencies, startups, minimalist brands
  - Reduces whitespace, increases visual tightness
  - Example: `letter-spacing: -0.02em` with bold display headings

- **Wide Tracking (0.05em to 0.1em)** = Luxury, editorial, sophisticated, spacious
  - Works for: high-end brands, fashion, heritage companies, editorial content
  - Increases elegance and breathing room
  - Example: `letter-spacing: 0.08em` with light weights

- **Normal/Neutral Tracking (0.01em)** = Approachable, friendly, professional
  - Safe default for most SMBs and body copy
  - Balances readability with neutral tone
  - Example: local services, traditional businesses

```css
/* Letter-spacing tone in Tailwind CSS v4 */
.tech-tight {
  letter-spacing: -0.02em; /* Modern, condensed */
}

.luxury-wide {
  letter-spacing: 0.08em; /* Spacious, refined */
}

.neutral-approachable {
  letter-spacing: 0.01em; /* Professional, balanced */
}
```

### Line-Height Variation: Hero vs Body

Line-height dramatically affects readability and visual rhythm:

- **Tight Leading (1.0-1.1)** = Hero headings, display text, dramatic statements
  - Creates compact, powerful visual block
  - Only for large headline text (48px+)
  - Example: `line-height: 1.0` for 64px display heading

- **Moderate Leading (1.2-1.4)** = Subheadings, card titles, UI labels
  - Balanced between compactness and readability
  - Example: `line-height: 1.3` for section titles

- **Generous Leading (1.6-1.8)** = Body text, long-form content, descriptions
  - Ensures comfortable reading and visual pause
  - Essential for content-heavy sections
  - Example: `line-height: 1.7` for paragraph text

```css
/* Line-height variation in Tailwind CSS v4 */
.hero-heading {
  font-size: clamp(48px, 8vw, 80px);
  line-height: 1.0; /* Compact, dramatic */
  font-weight: 700;
}

.section-title {
  font-size: clamp(28px, 4vw, 42px);
  line-height: 1.2; /* Balanced */
  font-weight: 600;
}

.body-text {
  font-size: 16px;
  line-height: 1.7; /* Generous, readable */
  font-weight: 400;
}
```

### Breaking Conventions for Personality

Strategic rule-breaking elevates brand differentiation:

- **ALL CAPS SUBHEADINGS** = Authority, clarity, formality, power
  - Use sparingly (once per page max) for critical sections
  - Pair with `letter-spacing: 0.1em` for breathing room
  - Example: "OUR PROCESS" or "GUARANTEED RESULTS" above section content

```css
.caps-authority {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.1em;
  color: #0f172a; /* navy */
}
```

- **Italic Typography** = Warmth, personality, emphasis, editorial tone
  - Use for: testimonials, quotes, personal brand statements, featured insights
  - Works especially well with serif fonts or elegant sans-serifs
  - Example: client testimonial, brand mission statement

```css
.warm-italic {
  font-style: italic;
  font-weight: 400;
  color: #64748b; /* slate for softness */
}
```

- **Serif Fonts** = Heritage, tradition, authority, sophistication
  - Use for: law firms, luxury brands, heritage companies, editorial brands
  - Common choices: Georgia, Garamond, Charter, Crimson Text
  - Example: high-end restaurant, law firm, historical brand

```css
.serif-heritage {
  font-family: 'Georgia', 'Garamond', serif;
  font-weight: 400;
  font-size: 18px;
}
```

---

## Typography Layout Techniques

Combine typography with strategic layout to create visual interest and guide attention.

### Oversized Pull Quotes

Pull quotes that break column width create focal points and break visual monotony:

```jsx
// React component example
export const PullQuote = ({ quote, attribution }) => (
  <blockquote className="my-12 -mx-4 md:-mx-8 px-6 md:px-8 border-l-4 border-blue-600">
    <p className="text-4xl md:text-5xl font-light italic leading-tight text-slate-800 mb-4">
      {quote}
    </p>
    <p className="text-sm font-medium text-slate-500">— {attribution}</p>
  </blockquote>
);
```

**Tailwind CSS styling:**
```css
.pull-quote {
  /* Break column width with negative margins */
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  padding: 2rem;
  background-color: #f1f5f9; /* light slate */
  border-left: 4px solid #2563eb; /* blue */
  font-size: clamp(24px, 5vw, 48px);
  font-style: italic;
  line-height: 1.3;
}
```

### Staggered Heading + Subheading

Different sizes, weights, and colors create visual rhythm:

```jsx
export const StaggeredHeading = () => (
  <div className="mb-8">
    <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-2">
      Why Choose Us
    </p>
    <h2 className="text-5xl font-bold text-slate-900 mb-4">
      Industry-Leading Service
    </h2>
    <p className="text-lg text-slate-600 max-w-2xl">
      Trusted by 500+ businesses nationwide for 15+ years.
    </p>
  </div>
);
```

**Hierarchy breakdown:**
- `<p class="text-sm text-blue-600 uppercase">` = Eye-catching label (12px, caps, color)
- `<h2 class="text-5xl font-bold">` = Primary heading (48px, bold, dark)
- `<p class="text-lg text-slate-600">` = Supporting text (18px, gray, warm)

The three-tier system (label, headline, description) guides eyes top-to-bottom with clear emphasis.

### Text Over Images with Proper Contrast

Readable text on images requires contrast techniques:

```jsx
export const HeroWithText = ({ bgImage, heading, subheading }) => (
  <div
    className="relative h-96 bg-cover bg-center"
    style={{ backgroundImage: `url(${bgImage})` }}
  >
    {/* Gradient overlay for contrast */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
    
    {/* Text shadow fallback */}
    <div className="relative z-10 flex items-center justify-start h-full p-8">
      <div>
        <h1 className="text-5xl font-bold text-white drop-shadow-lg mb-4">
          {heading}
        </h1>
        <p className="text-xl text-white/90 drop-shadow-md max-w-xl">
          {subheading}
        </p>
      </div>
    </div>
  </div>
);
```

**Contrast techniques (in priority order):**

1. **Gradient Overlay** (most effective)
   - `bg-gradient-to-r from-black/70 via-black/50 to-transparent`
   - Adapts to varied background images
   - Creates visual depth

2. **Text Shadow** (fallback for short text)
   - `drop-shadow-lg` (Tailwind) = `2px 2px 4px rgba(0,0,0,0.5)`
   - Use for single headlines only

3. **Semi-Transparent Panel** (for long content)
   ```jsx
   <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
   ```

4. **Text Color + Weight** (for very light backgrounds)
   - Use bold, dark text on light images
   - Ensure 4.5:1 contrast ratio for WCAG AA

### Vertical Text Accents

Vertical text as decorative or functional elements:

```jsx
export const SidebarLabel = ({ label }) => (
  <div className="relative">
    {/* Vertical text accent */}
    <div className="absolute -left-12 top-0 h-full flex items-center">
      <p
        className="text-sm font-semibold text-slate-400 uppercase"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        {label}
      </p>
    </div>
    {/* Main content */}
    <div className="pl-8">
      {/* Content here */}
    </div>
  </div>
);
```

**CSS implementation:**
```css
.vertical-text {
  writing-mode: vertical-rl; /* Right-to-left vertical */
  text-orientation: mixed; /* Mixed orientation for readability */
  transform: rotate(180deg); /* Optional: flip for left-to-right reading */
  font-weight: 600;
  letter-spacing: 0.1em;
}
```

### Number Styling for Impact

Large stat numbers with small labels create visual interest:

```jsx
export const StatCard = ({ number, label, description }) => (
  <div className="text-center">
    {/* Large stat number */}
    <p className="text-7xl md:text-8xl font-black text-blue-600 leading-none mb-2">
      {number}
    </p>
    {/* Small label above or below */}
    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
      {label}
    </p>
    {/* Description */}
    <p className="text-sm text-slate-600">{description}</p>
  </div>
);
```

**Key styling:**
- `text-7xl md:text-8xl` = Large, dominant number (56px-96px)
- `font-black` = Maximum weight for impact
- `leading-none` = Tight line-height to compact the number
- `text-xs uppercase` = Small, authoritative label
- Color the number, not the label, for emphasis

---

## Image Strategy for SMB Websites

Images are the fastest way to convey business type and professionalism. Choose strategy based on business category.

### Hero Images by Business Type

Each business type requires different image treatment:

**Hospitality & Venues** (restaurants, bars, hotels, gyms)
- Best images: Interior space shots, food/beverage close-ups, customers enjoying the space
- Aspect ratio: 16:9 (full-width hero)
- Mood: Warm, inviting, lifestyle-focused
- Unsplash searches: "restaurant interior", "modern gym", "cozy cafe", "luxury hotel lobby"

**Professional Services** (lawyers, accountants, consultants, architects)
- Best images: Office environments, team members, professional settings, client workspaces
- Aspect ratio: 16:9 or 2:3 (portrait for team photos)
- Mood: Trustworthy, serious, competent
- Unsplash searches: "modern office", "business team", "professional workspace"

**Personal Brands** (coaches, consultants, freelancers, personal trainers)
- Best images: Headshots, professional portraits, in-action shots
- Aspect ratio: 1:1 (square) or 2:3 (portrait)
- Mood: Approachable, confident, personable
- Unsplash searches: "professional headshot", "coach portrait", "mentor"

**Retail & E-Commerce** (shops, online stores, crafts, products)
- Best images: Product photography, shop floor, items in use
- Aspect ratio: 1:1 (square for product grid), 4:3 (lifestyle shots)
- Mood: Desirable, quality-focused, inspirational
- Unsplash searches: "product photography", "shopping", "craft display"

**Trades & Services** (plumbing, electrical, construction, landscaping)
- Best images: Work in progress, finished projects, tools, team action shots
- Aspect ratio: 16:9 (showcase project scale)
- Mood: Professional, competent, results-focused
- Unsplash searches: "renovation", "construction site", "professional tradesman", "landscaping"

**Creative & Design** (studios, marketing agencies, photographers, designers)
- Best images: Portfolio examples, process shots, creative spaces, tools
- Aspect ratio: Varied (3:2, 1:1, 4:5 for visual interest)
- Mood: Modern, aspirational, creative
- Unsplash searches: "creative workspace", "design studio", "photography"

### Image Aspect Ratios: Standard & Mobile

Choose aspect ratios strategically for different layouts:

```jsx
export const HeroImage = ({ src, alt, priority }) => (
  {/* 16:9 for full-width hero - desktop standard */}
  <img
    src={src}
    alt={alt}
    className="w-full aspect-video object-cover"
    loading={priority ? "eager" : "lazy"}
  />
);

export const CardImage = ({ src, alt }) => (
  {/* 4:3 for cards - balanced, familiar ratio */}
  <img
    src={src}
    alt={alt}
    className="w-full aspect-[4/3] object-cover"
  />
);

export const PortraitImage = ({ src, alt }) => (
  {/* 1:1 for portraits - square, symmetrical */}
  <img
    src={src}
    alt={alt}
    className="w-full aspect-square object-cover rounded-lg"
  />
);

export const MobileFirstImage = ({ src, alt }) => (
  {/* 3:4 for mobile-first layouts - vertical emphasis */}
  <img
    src={src}
    alt={alt}
    className="w-full aspect-[3/4] object-cover md:aspect-video"
  />
);
```

**Common ratios:**
- `aspect-video` (16:9) = Full-width hero, landscape emphasis
- `aspect-[4/3]` = Card images, comfortable width
- `aspect-square` = Portraits, team photos, product grid
- `aspect-[3/4]` = Mobile-first, portrait emphasis
- `aspect-[2/3]` = Tall portraits, gallery layouts

### Image Treatment: Corners, Borders, Effects

Image styling conveys brand personality:

**Rounded Corners** = Modern, friendly, approachable
```jsx
<img className="rounded-lg" /> {/* 8px radius - subtle modernity */}
<img className="rounded-2xl" /> {/* 16px radius - very friendly */}
<img className="rounded-full" /> {/* Circular - portraits, icons */}
```
Best for: contemporary brands, creative studios, modern services

**Sharp Corners** = Traditional, professional, formal
```jsx
<img className="rounded-none" /> {/* No rounding - crisp, formal */}
```
Best for: law firms, heritage brands, traditional businesses

**Borders** = Definition, framing, premium feel
```jsx
<img className="border-4 border-slate-200" /> {/* Subtle border */}
<img className="border-8 border-slate-900" /> {/* Bold border */}
```
Best for: galleries, portfolio sites, framed collections

**Shadows** = Depth, elevation, sophistication
```jsx
<img className="shadow-lg" /> {/* Tailwind shadow-lg */}
<img className="shadow-2xl" /> {/* Stronger shadow */}
```
Tailwind CSS shadows:
```css
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
```

**Grayscale/Duotone** = Minimalist, artistic, unique
```jsx
{/* Grayscale */}
<img className="grayscale hover:grayscale-0 transition" />

{/* Duotone (via CSS filter) */}
<img
  className="brightness-110 contrast-125"
  style={{
    filter: 'grayscale(100%) sepia(30%) hue-rotate(200deg) saturate(200%)'
  }}
/>
```
Best for: minimalist brands, artistic portfolios, avant-garde studios

### Placeholder Strategy: When Images Don't Exist

Most cold outreach SMBs have no professional photos. Use these proven fallbacks:

**Abstract Gradient Backgrounds**
```jsx
<div className="w-full h-96 bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-300" />
```
Simple, professional, fast-loading. Works for any business type.

**Lucide React Icon Compositions**
```jsx
import { Briefcase, Users, Zap, Shield } from 'lucide-react';

export const IconHero = ({ icon: Icon }) => (
  <div className="flex items-center justify-center h-80 bg-slate-50">
    <Icon className="w-32 h-32 text-blue-600" strokeWidth={0.5} />
  </div>
);
```
Build icon clusters for visual interest:
```jsx
<div className="relative w-80 h-80">
  <Briefcase className="absolute top-4 left-4 w-16 h-16 text-blue-600" />
  <Users className="absolute top-20 right-8 w-12 h-12 text-slate-400" />
  <Zap className="absolute bottom-12 left-12 w-14 h-14 text-yellow-500" />
  <Shield className="absolute bottom-8 right-4 w-10 h-10 text-slate-400" />
</div>
```

**Coloured Geometric Shapes**
```jsx
export const GeometricHero = () => (
  <div className="relative w-full h-96 bg-slate-900 overflow-hidden">
    {/* Overlapping circles */}
    <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-600/30" />
    <div className="absolute top-20 -left-10 w-48 h-48 rounded-full bg-cyan-400/20" />
    {/* Text overlay */}
    <div className="relative z-10 flex items-center justify-center h-full px-8">
      <h1 className="text-5xl font-bold text-white text-center">
        Your Heading Here
      </h1>
    </div>
  </div>
);
```

**Strong Typography as Primary Visual**
```jsx
export const TypographyHero = () => (
  <div className="bg-slate-50 py-24 px-8">
    <div className="max-w-4xl">
      <h1 className="text-7xl font-black text-slate-900 leading-none mb-6">
        Build Your Online Presence
      </h1>
      <p className="text-2xl text-slate-700 leading-relaxed">
        Professional websites for small businesses that actually convert.
      </p>
    </div>
  </div>
);
```

**Textured/Patterned Backgrounds (CSS)**
```css
/* Subtle dot pattern */
.pattern-dots {
  background-image: radial-gradient(circle, #cbd5e1 1px, transparent 1px);
  background-size: 20px 20px;
  background-color: #f1f5f9;
}

/* Diagonal lines */
.pattern-lines {
  background-image: repeating-linear-gradient(
    45deg,
    #e2e8f0,
    #e2e8f0 10px,
    #f1f5f9 10px,
    #f1f5f9 20px
  );
}

/* Grain/noise texture */
.pattern-grain {
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /></filter><rect width="100" height="100" fill="hsl(210, 40%, 98%)" filter="url(%23noise)" opacity="0.03"/></svg>');
}

/* Subtle wave pattern */
.pattern-wave {
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z" fill="rgba(37,99,235,0.05)"></path></svg>');
  background-repeat: repeat-x;
  background-size: 100% 100px;
}
```

---

## Image Layout Patterns

Combine multiple images strategically for visual impact.

### Single Hero Image (Simplest)
```jsx
export const SingleHeroLayout = ({ src, alt, heading }) => (
  <div className="relative h-[500px] overflow-hidden">
    <img src={src} alt={alt} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black/40" />
    <div className="absolute inset-0 flex items-center justify-center">
      <h1 className="text-5xl font-bold text-white text-center">{heading}</h1>
    </div>
  </div>
);
```

### Image Grid/Mosaic (Gallery Feel)
```jsx
export const MosaicGrid = ({ images }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-8">
    {images.map((img, idx) => (
      <img
        key={idx}
        src={img.src}
        alt={img.alt}
        className={`w-full object-cover rounded-lg ${
          idx === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'
        }`}
      />
    ))}
  </div>
);
```
Creates asymmetric, dynamic grid with featured image larger.

### Overlapping Images (Advanced)
```jsx
export const OverlappingImages = ({ images }) => (
  <div className="relative h-96 w-full">
    {/* Background image */}
    <img
      src={images[0].src}
      alt={images[0].alt}
      className="absolute inset-0 w-full h-full object-cover rounded-lg"
    />
    
    {/* Overlapping card image */}
    <div className="absolute bottom-0 right-0 w-64 h-48 -mb-8 -mr-8">
      <img
        src={images[1].src}
        alt={images[1].alt}
        className="w-full h-full object-cover rounded-lg shadow-2xl"
      />
    </div>
  </div>
);
```
Creates depth and visual interest through layering.

### Image + Text Side-by-Side (Classic)
```jsx
export const ImageTextLayout = ({ image, heading, description, reverse }) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${reverse ? 'md:[&>:last-child]:order-first' : ''}`}>
    {/* Image */}
    <div className="relative h-96">
      <img src={image.src} alt={image.alt} className="w-full h-full object-cover rounded-xl" />
    </div>
    
    {/* Text */}
    <div>
      <h2 className="text-4xl font-bold text-slate-900 mb-4">{heading}</h2>
      <p className="text-lg text-slate-600 leading-relaxed mb-6">{description}</p>
      <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Learn More
      </button>
    </div>
  </div>
);
```

---

## Key Implementation Notes

**Always optimize:**
- Use `object-cover` for images that might have different aspect ratios
- Lazy-load images below the fold with `loading="lazy"`
- Include `alt` text for accessibility and SEO
- Compress images before deploy (WebP format preferred)
- Use responsive images with `srcset` for different device sizes

**Brand consistency:**
- Document chosen typography scale and weights in brand guidelines
- Maintain consistent image aspect ratios across sections
- Use cohesive color palettes for overlays and patterns
- Test all text-over-image contrast on actual devices

**Accessibility:**
- Ensure 4.5:1 color contrast ratio for body text
- Never use images as the only way to convey information
- Provide meaningful `alt` text for all images
- Test readability at 200% zoom level
