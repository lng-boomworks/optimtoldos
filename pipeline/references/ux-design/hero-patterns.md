# Hero Patterns Reference

A guide for selecting and implementing hero patterns that reflect each business's unique brand and value proposition. Rather than defaulting to a single template, this ensures every website feels bespoke.

---

## 1. Full-Bleed Image Hero

### When to Use

**Business types:** Restaurants, cafes, beauty salons, spas, event venues, hotels, lifestyle brands, photography portfolios

**Brand personality:** Visual-first, experiential, aspirational, warm, inviting

**Available assets:** High-quality photos or video content that conveys the brand essence

### When NOT to Use

- Businesses without compelling visual assets (accounting firms, software-as-a-service, legal practices)
- Text-heavy value propositions that get lost under images
- Generic stock photos; only works with authentic, branded imagery
- Mobile-first services where photography doesn't drive decision-making

### Tailwind CSS Implementation

```html
<div class="relative h-screen w-full overflow-hidden">
  <!-- Background image with gradient overlay -->
  <div 
    class="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style="background-image: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%), url('/hero-image.jpg')"
  />
  
  <!-- Content overlay -->
  <div class="relative h-full flex flex-col items-center justify-center px-4 sm:px-6">
    <h1 class="text-4xl sm:text-5xl lg:text-7xl font-bold text-white text-center max-w-3xl">
      Exceptional Dining Experience
    </h1>
    <p class="mt-6 text-lg sm:text-xl text-gray-100 text-center max-w-2xl">
      Farm-to-table cuisine in an intimate setting
    </p>
    <button class="mt-8 px-8 py-3 bg-white text-gray-900 font-semibold rounded hover:bg-gray-100 transition">
      Reserve a Table
    </button>
  </div>
</div>
```

### Key CSS Principles

- **`object-cover`** on image background ensures it fills the space without distortion
- **Gradient overlay** (`rgba(0,0,0,0.3)` to `rgba(0,0,0,0.2)`) ensures text readability without losing image impact
- **`text-white`** with generous line-height for contrast
- **Absolute positioning** for content layers the text above the image
- **Responsive text sizes** scale heading from 2xl on mobile to 7xl on desktop

### Page Layout Impact

- Establishes visual tone immediately; all subsequent sections inherit brand mood
- Content sections below should use lighter, breathing backgrounds to avoid visual fatigue
- CTA buttons in subsequent sections should echo the hero button style
- Best followed by a content section (testimonials, menu, gallery) that provides more detail

---

## 2. Split-Screen Hero

### When to Use

**Business types:** Personal service businesses (therapists, life coaches, consultants, personal trainers, hairstylists, photographers), solo entrepreneurs, service practices where the person IS the brand

**Brand personality:** Personable, trustworthy, approachable, professional yet warm

**Available assets:** Professional portrait/headshot, ideally showing personality (not just formal corporate photo)

### When NOT to Use

- Team-based businesses (law firms with multiple partners, group agencies)
- Businesses without a strong personal brand element
- When no compelling portrait is available
- Product-focused businesses without a clear brand ambassador

### Tailwind CSS Implementation

```html
<div class="grid md:grid-cols-2 gap-0 min-h-screen">
  <!-- Left column: Text content -->
  <div class="flex flex-col justify-center px-6 sm:px-12 py-12 md:py-0 bg-gray-50">
    <div class="max-w-lg">
      <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
        Mental clarity through coaching
      </h1>
      <p class="mt-6 text-lg text-gray-600 leading-relaxed">
        I help entrepreneurs break through mental blocks and build sustainable high-performance habits.
      </p>
      
      <!-- Trust signals -->
      <ul class="mt-8 space-y-3">
        <li class="flex items-start">
          <span class="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-600 text-white text-sm font-bold mr-3">✓</span>
          <span class="text-gray-700">15+ years coaching experience</span>
        </li>
        <li class="flex items-start">
          <span class="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-600 text-white text-sm font-bold mr-3">✓</span>
          <span class="text-gray-700">Certified performance coach</span>
        </li>
        <li class="flex items-start">
          <span class="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-600 text-white text-sm font-bold mr-3">✓</span>
          <span class="text-gray-700">200+ clients transformed</span>
        </li>
      </ul>
      
      <button class="mt-10 px-8 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition">
        Book a Discovery Call
      </button>
    </div>
  </div>
  
  <!-- Right column: Image -->
  <div class="hidden md:block relative overflow-hidden bg-gray-200">
    <img 
      src="/portrait.jpg" 
      alt="Coach name" 
      class="w-full h-full object-cover"
    />
  </div>
</div>
```

