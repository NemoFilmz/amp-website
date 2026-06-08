/**
 * Single source of truth for all site content.
 * Copy is taken verbatim from the client brief (Website 2026-05).
 * Imagery uses local graded placeholders in /public/placeholders, every slot
 * swappable for real AMP footage (replace the file or point the path at a video).
 */

export const BRAND = {
  name: 'Action Media Production',
  short: 'AMP',
  legal: 'Action Media Production FZ LLC (AMP)',
  tagline: 'Transforming Complexity Into Cinematic Clarity',
  years: '15+',
} as const

export const NAV_LINKS = [
  // In-page anchors scroll to home sections (seamless, no page change).
  // About, Work, and Academy are true sub-pages (their own routes).
  { label: 'Home', to: '/#top' },
  { label: 'About', to: '/about' },
  { label: 'Work', to: '/work' },
  { label: 'Academy', to: '/academy' },
  { label: 'Contact', to: '/contact' },
] as const

/* ---------- 1. HERO ---------- */
export const HERO = {
  headline: 'Visuals that move decisions.',
  subheadline:
    'We transform complex government and industrial concepts into visual experiences.',
  // Primary = the #1 conversion (matches the header CTA); secondary = see the work.
  ctas: [
    { label: 'Start Your Project', to: '/contact', variant: 'primary' as const },
    { label: 'Explore Our Work', to: '/work', variant: 'outline' as const },
  ],
  posterImage: '/placeholders/hero.jpg', // swap for a real still; set videoSrc for a showreel
  videoSrc: '/video/hero-bg.mp4', // background showreel loop
}

/* ---------- 2. WHO WE ARE ---------- */
export const WHO_WE_ARE = {
  title: 'Complex, made clear',
  lead: 'Our work speaks for itself.',
  body: [
    'We are a specialized visual communication studio built for governments, industrial leaders, energy companies, airlines, infrastructure developers, and innovation-driven organizations.',
    'Our strength lies in simplifying highly technical, operational, and industrial subjects into emotionally engaging visual experiences that inspire awareness, confidence, investment, and strategic decision-making.',
  ],
  capabilitiesIntro: 'With a unique combination of:',
  capabilities: [
    'Cinematography Expertise',
    'Advanced 3D Animation Pipelines',
    'AI and Human Driven Production',
    'Industrial Sector Understanding',
    'In-House Production',
    'Fast Render Farm',
    'Technology-Focused Art Direction',
  ],
  closing:
    'AMP delivers world-class content designed for global audiences and executive-level presentations.',
}

/* ---------- 2b. ABOUT STORY ---------- */
export const ABOUT_STORY = {
  headline: 'We make complicated things easy to understand.',
  intro:
    'Action Media Productions (AMP) is a visual communication studio in Abu Dhabi. We work with the government, energy companies, and major industry and infrastructure.',
  clientsLabel: 'Clients since 2009',
  clients: ['ADNOC', 'Mubadala', 'Etihad'],
  awards: [
    { value: '7', label: 'Platinum MUSE Awards' },
    { value: 'Top 10', label: 'NYX Awards, worldwide' },
  ],
  paragraphs: [
    "Their work is hard to explain. It's technical, it runs deep, and the people who need to understand it rarely share the same background. We close that gap by building the work from scratch, turning complex subjects into visuals that make sense at a glance.",
    "That also lets us show what a camera can't reach: the inside of a working refinery, or a facility still on the drawing board. When filming is the right call, we shoot it. When it isn't, we build it.",
    'Understanding changes outcomes. When the work is clear, people are far more willing to trust it and back it.',
    "Behind it is a team of animators, filmmakers, and art directors who do their best work on the hardest briefs. They're led by people with decades in production, broadcasting, and film, here and abroad. That's why the work stays on brand, and stays with the people who see it.",
  ],
  bringIntro: 'What we bring to it',
  bring: [
    'Handcrafted 3D animation, built from scratch',
    'Filming and live production for corporate video',
    'Cinematic direction with real film training behind it',
    'Deep knowledge of how the industrial sector actually works',
    'High-performance rendering',
    'Art direction that understands the technology, not just the look',
  ],
}

