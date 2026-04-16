# UX/UI Design Reference: Industry-Specific Layouts

This guide provides layout principles and component structures for building bespoke small business websites for UK SMBs. Each design should feel specifically crafted for its industry—never a generic template.

---

## Beauty Salons & Wellness

### Layout Personality
Serene, luxurious, image-rich. The website should evoke the feeling of stepping into a calm, high-end space.

### Hero Section
- Full-bleed treatment room or interior photography
- Alternatively: split-screen with owner portrait on one side, serene imagery on the other
- Headline should emphasise relaxation or transformation
- Soft overlay or gradient to ensure text readability

### Must-Have Sections
1. **Treatments Grid** – cards displaying services with images, brief descriptions, and prices (if available)
2. **Meet the Therapist** – personal bio with portrait, qualifications, specialisms
3. **Testimonials** – client stories with before/after context
4. **Booking CTA** – prominent button linking to booking system
5. **Gallery** – "Our Space" photo carousel of treatment rooms, reception, facilities

### Colour Palette
- Warm neutrals: cream, soft taupe, warm white
- Accents: soft pinks, dusty mauves, sage green, champagne gold
- Text: charcoal on light backgrounds, cream on dark overlays

### Typography
- Headings: elegant serif (e.g., Playfair Display, Cormorant)
- Body: light weight sans-serif (300–400), generous line-height (1.6–1.8)
- Purpose: convey luxury without feeling corporate

### Unique Elements
- Before/after image sliders for treatments
- Price list accordion (expandable by service category)
- Photo gallery with soft lightbox
- Trust badges (qualifications, memberships)

### What to Avoid
- Corporate grid layouts or rigid section spacing
- Generic stock photos of models (use real client transformations)
- Bullet-point feature lists (use flowing prose instead)
- Cold, clinical colour schemes
- Overly technical language

### Recommended React Component Structure

```
<BeautySalonPage>
  <Hero
    backgroundImage={treatmentRoomImage}
    headline="Escape to Serenity"
    subheadline="Bespoke treatments in a calm space"
  />
  <TreatmentsGrid
    treatments={[
      { id: 1, name: "Swedish Massage", price: "£65", image: massage.jpg, duration: "60 mins" },
      { id: 2, name: "Facial", price: "£75", image: facial.jpg, duration: "50 mins" },
      // ...
    ]}
  />
  <MeetTheTherapist
    name="Sarah Johnson"
    bio="...10+ years experience..."
    qualifications={["VTCT Qualified", "Hot Stone Specialist"]}
    image={sarah.jpg}
  />
  <Testimonials
    reviews={[
      { client: "Emma", text: "Life-changing...", image: emma.jpg },
      // ...
    ]}
  />
  <GalleryCarousel
    title="Our Sanctuary"
    images={galleryImages}
  />
  <BookingCTA
    buttonText="Book Your Treatment"
    linkTo="https://booking-system.com"
  />
</BeautySalonPage>
```

---

## Trades & Home Services

### Layout Personality
Trustworthy, practical, mobile-first. The site should feel immediate and action-oriented.

### Hero Section
- Bold, large headline with clear value proposition
- **Phone number must be prominent** (top-right, or integrated into headline)
- Hero image of completed work (not generic tools—show results)
- Optional: "Call Now" button alongside booking
- High contrast, fast-loading image

### Must-Have Sections
1. **Services List** – clear, scannable descriptions of what you offer
2. **Coverage Area** – map showing service radius or postcodes served
3. **Reviews/Testimonials** – star ratings, client names, real feedback
4. **Emergency Contact** – visible emergency/callout information
5. **Accreditations** – Gas Safe, NICEIC, Trading Standards, etc.

### Colour Palette
- Bold, high-contrast primary: bright blue, orange, or green
- Neutral secondary: white, light grey, dark grey
- Accent for CTAs: contrasting colour (e.g., orange if primary is blue)
- Text: dark on light, high contrast for readability on mobile