### Key CSS Principles

- **`md:grid-cols-2`** creates the two-column split; stacks on mobile
- **`object-cover`** on image ensures it fills its container
- **Left column lighter background** (`bg-gray-50`) provides contrast for text
- **Right column hidden on mobile** prevents awkward narrow image; text-only on small screens
- **Trust signals** (bullets, numbers) build credibility in the text-forward approach

### Page Layout Impact

- Establishes personal connection immediately; entire brand feels person-centered
- Following sections should acknowledge the person (testimonials, about story) rather than jumping to abstract services
- Sidebar navigation or sticky elements should reference the person's name for consistency
- If there's a second hero or major section, consider another portrait-forward layout to maintain cohesion

---

## 3. Text-Forward Minimal Hero

### When to Use

**Business types:** Professional services (accounting, legal, consulting), B2B SaaS, healthcare practices, financial advisory, management consulting, corporate practices

**Brand personality:** Trustworthy, sophisticated, minimal, serious, professional

**Available assets:** None required; strength is in typography and layout

### When NOT to Use

- Hospitality, beauty, or lifestyle brands where imagery conveys the offering
- Businesses without a clear value proposition (need visuals to explain)
- Brands that are playful or youthful (feels cold)

### Tailwind CSS Implementation

```html
<div class="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 bg-white">
  <div class="max-w-3xl">
    <!-- Subtle accent line or color -->
    <div class="h-1 w-16 bg-gradient-to-r from-slate-900 to-slate-600 mb-8"></div>
    
    <!-- Main heading with generous sizing -->
    <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
      Tax strategy that compounds
    </h1>
    
    <!-- Subheading with breathing room -->
    <p class="mt-8 text-xl sm:text-2xl text-gray-600 leading-relaxed font-light">
      We align your tax planning with long-term wealth building, not just annual compliance.
    </p>
    
    <!-- Secondary text with more details -->
    <div class="mt-10 text-lg text-gray-500 space-y-4">
      <p>For founders, executives, and high-net-worth individuals who want more than a CPA.</p>
    </div>
    
    <!-- CTA paired with secondary action -->
    <div class="mt-12 flex flex-col sm:flex-row gap-4">
      <button class="px-8 py-3 bg-slate-900 text-white font-semibold rounded hover:bg-slate-800 transition">
        Schedule a Consultation
      </button>
      <button class="px-8 py-3 border-2 border-slate-900 text-slate-900 font-semibold rounded hover:bg-slate-50 transition">
        View Our Approach
      </button>
    </div>
  </div>
</div>
```

### Key CSS Principles

- **Oversized headings** (5xl–7xl) make powerful use of negative space
- **Limited color palette**: grayscale with one accent color (brand primary)
- **Accent line or bar** signals sophistication; provides visual entry point
- **Generous padding and margins** (`mt-8`, `mt-10`, `mt-12`) prevent clutter
- **Font weight variation** (`font-bold` heading, `font-light` subheading) adds visual hierarchy
- **Dual CTAs** (primary + secondary) give options without overwhelming

### Page Layout Impact

- Sets a formal, credible tone; subsequent sections should mirror this sophistication
- Works well with "Services Overview" section using cards or lists
- Testimonials from recognizable companies or individuals should follow
- Avoid bright colors or playful imagery in subsequent sections; maintain the professional aesthetic

---

## 4. Video/Motion Hero

### When to Use

**Business types:** Creative agencies, tech/SaaS companies, event venues, studios, production companies, brands with strong atmospheric identity

**Brand personality:** Innovative, dynamic, modern, energetic, creative

**Available assets:** Looped background video (10–20 seconds), ideally branded and thematic

### When NOT to Use

- Low bandwidth contexts (mobile-heavy user base in slow networks)
- Businesses where motion feels forced (accounting, legal, traditional practices)
- Content that conflicts with or distracts from the text message
- When fallback poster image is not available (accessibility)

### Tailwind CSS Implementation