/* ---------- 3. INDUSTRIES ---------- */
export type Industry = {
  name: string
  blurb: string
  items: string[]
  image: string
  /** Optional scroll-scrubbed video (scroll position drives playback). */
  video?: string
  /** Poster/first frame for the scroll video. */
  poster?: string
}

export const INDUSTRIES_TITLE = 'Specialized Expertise Across Critical Industries'

export const INDUSTRIES: Industry[] = [
  {
    name: 'Government & Culture',
    blurb: 'Communicating national visions and strategic initiatives through cinematic storytelling.',
    items: [
      'National transformation programs',
      'Public awareness campaigns',
      'Museums and cultural destinations',
      'Tourism storytelling',
      'Heritage preservation',
      'Vision presentations',
      'Smart city developments',
    ],
    image: '/placeholders/gov.jpg',
    video: '/video/government-scroll.mp4',
    poster: '/video/government-poster.jpg',
  },
  {
    name: 'Oil & Gas',
    blurb: 'Over 15 years of experience visualizing upstream, midstream, and downstream operations.',
    items: [
      'Offshore drilling',
      'Onshore operations',
      'Refineries',
      'Energy transition projects',
      'Gas processing',
      'Pipeline infrastructure',
      'Smart oilfield technologies',
      'Robowell systems',
      'AR360 technologies',
      'Industrial automation',
      'HSE awareness campaigns',
    ],
    image: '/placeholders/oilgas.jpg',
    video: '/video/oilgas-scroll.mp4',
    poster: '/video/oilgas-poster.jpg',
  },
  {
    name: 'Energy & Utilities',
    blurb: 'Helping governments and energy leaders communicate the future of energy.',
    items: [
      'Renewable energy',
      'Hydrogen projects',
      'Carbon capture',
      'Nuclear energy',
      'Smart grid systems',
      'Sustainability initiatives',
      'Utility infrastructure',
    ],
    image: '/placeholders/energy.jpg',
    video: '/video/energy-scroll.mp4',
    poster: '/video/energy-poster.jpg',
  },
  {
    name: 'Aviation & Airlines',
    blurb: 'High-end aviation storytelling and aircraft visualization.',
    items: [
      'Boeing fleet visualization',
      'Airbus fleet visualization',
      'Aircraft interiors and exteriors',
      'Passenger experience films',
      'Airport infrastructure',
      'Aviation innovation',
      'Airline corporate communication',
      'Safety and training visuals',
    ],
    image: '/placeholders/aviation.jpg',
    video: '/video/aviation-scroll.mp4',
    poster: '/video/aviation-poster.jpg',
  },
  {
    name: 'Heavy Industries',
    blurb: 'Transforming industrial operations into engaging cinematic content.',
    items: [
      'Dredging companies',
      'Maritime infrastructure',
      'Mega construction projects',
      'Ports and logistics',
      'Industrial manufacturing',
      'Mining operations',
      'Transportation infrastructure',
    ],
    image: '/placeholders/heavy.jpg',
    video: '/video/heavy-scroll.mp4',
    poster: '/video/heavy-poster.jpg',
  },
]

/* ---------- 3b. WHO WE SERVE (logo cloud) ----------
   Honest organisation-type wordmarks (no invented client names or logos). Each
   item can carry an image `src` later to swap a real client/partner logo in. */
export const LOGO_CLOUD = {
  heading: 'Our Partners',
  items: [
    { label: 'ADNOC', src: '/logos/adnoc.png' },
    { label: 'Mubadala', src: '/logos/mubadala.png' },
    { label: 'Masdar', src: '/logos/masdar.png' },
    { label: 'Etihad Airways', src: '/logos/etihad.png', size: 'max-h-24 max-w-[250px] md:max-h-[7rem]' },
    { label: 'Abu Dhabi Airports', src: '/logos/adairports.png' },
    { label: 'Abu Dhabi Water & Electricity Authority', src: '/logos/adwea.png' },
    { label: 'NMDC Group', src: '/logos/nmdc.png' },
    { label: 'TAZIZ', src: '/logos/taziz.png' },
    { label: 'Presight', src: '/logos/presight.png' },
    { label: 'Sky News Arabia', src: '/logos/skynews.png' },
  ] as { label: string; src?: string; size?: string }[],
}