### Typography
- Headings: strong, bold sans-serif (700–800 weight)
- Body: compact sans-serif (400–600), tight line-height (1.4–1.5)
- Purpose: clarity and urgency, not elegance

### Unique Elements
- Sticky "Call Now" button (follows scroll on mobile)
- Service area interactive map (Mapbox, Google Maps)
- Emergency callout banner (prominent if 24/7 service)
- Accreditation logos in footer or dedicated section
- Photo gallery of recent completed jobs
- "How We Work" process timeline

### What to Avoid
- Excessive whitespace (feels inactive or untrustworthy)
- Elegant or light typography (wrong tone, harder to read on mobile)
- Hidden or small phone numbers
- Generic images of tools (show actual work)
- Lengthy copy (keep it scannable)
- Soft or muted colours (lose urgency)

### Recommended React Component Structure

```
<TradesPage>
  <Hero
    headline="Emergency Plumbing? We're Here"
    subheadline="24/7 Response • 5-Star Rated"
    phoneNumber="020 1234 5678"
    backgroundImage={completedWork.jpg}
    hasCTA={true}
  />
  <ServicesList
    services={[
      { id: 1, name: "Boiler Repairs", icon: wrench, description: "Fast, reliable repairs...", image: boiler.jpg },
      { id: 2, name: "Emergency Callouts", icon: alert, description: "We respond within 2 hours..." },
      // ...
    ]}
  />
  <CoverageArea
    mapCenter={[51.5074, -0.1278]}
    radius="15km"
    title="We Serve These Postcodes"
  />
  <Testimonials
    reviews={[
      { name: "John S.", stars: 5, text: "Brilliant service, fixed quickly", image: john.jpg },
      // ...
    ]}
  />
  <Accreditations
    badges={[gasSafe, niceic, tradingStandards]}
  />
  <Gallery
    title="Recent Work"
    images={jobPhotos}
  />
  <StickyCallButton
    phoneNumber="020 1234 5678"
    text="Call Now"
  />
</TradesPage>
```

---

## Professional Services

### Layout Personality
Authoritative, clean, text-forward. The site conveys expertise and professionalism without being cold.

### Hero Section
- Text-forward minimal design, or split-screen with team photo
- Headline communicates specialisation and trustworthiness
- Minimal imagery; emphasis on clear messaging
- Optional: subtle background or muted colour block

### Must-Have Sections
1. **Services with Descriptions** – detailed but scannable; group by practice area
2. **Team/Partner Profiles** – individual bios, qualifications, specialisms
3. **Credentials & Accreditations** – solicitor numbers, accountancy bodies, professional memberships
4. **Contact** – clear contact form, email, phone, office address
5. **Case Study Summaries** – brief examples of successful engagements (anonymised if needed)

### Colour Palette
- Primary: navy, charcoal, forest green, dark slate
- Accent: muted gold, soft blue, or complementary neutral
- Text: dark grey on white/cream, ensure WCAG AA contrast
- Purpose: convey seriousness and stability

### Typography
- Headings: balanced serif or modern sans-serif, 600–700 weight
- Body: readable serif or sans-serif, 400 weight, generous line-height (1.6–1.8)
- Purpose: professional, trustworthy, readable in long-form text

### Unique Elements
- "Areas of Practice" section with icons/cards
- Team cards with photo, name, title, areas of expertise, email
- Credentials bar or badge section (Law Society, ICAEW, etc.)
- Downloadable resources (guides, whitepapers, FAQs)
- Case study cards (anonymised, showing outcomes)
- FAQ accordion for common questions

### What to Avoid
- Flashy animations or transitions
- Too-casual tone or language
- Stock photos of handshakes, people in suits, generic office scenes
- Overly decorative elements
- Hidden or unclear contact information
- Complex navigation

### Recommended React Component Structure