```html
<div class="relative h-screen w-full overflow-hidden flex items-center justify-center">
  <!-- Background video -->
  <video 
    autoplay 
    muted 
    loop 
    playsinline
    class="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/hero-video.mp4" type="video/mp4" />
    <source src="/hero-video.webm" type="video/webm" />
    <!-- Fallback: poster image -->
    <img 
      src="/hero-poster.jpg" 
      alt="Motion hero background" 
      class="w-full h-full object-cover"
    />
  </video>
  
  <!-- Dark overlay for text readability -->
  <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
  
  <!-- Content overlay -->
  <div class="relative z-10 text-center px-4 sm:px-6 max-w-2xl">
    <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
      We bring creative visions to life
    </h1>
    <p class="mt-6 text-lg sm:text-xl text-gray-100">
      Full-service production and design for brands that move people
    </p>
    <button class="mt-10 px-8 py-3 bg-white text-gray-900 font-semibold rounded hover:bg-gray-100 transition">
      See Our Work
    </button>
  </div>
</div>
```

### Key CSS Principles

- **`autoplay muted loop`** ensures video plays without user interaction
- **`playsinline`** forces video to play inline on mobile (doesn't go full-screen)
- **Gradient overlay** (`bg-gradient-to-b from-black/40 via-black/30 to-black/50`) ensures text readability while preserving video
- **`object-cover`** on video ensures it fills the container without distortion
- **Fallback image** critical for accessibility and loading states
- **`z-10`** on content ensures text sits above video and overlay

### Video Guidelines

- Keep video duration 10–20 seconds and looped
- File size matters: compress to 2–5MB; use WebM for better compression than MP4
- Avoid text-heavy or busy content in the video; it competes with overlay text
- Poster image should be first frame of video or similar aesthetic

### Page Layout Impact

- Establishes energy and momentum; subsequent sections should feel purposeful, not abrupt
- Works well with portfolio/project showcase sections
- Consider reducing motion in secondary sections to avoid fatigue
- Ensure subsequent CTAs maintain the energy level (avoid stiff, corporate sections immediately after)

---

## 5. Card/Feature Hero

### When to Use

**Business types:** Gyms and fitness studios (class types), salons (service categories), medical practices (specialties), co-working spaces (room types), restaurants (cuisine types), any business with multiple offerings

**Brand personality:** Organized, varied, dynamic, modern, helpful

**Available assets:** 3–6 icons, illustrations, or small photos; short benefit text for each

### When NOT to Use

- Single-service businesses
- When offerings aren't visually distinct or memorable
- Cluttered, overcomplicated service menus (limit to 3–6 cards)

### Tailwind CSS Implementation

```html
<div class="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 bg-gray-50 py-16">
  <div class="max-w-4xl mx-auto w-full">
    <!-- Hero heading -->
    <div class="text-center mb-12">
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
        Fitness Classes for Every Goal
      </h1>
      <p class="mt-4 text-lg text-gray-600">
        Find your perfect workout, from high-intensity to mindful movement
      </p>
    </div>
    
    <!-- Cards grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Card 1 -->
      <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition p-8 text-center">
        <div class="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
          <svg class="h-8 w-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <!-- Icon SVG -->
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">HIIT Training</h3>
        <p class="text-gray-600">
          30-minute high-intensity intervals to maximize calorie burn and endurance
        </p>
        <button class="mt-6 w-full py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded hover:bg-blue-50 transition">
          Learn More
        </button>
      </div>
      
      <!-- Card 2 -->
      <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition p-8 text-center">
        <div class="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <svg class="h-8 w-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
            <!-- Icon SVG -->
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Yoga & Mindfulness</h3>
        <p class="text-gray-600">
          Flow and restore classes to build flexibility, strength, and inner calm
        </p>
        <button class="mt-6 w-full py-2 border-2 border-green-600 text-green-600 font-semibold rounded hover:bg-green-50 transition">
          Learn More
        </button>
      </div>
      
      <!-- Card 3 -->
      <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition p-8 text-center">
        <div class="inline-flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 mb-4">
          <svg class="h-8 w-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
            <!-- Icon SVG -->
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Strength Coaching</h3>
        <p class="text-gray-600">
          Personalized coaching to build muscle, improve form, and break plateaus
        </p>
        <button class="mt-6 w-full py-2 border-2 border-purple-600 text-purple-600 font-semibold rounded hover:bg-purple-50 transition">
          Learn More
        </button>
      </div>
    </div>
    
    <!-- Secondary CTA -->
    <div class="text-center mt-12">
      <button class="px-8 py-3 bg-gray-900 text-white font-semibold rounded hover:bg-gray-800 transition">
        View Full Schedule
      </button>
    </div>
  </div>
</div>
```

### Key CSS Principles

- **`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`** responsive grid; stacks on mobile
- **Card background** (`bg-white`) provides clear visual separation
- **Hover shadow** (`hover:shadow-lg`) adds interactivity without heavy motion
- **Colored accent icons** or circles (`bg-blue-100`, `text-blue-600`) differentiate cards
- **Border-only buttons** keep focus on text while providing visual hierarchy
- **Gap spacing** (`gap-6`) creates breathing room between cards

### Page Layout Impact

- Immediately communicates range and variety; viewers understand offerings at a glance
- Following sections should provide deeper detail (full class schedules, instructor bios, or testimonials)
- Consider dedicated pages or modals for each offering; cards should link to detail content
- Works well before a CTA section ("Join Now", "Browse Classes")

---

## 6. Asymmetric Overlap Hero

### When to Use

**Business types:** Luxury brands, boutique businesses, creative studios, design agencies, high-end fashion, jewelry, exclusive services

**Brand personality:** Sophisticated, unique, artistic, premium, bold

**Available assets:** High-quality images that work as standalone visual statements; strong brand identity

### When NOT to Use

- Conservative industries (law, accounting, finance)
- Mobile-only or small-screen primary audience (overlap effect gets cramped)
- When clarity is paramount; complexity can reduce scannability
- Brands without a clear premium or artistic positioning

### Tailwind CSS Implementation

```html
<div class="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-6xl mx-auto items-center">
    <!-- Text content: positioned with relative/negative margins for overlap -->
    <div class="relative z-20 px-6 sm:px-12 py-12 bg-white">
      <h1 class="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight">
        Handcrafted Luxury
      </h1>
      <p class="mt-6 text-lg text-gray-600 leading-relaxed max-w-md">
        Each piece is a masterwork of artisan skill and premium materials, designed for those who demand the extraordinary.
      </p>
      
      <div class="mt-8 space-y-4 text-sm text-gray-500">
        <p>✓ Small-batch production</p>
        <p>✓ Ethically sourced materials</p>
        <p>✓ Lifetime craftsmanship warranty</p>
      </div>
      
      <button class="mt-10 px-8 py-3 bg-gray-900 text-white font-semibold rounded hover:bg-gray-800 transition">
        Explore Collection
      </button>
    </div>
    
    <!-- Image: overlaps into left column with negative margin -->
    <div class="relative h-96 md:h-full -ml-12 md:-ml-24">
      <img 
        src="/luxury-product.jpg" 
        alt="Luxury product" 
        class="w-full h-full object-cover shadow-2xl"
      />
      
      <!-- Small accent text/badge positioned over image -->
      <div class="absolute bottom-8 right-8 bg-white px-6 py-3 shadow-lg rounded">
        <p class="text-sm font-semibold text-gray-900">Est. 2015</p>
        <p class="text-xs text-gray-500">Italian Craftsmanship</p>
      </div>
    </div>
  </div>
</div>
```

### Key CSS Principles

- **Negative margins** (`-ml-12 md:-ml-24`) pull image into text column, creating overlap
- **`z-index` layering** ensures text reads over the image; adjust `z-20` as needed
- **`shadow-2xl`** on image adds depth and separation from background
- **Accent badge** positioned `absolute bottom-8 right-8` floats over image
- **Grid gap removed** (`gap-0`) so columns can overlap seamlessly
- **Responsive adjustment** removes overlap on mobile; becomes standard split layout

### Positioning Techniques

```css
/* For advanced asymmetry, consider absolute positioning: */
.image-container {
  position: relative;
  height: 600px;
}

.image {
  position: absolute;
  right: -100px;
  top: -50px;
  width: 600px;
  height: 600px;
  object-fit: cover;
  transform: rotate(-5deg);
}
```

### Page Layout Impact

- Establishes bold, artistic brand identity immediately
- Following sections should mirror asymmetry; avoid rigid, grid-based layouts
- Works well with minimal, breathing content sections (avoid cramped cards)
- Secondary images or blocks should echo the offset/overlap technique for visual consistency
- Consider offset CTAs or accent elements in following sections

---

## Decision Matrix: Choosing Your Hero

Use this matrix to select the hero pattern that best matches the business, brand, and available assets.

| Business Type | Brand Personality | Available Assets | Recommended Hero Pattern | Rationale |
|---|---|---|---|---|
| Restaurant, café | Experiential, warm, inviting | High-quality food/ambiance photos | Full-bleed image | Photos are the primary selling point |
| Personal trainer, therapist, coach | Personable, trustworthy, approachable | Professional portrait | Split-screen | Person IS the brand; builds trust |
| Accounting firm, law practice | Professional, trustworthy, minimal | None needed | Text-forward minimal | Imagery would feel out of place; typography builds credibility |
| Creative agency, production studio | Innovative, dynamic, modern | Branded looped video | Video/motion | Showcases capabilities and energy |
| Gym, salon, medical practice | Organized, varied, helpful | Multiple service icons/photos | Card/feature | Communicates range at a glance |
| Luxury brand, boutique studio | Sophisticated, unique, artistic | Premium lifestyle images | Asymmetric overlap | Creates "wow" factor and premium positioning |
| Beauty salon (solo owner) | Creative, personable, premium | Portrait + salon photos | Split-screen or asymmetric overlap | Combines personal brand with visual atmosphere |
| SaaS/tech startup | Modern, innovative, trustworthy | Product screenshots, abstract imagery | Video/motion or text-forward | Motion conveys innovation; text-forward if focused on clarity |
| Real estate agency (solo) | Professional, trustworthy, personable | Agent portrait + property photos | Split-screen | Builds trust while showcasing properties |
| Photography portfolio | Artistic, visual-first, premium | Portfolio images | Full-bleed image or asymmetric overlap | Lets the work speak; asymmetric for extra sophistication |
| Consulting practice (team) | Professional, collaborative, expertise | None or team photos | Text-forward minimal | Focuses on expertise, not individuals |
| Fitness boutique (specialized class) | Dynamic, energetic, community | Class/movement photos, video | Video/motion or card/feature | Motion conveys energy; cards if multiple class types |
| Design agency (small team) | Creative, modern, bespoke | Diverse project examples, brand assets | Asymmetric overlap or video/motion | Establishes creative sophistication |
| Pet services (grooming, training) | Friendly, trustworthy, fun | Pet photos, owner testimonials | Full-bleed image or card/feature | Pet photos build emotional connection; cards for service types |
| Corporate consulting | Conservative, trustworthy, expertise | None or minimal | Text-forward minimal | Positioning and credentials matter more than imagery |

---

## Implementation Notes for AI Design Agents

### Tailwind Responsive Considerations

- All patterns include responsive breakpoints: mobile-first base, `sm:` (640px), `md:` (768px), `lg:` (1024px)
- Test each pattern at mobile, tablet, and desktop widths
- Ensure touch targets (buttons, cards) are at least 48px × 48px on mobile

### Accessibility Requirements

- Always include `alt` text on images; describe the content, not "hero image"
- Ensure contrast ratio of 4.5:1 minimum for text over images (use gradient overlays)
- Video/motion heroes must include a poster image fallback
- Autoplay video should always be muted and include play/pause controls if visible

### Performance Best Practices

- Optimize all images: use WebP with JPG fallback, compress to max 200KB
- Video files should not exceed 5MB; use WebM for efficiency
- Lazy-load images below the fold
- Consider preloading hero assets for fastest LCP (Largest Contentful Paint)

### Brand Consistency

- Each hero pattern should use the same color palette, typography, and spacing system as the rest of the site
- Button styles, spacing increments, and shadows should echo the hero in all subsequent sections
- Maintain consistent spacing ratios (`mt-6`, `mt-8`, `mt-12`) throughout

---

## When to Mix Patterns

Some sites benefit from multiple hero patterns across different pages:

- **Homepage**: Full-bleed or video/motion (establishes brand energy)
- **Services page**: Card/feature hero (communicates offerings)
- **About page**: Split-screen with founder portrait (builds personal connection)
- **Portfolio/case studies**: Asymmetric overlap (showcases work with artistry)

Maintain visual cohesion by echoing the homepage hero style in secondary sections.

---

## Quick Checklist Before Implementation

- [ ] Hero pattern matches business type and brand personality
- [ ] Assets (images, video, icons) are high-quality and authentic
- [ ] Text overlay has sufficient contrast for readability (test at mobile width)
- [ ] CTA button is clear and action-oriented
- [ ] Mobile layout (stacking, hidden elements) is intentional, not cramped
- [ ] Page feels balanced: hero doesn't overwhelm; following sections breathe
- [ ] Video (if used) loops smoothly and has fallback poster
- [ ] Responsive design tested at 375px, 768px, 1024px, and 1440px widths