/* ---------- 4. SERVICES ---------- */
export type Service = {
  name: string
  description: string
  capabilities: string[]
}

export const SERVICES_TITLE = 'Premium Visual Production Services'

export const SERVICES: Service[] = [
  {
    name: 'High-End 3D Animation',
    description:
      'Creating photorealistic industrial and cinematic animations that simplify complex systems and technologies.',
    capabilities: [
      'Industrial process visualization',
      'Technical simulation',
      'Photorealistic environments',
      'Engineering visualization',
      'Infrastructure flythroughs',
      'Aircraft visualization',
      'Energy systems animation',
      'Large-scale project presentations',
    ],
  },
  {
    name: 'AI Creative Production',
    description:
      'Advanced AI-powered visual production for next-generation communication experiences.',
    capabilities: [
      'AI cinematic production',
      'AI-generated environments',
      'AI-enhanced storytelling',
      'AI concept visualization',
      'AI-assisted creative workflows',
      'Future communication formats',
    ],
  },
  {
    name: 'Cinematic Film Production',
    description:
      'Executive-level films and visual storytelling for governments and industrial leaders.',
    capabilities: [
      'Corporate films',
      'Mega project films',
      'Brand documentaries',
      'Vision films',
      'Leadership communication',
      'Event opening films',
      'Investor presentations',
      'Broadcast campaigns',
    ],
  },
  {
    name: 'Presentation & Experience Design',
    description: 'Transforming executive presentations into immersive visual experiences.',
    capabilities: [
      'Large format screen content',
      'Immersive environments',
      'Executive presentations',
      'Command center visuals',
      'Event experiences',
      'Exhibition content',
      'Interactive storytelling',
    ],
  },
  {
    name: 'Virtual Production & Emerging Technologies',
    description:
      'Combining cinema and technology to create the next generation of visual communication.',
    capabilities: [
      'Virtual production',
      'Real-time rendering',
      'Unreal Engine environments',
      'Interactive visualization',
      'Immersive experiences',
      'AR and XR integration',
    ],
  },
]

/* ---------- 5. WHY AMP ---------- */
export type Pillar = {
  title: string
  body?: string
  items?: string[]
}

export const WHY_TITLE = 'Built for Complex Industries'

export const WHY_PILLARS: Pillar[] = [
  {
    title: 'Deep Industrial Understanding',
    body: 'Our experience across oil & gas, aviation, energy, and heavy industries allows us to understand the operational and technical realities behind every project. We speak the language of engineers, operators, executives, and government leaders.',
  },
  {
    title: 'In-House Production Infrastructure',
    body: 'AMP operates with a powerful in-house production ecosystem including:',
    items: [
      'Advanced rendering infrastructure',
      'Deep learning computer machines',
      'High-performance 3D pipelines',
      'Professional filming equipment',
      'Dedicated art department',
      'AI production capabilities',
      'Large-scale asset libraries',
    ],
  },
  {
    title: 'Extensive Industrial Asset Library',
    body: "Over 15 years of production has enabled AMP to build one of the region's strongest industrial visual asset libraries.",
    items: [
      'Offshore platforms',
      'Refineries',
      'Industrial facilities',
      'Aircraft models',
      'Infrastructure assets',
      'Heavy machinery',
      'Marine environments',
      'Smart technology systems',
    ],
  },
  {
    title: 'Artistic + Technical Excellence',
    body: 'Our team brings together cinema production, art, AI, and engineering. That mix lets AMP deliver visuals that are technically accurate and emotionally powerful.',
    items: [
      'Cinema production expertise',
      'Academic art backgrounds',
      'Technology-focused creators',
      'Industrial visualization specialists',
      'Creative directors',
      'AI artists',
      'Engineers and technical consultants',
    ],
  },
]

export const STATS = [
  { value: '15+', label: 'Years transforming complexity' },
  { value: '4', label: 'International hubs' },
  { value: '6', label: 'Critical industries served' },
  { value: '100%', label: 'In-house production ecosystem' },
]