```
<ProfessionalServicesPage>
  <Hero
    headline="Expert Solicitors in Employment Law"
    subheadline="Protecting businesses and employees since 2010"
    backgroundImage={optional}
  />
  <Intro
    text="We specialise in..."
  />
  <PracticeAreas
    areas={[
      { id: 1, title: "Employment Law", icon: briefcase, description: "...unfair dismissal, contracts..." },
      { id: 2, title: "Commercial", icon: contract, description: "..." },
      // ...
    ]}
  />
  <CaseStudies
    studies={[
      { title: "Successful Tribunal Defence", outcome: "Dismissed unfair claim", anonymised: true },
      // ...
    ]}
  />
  <TeamProfiles
    team={[
      { name: "Jane Doe", title: "Senior Solicitor", areas: ["Employment", "Commercial"], image: jane.jpg, credentials: "Solicitor, Law Society" },
      // ...
    ]}
  />
  <Credentials
    memberships={[lawSociety, businessLawyer, iba]}
  />
  <ContactSection
    phone="020 1234 5678"
    email="hello@firm.co.uk"
    address="123 High Street, London"
  />
  <FAQ
    questions={faqData}
  />
</ProfessionalServicesPage>
```

---

## Boutique Retail & E-commerce

### Layout Personality
Visual, editorial, product-focused. The site tells a brand story through imagery and carefully curated content.

### Hero Section
- Product showcase or lifestyle imagery (high-quality, professional)
- Minimal text overlay; let imagery speak
- Optional: editorial headline with strong typography
- Clean, uncluttered design that highlights products

### Must-Have Sections
1. **Featured Products/Collections** – grid or carousel showcasing top items
2. **Brand Story** – concise narrative about the brand's values and origin
3. **Instagram Feed Placeholder** – social proof via real customer posts
4. **Shop CTA** – clear "Shop Now" or collection links
5. **Press/Media** – "As Seen In" logos or mentions

### Colour Palette
- Often monochromatic or two-tone (black/white, navy/cream)
- One accent colour that reflects brand personality
- High contrast for typography and CTAs
- Purpose: editorial sophistication, focus on products

### Typography
- Headings: thin serif (editorial feel) or geometric sans-serif (modern)
- Body: clean sans-serif, 400–500 weight
- Purpose: fashion/editorial tone, high visual hierarchy

### Unique Elements
- Product grid with hover effects (zoom, overlay, quick-add)
- "As Seen In" press logo section
- Lookbook-style image grid (lifestyle, not product-only)
- Colour/size swatches on product cards
- Customer testimonials or "Featured In" section
- Seasonal or curated collection cards
- Newsletter signup with incentive

### What to Avoid
- Walls of text or lengthy descriptions
- Generic service descriptions (focus on products)
- Corporate structure or layouts
- Stock photography (use original lifestyle/product shots)
- Cluttered product pages
- Unclear sizing or shipping information

### Recommended React Component Structure

```
<RetailPage>
  <Hero
    backgroundImage={productShowcase.jpg}
    headline="Curated for You"
    subheadline={optional}
  />
  <BrandStory
    title="Who We Are"
    image={founder.jpg}
    text="We believe in..."
  />
  <FeaturedCollection
    title="New Arrivals"
    products={[
      { id: 1, name: "Silk Scarf", price: "£45", image: scarf.jpg, colors: ["navy", "blush"], sizes: ["OS"] },
      // ...
    ]}
  />
  <LookbookGrid
    title="Styling Ideas"
    images={lifestylePhotos}
  />
  <AsSeenIn
    title="Featured In"
    logos={[vogueLogo, harpersBazaarLogo]}
  />
  <InstagramFeed
    handle="@yourbrand"
    embedUrl="https://..."
  />
  <Testimonials
    reviews={customerPhotos}
  />
  <NewsletterSignup
    incentive="10% off first order"
  />
</RetailPage>
```

---

## Food & Hospitality

### Layout Personality
Warm, appetising, atmosphere-driven. The site should make visitors hungry and feel welcomed.