/* ---------- 6. GLOBAL PRESENCE ---------- */
export type Office = {
  city: string
  country: string
  role: string
  email: string
  coord: string
  /** Office not open yet — show "Coming soon" instead of a contact email. */
  comingSoon?: boolean
  /** Optional background photo for the card. */
  image?: string
  /** object-position for the background photo (defaults to "50% 55%"). */
  imagePosition?: string
}

export const GLOBAL_INTRO = 'AMP operates across strategic regional and international hubs.'

export const OFFICES: Office[] = [
  {
    city: 'Abu Dhabi',
    country: 'UAE',
    role: 'Government communication, energy sector projects, and strategic industrial production.',
    email: 'ayman@actionmpro.com',
    coord: '24.45°N 54.37°E',
    image: '/placeholders/abu-dhabi.jpg',
    imagePosition: '50% 25%',
  },
  {
    city: 'Dubai',
    country: 'UAE',
    role: 'Creative production, commercial storytelling, innovation projects, and AI production.',
    email: 'ayman@actionmpro.com',
    coord: '25.20°N 55.27°E',
    image: '/placeholders/dubai.jpg',
    imagePosition: '50% 30%',
  },
  {
    city: 'Riyadh',
    country: 'Saudi Arabia',
    role: 'Vision-driven government projects, infrastructure storytelling, and mega development communication.',
    email: 'ayman@actionmpro.com',
    coord: '24.71°N 46.68°E',
    image: '/placeholders/saudi.jpg',
    imagePosition: '50% 35%',
  },
  {
    city: 'Barcelona',
    country: 'Spain',
    role: 'European creative collaboration, cinematic direction, design innovation, and artistic development.',
    email: 'ayman@actionmpro.com',
    coord: '41.39°N 2.17°E',
    image: '/placeholders/barcelona.jpg',
    imagePosition: '50% 45%',
  },
]

export const GENERAL_EMAILS = ['ayman@actionmpro.com']

/* ---------- 7. PHILOSOPHY ---------- */
export const PHILOSOPHY = {
  eyebrow: 'From Complexity to Clarity',
  title: 'Our Philosophy',
  lines: [
    'At AMP, we bring filmmaking and a real understanding of engineering together.',
    'We turn complex, technical subjects into cinematic work people can follow, and actually care about.',
  ],
  body: '',
}

/* ---------- 8. AMP ACADEMY ---------- */
export const ACADEMY = {
  wordmark: 'AMP Academy',
  question: 'How Have We Done It?',
  title: 'A Unique Learning Experience Built From Real Projects',
  intro: [
    'AMP Academy is an exclusive educational experience designed for creatives, filmmakers, 3D artists, AI creators, and visual storytellers who want to learn how world-class cinematic industrial content is actually produced.',
    'Unlike traditional educational programs, AMP Academy teaches directly from real productions and real industry projects developed by AMP over the last 15 years.',
  ],
  learnLead: 'Students will go behind the scenes of premium productions and learn:',
  learn: [
    'How cinematic industrial storytelling is developed',
    'How complex technologies are simplified visually',
    'How high-end 3D animation pipelines work',
    'How AI production integrates into filmmaking',
    'How government presentation films are produced',
    'How large-scale environments are built',
    'How visual direction impacts decision-making',
    'How to achieve a premium "wow factor" in storytelling',
  ],
  weekend: {
    title: 'Weekend Intensive Programs',
    subtitle: 'Learn Directly From Real Projects',
    lead: 'Every weekend, AMP Academy offers deep-dive masterclasses based on one selected AMP production.',
    days: ['Friday', 'Saturday', 'Sunday'],
    experienceLead: 'Participants will experience:',
    experience: [
      'Real production breakdowns',
      'Cinematic workflow demonstrations',
      'AI production techniques',
      'Advanced 3D animation pipelines',
      'Visual storytelling strategy',
      'Filming methodologies',
      'Lighting and rendering techniques',
      'Creative direction sessions',
      'Executive presentation design',
    ],
  },
  luxury: {
    title: 'Luxury Creative Experience',
    subtitle: 'Education Meets Inspiration',
    lead: 'To create a fully immersive experience, selected AMP Academy programs include:',
    perks: [
      '2 complimentary nights in a nearby 5-star hotel',
      'VIP networking sessions',
      'Industry guest speakers',
      'Private production tours',
      'Behind-the-scenes access',
      'Creative mentorship',
      'Exclusive workshop materials',
    ],
  },
  tracks: [
    {
      name: 'AI Cinematic Production',
      desc: 'Learn how AI is transforming filmmaking and visual communication.',
    },
    {
      name: 'Industrial 3D Animation',
      desc: 'Master cinematic industrial visualization and technical storytelling.',
    },
    {
      name: 'Government Presentation Films',
      desc: 'Learn how executive-level presentation films are developed for ministries, authorities, and national projects.',
    },
    {
      name: 'Cinematic Storytelling for Mega Projects',
      desc: 'Understand how to emotionally communicate infrastructure, culture, aviation, and energy projects.',
    },
    {
      name: 'Creative Direction & Art Department',
      desc: "Explore how AMP's art department builds world-class visual experiences.",
    },
  ],
}

/* ---------- ACADEMY COURSE SALES PAGES ----------
   One sales page per track, following a classic course-page anatomy:
   hero -> story + video -> description -> modules -> testimonials ->
   instructor -> pricing -> guarantee -> FAQ -> closing PS.

   Per-course copy below is real product content. The SHARED block holds
   content that is the same for every AMP Academy course; the testimonials,
   instructor photo, and exact pricing are PLACEHOLDERS to replace with real
   values before launch. */
export type Course = {
  name: string
  tagline: string
  image: string
  story: string[]
  description: string
  modules: { title: string; desc: string }[]
  /** Software/tools used across the course. */
  software: { name: string; use: string }[]
}

export const COURSES: Course[] = [
  {
    name: 'AI Cinematic Production',
    tagline: 'Learn how AI is transforming filmmaking and visual communication.',
    image: '/placeholders/hero.jpg',
    story: [
      'A few years ago, the work in this course took a full studio and weeks of render time. Today a small team that knows the tools can do it in days, without losing the cinematic feel. That shift is what this weekend is about.',
      'You sit with the producers who fold AI into real client work at AMP and learn where it genuinely helps, where it does not, and how to keep a premium, on-brand look the whole way through.',
    ],
    description:
      "A hands-on weekend inside AMP's AI production pipeline: how generative tools are used to plan, generate, and finish cinematic industrial work without it ever looking machine-made.",
    modules: [
      { title: 'The AI Production Pipeline', desc: 'How AI slots into a real cinematic workflow, end to end.' },
      { title: 'Generative Image & Video for Film', desc: 'Build usable frames and shots you can actually direct.' },
      { title: 'Blending AI With Real Footage', desc: 'Combine generated and filmed material so the seam disappears.' },
      { title: 'Directing AI for a Premium Look', desc: 'Hold the wow factor and stay on brand from first frame to last.' },
    ],
    software: [
      { name: 'Runway', use: 'Generative video' },
      { name: 'Midjourney', use: 'Concept & frames' },
      { name: 'ComfyUI', use: 'Custom AI pipelines' },
      { name: 'After Effects', use: 'Compositing' },
      { name: 'DaVinci Resolve', use: 'Grade & finish' },
      { name: 'Premiere Pro', use: 'Edit' },
    ],
  },
  {
    name: 'Industrial 3D Animation',
    tagline: 'Master cinematic industrial visualization and technical storytelling.',
    image: '/placeholders/oilgas.jpg',
    story: [
      'Most 3D work looks like 3D. The work that wins trust looks like it was filmed inside a facility that may not even exist yet. Closing that gap is a craft, and it is the one AMP has spent fifteen years refining.',
      'Over the weekend you rebuild a real AMP production from the ground up and see exactly how a technical subject becomes something an executive can grasp at a glance.',
    ],
    description:
      'Learn the full pipeline behind AMP\'s industrial visualization: reading technical reality, building believable environments, and rendering at a cinematic, high-end level.',
    modules: [
      { title: 'Reading Technical Reality', desc: 'Turn engineering drawings and site data into a visual plan.' },
      { title: 'Building Industrial Environments', desc: 'Model and dress facilities that feel real and lived-in.' },
      { title: 'The High-End Render Pipeline', desc: 'Lighting, materials, and the render-farm workflow behind the look.' },
      { title: 'Animation That Explains Systems', desc: 'Move the camera and the machinery so the idea reads instantly.' },
    ],
    software: [
      { name: 'Cinema 4D', use: 'Modelling & animation' },
      { name: 'Houdini', use: 'Simulations & FX' },
      { name: 'Redshift', use: 'Rendering' },
      { name: 'Substance 3D', use: 'Materials & texturing' },
      { name: 'After Effects', use: 'Compositing' },
      { name: 'Nuke', use: 'Finishing' },
    ],
  },
  {
    name: 'Government Presentation Films',
    tagline: 'How executive-level presentation films are developed for ministries, authorities, and national projects.',
    image: '/placeholders/gov.jpg',
    story: [
      'When a national vision is presented to leadership, the film in the room carries enormous weight. It has minutes to make something vast feel clear, credible, and worth backing.',
      'This course takes you inside how AMP builds those films: the brief, the restraint, and the cinematic decisions that make decision-makers lean in.',
    ],
    description:
      'A weekend on the discipline of executive presentation films, from the first ministry brief to a cut that turns a complex national initiative into a clear, confident story.',
    modules: [
      { title: 'The Executive Brief', desc: 'Understand what leadership actually needs to see and feel.' },
      { title: 'Visualizing National Vision', desc: 'Give scale and ambition a form people can follow.' },
      { title: 'Cinematic Presentation Design', desc: 'Pace, music, and restraint built for the boardroom.' },
      { title: 'Delivering for Ministries & Authorities', desc: 'Approvals, sensitivities, and a flawless final handover.' },
    ],
    software: [
      { name: 'Premiere Pro', use: 'Edit' },
      { name: 'After Effects', use: 'Motion & titles' },
      { name: 'DaVinci Resolve', use: 'Grade' },
      { name: 'Cinema 4D', use: '3D visuals' },
      { name: 'Photoshop', use: 'Design & retouch' },
      { name: 'Pro Tools', use: 'Sound design' },
    ],
  },
  {
    name: 'Cinematic Storytelling for Mega Projects',
    tagline: 'Emotionally communicate infrastructure, culture, aviation, and energy projects.',
    image: '/placeholders/heavy.jpg',
    story: [
      'A port, a power plant, a new district: on paper these are spreadsheets and schematics. On screen they can be the most ambitious stories a region is telling about its own future.',
      'You learn how AMP finds the human thread inside enormous, technical projects and films it so audiences actually care.',
    ],
    description:
      'Learn to turn infrastructure and industry into cinema: finding the human story, directing for scale and emotion, and carrying a mega project from brief to final cut.',
    modules: [
      { title: 'Finding the Human Story', desc: 'Locate the emotional thread inside a technical brief.' },
      { title: 'Scale, Emotion & Pace', desc: 'Direct camera, music, and edit so size becomes feeling.' },
      { title: 'Infrastructure as Cinema', desc: 'Make ports, grids, and districts feel cinematic and alive.' },
      { title: 'From Brief to Final Cut', desc: 'Run the full production journey on a real mega project.' },
    ],
    software: [
      { name: 'Premiere Pro', use: 'Edit' },
      { name: 'DaVinci Resolve', use: 'Grade & finish' },
      { name: 'After Effects', use: 'Motion graphics' },
      { name: 'Cinema 4D', use: '3D & environments' },
      { name: 'Pro Tools', use: 'Sound & score' },
      { name: 'Photoshop', use: 'Design' },
    ],
  },
  {
    name: 'Creative Direction & Art Department',
    tagline: "How AMP's art department builds world-class visual experiences.",
    image: '/placeholders/aviation.jpg',
    story: [
      'The difference between work that is merely correct and work that is unforgettable usually lives in the art department: the colour, the frame, the hundred deliberate choices behind a single look.',
      'This course opens up how AMP builds and holds a visual language across an entire production, even when the subject is deeply technical.',
    ],
    description:
      "A weekend inside AMP's art direction: developing a visual language, art-directing technical subjects, and running an art department that consistently delivers the wow factor.",
    modules: [
      { title: 'Building a Visual Language', desc: 'Set the look, colour, and rules a whole production follows.' },
      { title: 'Art Direction for Technical Subjects', desc: 'Make engineering beautiful without making it dishonest.' },
      { title: 'The Art Department Workflow', desc: 'How references, boards, and reviews keep quality high.' },
      { title: 'Achieving the Wow Factor', desc: 'The finishing decisions that make work impossible to ignore.' },
    ],
    software: [
      { name: 'Photoshop', use: 'Design & matte' },
      { name: 'Illustrator', use: 'Vector & layout' },
      { name: 'After Effects', use: 'Motion design' },
      { name: 'Cinema 4D', use: '3D art direction' },
      { name: 'Figma', use: 'Boards & systems' },
      { name: 'Nuke', use: 'Finishing' },
    ],
  },
]