### Hero Section
- Full-bleed food or venue photography with warm lighting
- Overlay text or hero text with restaurant name and tagline
- Optional: animated or subtle parallax to add life
- Emphasise ambiance and experience, not just food

### Must-Have Sections
1. **Menu Highlights** – showcase signature dishes with photos and descriptions
2. **Opening Hours & Location** – clear, prominent, easy to scan
3. **Map & Directions** – embedded map with address and parking info
4. **Reservation CTA** – button linking to booking system (OpenTable, Bookings, etc.)
5. **Photo Gallery** – carousel or grid of venue, dishes, happy customers
6. **About/Story** – brief narrative about the restaurant's concept and team

### Colour Palette
- Warm primary: deep red, burnt orange, warm brown, forest green, rich cream, black
- Accent: gold, warm copper, or complementary warm tone
- Text: dark on light, cream on dark backgrounds
- Purpose: appetite appeal, warmth, and invitation

### Typography
- Headings: display serif or friendly script (personality) – e.g., Playfair, Cormorant, handwritten serif
- Body: clean, readable sans-serif for menus and info (400–500 weight)
- Purpose: personality in headings, clarity in menus

### Unique Elements
- Menu preview section (PDF download or expandable sections)
- Opening hours badge with current status (open/closed)
- Reservation widget (inline calendar booking)
- Photo carousel of dishes, venue, events
- Customer testimonials or reviews
- Special offers or event announcements banner
- "Private Events" or catering section

### What to Avoid
- Clinical or cold layouts and colour schemes
- Hiding opening hours or location
- Small or hard-to-read menu fonts
- Generic food photography (use real, professional shots)
- Minimalist design that doesn't match warm hospitality tone
- Overly formal tone (unless Michelin fine dining)

### Recommended React Component Structure

```
<RestaurantPage>
  <Hero
    backgroundImage={dishOrVenue.jpg}
    headline="Welcome to The Green Table"
    subheadline="Farm-to-table dining, seasonal menus"
    overlayOpacity={0.3}
  />
  <About
    title="Our Story"
    text="Founded in 2015..."
    image={chef.jpg}
  />
  <MenuHighlights
    title="Our Signature Dishes"
    dishes={[
      { name: "Pan-Roasted Sea Bass", description: "...with seasonal veg...", price: "£24", image: seabass.jpg },
      // ...
    ]}
  />
  <OpeningHours
    monday="10am–11pm"
    tuesday="10am–11pm"
    // ...
    currentStatus="Open now"
  />
  <LocationMap
    address="123 High Street, Manchester"
    mapEmbed={...}
  />
  <PhotoGallery
    title="Our Space & Plates"
    images={venueAndDishPhotos}
  />
  <ReservationWidget
    buttonText="Book a Table"
    externalLink="https://opentable.com/..."
  />
  <Testimonials
    reviews={customerReviews}
  />
  <EventsOrPrivateDining
    title="Host Your Event"
    description="..."
  />
</RestaurantPage>
```

---

## Creative & Digital

### Layout Personality
Portfolio-driven, bold, innovative. The website itself is a portfolio piece—the design demonstrates the agency's or creative's capabilities.

### Hero Section
- Asymmetric or unusual layout (break the grid)
- Showcase creativity in layout, not just imagery
- Bold typography, experimental sizing, or layered elements
- Optional: animated entrance or dynamic content
- Can be dark, moody, or very minimal

### Must-Have Sections
1. **Portfolio Grid** – masonry or bespoke layout showcasing work
2. **Process/How We Work** – timeline or visual breakdown of creative approach
3. **Client Logos** – recognisable brands worked with (builds credibility)
4. **Case Study Cards** – detailed project breakdowns with outcomes
5. **Contact/Inquiry CTA** – clear path to getting in touch

### Colour Palette
- Often dark/moody: black, charcoal, deep navy with bright accent
- Or very minimal: white/light grey with single bold accent
- Or brand-specific: depends on agency personality
- Purpose: showcase the work and the agency's taste

### Typography
- Headings: bold geometric sans-serif, tight tracking, experimental sizing hierarchy
- Body: modern sans-serif, 400–500 weight
- Purpose: bold, confident, design-forward

### Unique Elements
- Masonry or bespoke portfolio grid (not standard rows)
- Animated transitions or scroll effects (tasteful, not excessive)
- Dark mode toggle (if brand supports it)
- Case study full-page cards with video or interactive elements
- Client testimonials with photos
- Team profiles or "About" section
- "Latest Work" or featured projects section
- Blog or thought leadership content

### What to Avoid
- Safe, generic layouts (the site IS the portfolio—take risks)
- Too much copy or lengthy descriptions (let work speak)
- Stock photography or generic imagery
- Overly polished or corporate feel (should feel creative)
- Hidden navigation or confusing UX (innovation shouldn't sacrifice usability)
- Multiple competing visual styles (cohesive, bold, intentional)

### Recommended React Component Structure

```
<CreativeAgencyPage>
  <Hero
    headline="We Create Digital Experiences"
    subheadline="Award-Winning Design & Development"
    backgroundVideo={optional}
    hasAsymmetricLayout={true}
  />
  <PortfolioGrid
    layout="masonry"
    projects={[
      { id: 1, title: "Brand Identity – TechCo", image: techco.jpg, tags: ["Branding", "Web"] },
      { id: 2, title: "Website Redesign – Fashion Label", image: fashion.jpg, tags: ["UX", "Dev"] },
      // ...
    ]}
  />
  <Process
    title="How We Work"
    steps={[
      { phase: "Discovery", description: "Understanding your vision...", icon: discover },
      { phase: "Strategy", description: "Crafting the approach..." },
      { phase: "Design", description: "Bringing ideas to life..." },
      { phase: "Build & Launch", description: "Development and launch..." },
    ]}
  />
  <ClientLogos
    title="Trusted By"
    logos={[client1, client2, client3]}
  />
  <CaseStudies
    studies={[
      { title: "TechCo Brand Identity", image: techco.jpg, challenge: "...", solution: "...", result: "40% increase in engagement", link: "/case-studies/techco" },
      // ...
    ]}
  />
  <Testimonials
    testimonials={agencyReviews}
  />
  <ContactCTA
    headline="Ready to Create Something Great?"
    buttonText="Get in Touch"
  />
</CreativeAgencyPage>
```

---

## General Principles for All Industries

### Mobile-First Approach
- Design for mobile first, then enhance for desktop
- Ensure all CTAs (phone, booking, email) are thumb-friendly on mobile
- Test readability on small screens

### Image Optimization
- Use high-quality, professional imagery (no generic stock photos)
- Optimize for fast loading (WebP, lazy loading)
- Ensure responsive images scale cleanly

### Performance & Accessibility
- Fast page loads (images optimised, minimal animations)
- WCAG AA contrast ratios (at minimum)
- Keyboard navigation and screen reader support
- Clear, descriptive alt text for all images

### CTA Strategy
- Every section should have a clear next action
- Vary CTA wording based on context (Book, Learn More, Call Now, Get Quote, etc.)
- Make phone numbers clickable on mobile
- Use sticky CTAs sparingly (trades exception: "Call Now" button is expected)

### Content Strategy
- Write for the audience (business owners, not designers)
- Keep copy scannable with headers, short paragraphs, lists
- Use real client language (testimonials, case studies)
- Avoid jargon unless it's the industry standard

---

## Using This Guide

When building a site for a new prospect:

1. **Identify the industry** from the pipeline
2. **Review the relevant section** for layout personality, colours, typography, and unique elements
3. **Use the recommended React component structure** as a starting point
4. **Adapt copy, images, and colours** to match the specific business
5. **Ensure the site feels bespoke**, not templated
6. **Test on mobile** and gather feedback from the prospect

Remember: The goal is to show the prospect how a designed-for-them website can better represent their business than a generic template.