export const COURSE_SHARED = {
  /* PLACEHOLDER testimonials — replace with real participant quotes before
     launch. Attributions are generic on purpose (no invented named people). */
  testimonials: [
    {
      quote:
        'I came in thinking I understood rendering. I left with the actual pipeline behind work I had admired for years.',
      name: 'AMP Academy participant',
      role: '3D Artist',
    },
    {
      quote:
        'The most useful three days of my career. Everything was drawn from real projects, none of it was theory.',
      name: 'AMP Academy participant',
      role: 'Filmmaker',
    },
    {
      quote:
        'Worth it for the production tour alone. The mentorship genuinely changed how I direct.',
      name: 'AMP Academy participant',
      role: 'Creative Director',
    },
  ],
  /* PLACEHOLDER instructor — swap the photo for a real team image. */
  instructor: {
    name: 'The AMP Senior Team',
    role: 'Directors, 3D leads, and AI producers',
    photo: '/team/ayman-ahmed.jpg',
    bio: "You learn from the directors, animators, and AI producers who built AMP's work for ADNOC, Etihad, Mubadala, and Masdar over the last fifteen years, and brought home seven Platinum MUSE Awards. Every method in the room comes from a real, delivered production.",
  },
  /* PLACEHOLDER pricing — set real figures, or keep "On request". */
  pricing: [
    {
      tier: 'Weekend Intensive',
      price: 'On request',
      note: 'Friday to Sunday',
      features: ['Three-day masterclass', 'Real production breakdowns', 'Workshop materials to keep'],
      highlighted: false,
    },
    {
      tier: 'Weekend + 5-Star Stay',
      price: 'On request',
      note: 'Most popular',
      features: [
        'Everything in Weekend Intensive',
        '2 nights in a nearby 5-star hotel',
        'VIP networking sessions',
        'Private production tour',
      ],
      highlighted: true,
    },
    {
      tier: 'Private Mentorship',
      price: 'On request',
      note: 'By arrangement',
      features: ['One-to-one with AMP leads', 'Tailored to your own project', 'Scheduled around you'],
      highlighted: false,
    },
  ],
  guarantee:
    "If your first day at AMP Academy doesn't change how you see cinematic production, tell us before day two and we'll arrange a full refund. No awkward conversation.",
  faq: [
    {
      q: 'Who is this for?',
      a: 'Filmmakers, 3D artists, AI creators, designers, and visual storytellers who want to work at a premium, cinematic level.',
    },
    {
      q: 'Do I need to be advanced?',
      a: 'No. We teach the methods from real projects, so motivated beginners and working professionals both get value.',
    },
    {
      q: 'Where does it take place?',
      a: 'At AMP in Abu Dhabi, with selected programs including a 5-star stay and private production tours.',
    },
    {
      q: 'What do I leave with?',
      a: 'The real workflow behind award-winning AMP productions, plus workshop materials you keep.',
    },
    {
      q: 'How do I reserve a seat?',
      a: 'Send an enquiry and our team will confirm dates, pricing, and availability for your chosen track.',
    },
  ],
  ps: 'P.S. Seats are deliberately limited each weekend so every participant gets real mentorship time with the AMP team. If the dates work for you, reserve early.',
}

/* ---------- 9. CLIENT EXPERIENCE ---------- */
export const CLIENTS = {
  title: 'Designed for Leaders, Governments, and Visionaries',
  lead: 'AMP works closely with:',
  list: [
    'Government entities',
    'Ministries',
    'National oil companies',
    'Energy leaders',
    'Airlines',
    'Infrastructure developers',
    'Industrial operators',
    'Smart city developers',
    'Cultural institutions',
    'Strategic communication teams',
  ],
  closing:
    'Our productions are designed to communicate at the highest executive and international levels.',
  // Trust signals, grounded entirely in the brief's own language (no invented clients/stats).
  trust: [
    'Fifteen years across national and industrial programs',
    'Films developed for ministries, authorities, and national projects',
    'Built to inform strategic, investment, and decision-making conversations',
  ],
}

/* ---------- 10. CALL TO ACTION ---------- */
export const CTA = {
  title: "Let's Create The Future of Visual Storytelling",
  body: 'Whether you are launching a national initiative, presenting a billion-dollar project, visualizing future technologies, or building awareness around complex operations, AMP helps you transform vision into cinematic impact.',
  // One primary conversion + one genuinely different path (academy). No duplicates.
  buttons: [
    { label: 'Start Your Project', to: '/contact', variant: 'primary' as const },
    { label: 'Join AMP Academy', to: '/academy', variant: 'ghost' as const },
  ],
}

/* ---------- FOOTER ---------- */
export const FOOTER = {
  nav: [
    'Home',
    'About AMP',
    'Work',
    'Technology',
    'AMP Academy',
    'Industries',
    'Careers',
    'Contact',
  ],
  offices: ['Abu Dhabi', 'Dubai', 'Riyadh', 'Barcelona'],
  emails: ['ayman@actionmpro.com'],
  statement: {
    lead: 'Action Media Production FZ LLC (AMP)',
    line: 'Creating cinematic visual experiences for governments, industries, and the future.',
    sub: '15+ years of transforming complexity into powerful storytelling.',
  },
}

/* ---------- POSITIONING (closing/meta) ---------- */
export const POSITIONING =
  'Action Media Production (AMP) is a cinematic industrial storytelling company specialized in transforming complex government, energy, aviation, infrastructure, and industrial ecosystems into powerful visual experiences through advanced filmmaking, AI production, and high-end 3D animation.'

/* ---------- SUBPAGE HERO COPY (next phase) ---------- */
export const PAGES = {
  about: {
    eyebrow: 'About AMP',
    title: 'A New Generation of Industrial Storytelling',
    intro:
      'A specialized visual communication studio built for governments, industrial leaders, energy companies, airlines, and innovation-driven organizations.',
  },
  work: {
    eyebrow: 'Selected Work',
    title: 'Complexity, Made Cinematic',
    intro:
      'Industrial and government storytelling at national scale, from offshore drilling platforms and refineries to national vision films and smart-city reveals.',
  },
  technology: {
    eyebrow: 'Technology & Innovation',
    title: 'Where Cinema Meets Engineering',
    intro:
      'An in-house production ecosystem combining advanced rendering, AI production, real-time pipelines, and a deep industrial asset library.',
  },
  academy: {
    eyebrow: 'AMP Academy',
    title: 'The Methods Behind Real Work',
    intro:
      'An exclusive learning experience that teaches world-class cinematic industrial production directly from real AMP projects.',
  },
  careers: {
    eyebrow: 'Careers',
    title: 'Build World-Class Visual Experiences',
    intro:
      'We bring together cinema, art, technology, and engineering. Join the team shaping how complex industries and national visions are seen.',
  },
  contact: {
    eyebrow: 'Contact & Consultation',
    title: "Let's Create Cinematic Impact",
    intro:
      'Reach our regional studios, or start a project brief with our team.',
  },
} as const
