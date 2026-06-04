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
  // Academy is the one true sub-page (its own route).
  { label: 'Home', to: '/#top' },
  { label: 'About', to: '/#about' },
  { label: 'Work', to: '/#industries' },
  { label: 'Services', to: '/#services' },
  { label: 'Academy', to: '/academy' },
  { label: 'Contact', to: '/#contact' },
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
    body: 'Our team combines cinema production expertise, academic art backgrounds, technology-focused creators, industrial visualization specialists, creative directors, AI artists, and engineers and technical consultants. This combination allows AMP to deliver visuals that are technically accurate while emotionally powerful.',
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
}

export const GLOBAL_INTRO = 'AMP operates across strategic regional and international hubs.'

export const OFFICES: Office[] = [
  {
    city: 'Abu Dhabi',
    country: 'UAE',
    role: 'Government communication, energy sector projects, and strategic industrial production.',
    email: 'ayman@actionmpro.com',
    coord: '24.45°N 54.37°E',
  },
  {
    city: 'Dubai',
    country: 'UAE',
    role: 'Creative production, commercial storytelling, innovation projects, and AI production.',
    email: 'dubai@actionmpro.com',
    coord: '25.20°N 55.27°E',
  },
  {
    city: 'Riyadh',
    country: 'Saudi Arabia',
    role: 'Vision-driven government projects, infrastructure storytelling, and mega development communication.',
    email: 'riyadh@actionmpro.com',
    coord: '24.71°N 46.68°E',
  },
  {
    city: 'Barcelona',
    country: 'Spain',
    role: 'European creative collaboration, cinematic direction, design innovation, and artistic development.',
    email: 'barcelona@actionmpro.com',
    coord: '41.39°N 2.17°E',
  },
]

export const GENERAL_EMAILS = [
  'hello@actionmpro.com',
  'projects@actionmpro.com',
  'academy@actionmpro.com',
  'careers@actionmpro.com',
]

/* ---------- 7. PHILOSOPHY ---------- */
export const PHILOSOPHY = {
  eyebrow: 'From Complexity to Clarity',
  title: 'Our Philosophy',
  lines: [
    'Every industrial system has a story.',
    'Every technology has a human impact.',
    'Every national vision deserves cinematic storytelling.',
  ],
  body: 'At AMP, we combine cinema, technology, engineering understanding, and AI-powered creativity to transform technical complexity into visual narratives that audiences can understand, remember, and emotionally connect with.',
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
    'Services',
    'Global Offices',
    'Careers',
    'Contact',
  ],
  offices: ['Abu Dhabi', 'Dubai', 'Riyadh', 'Barcelona'],
  emails: [
    'hello@actionmpro.com',
    'projects@actionmpro.com',
    'academy@actionmpro.com',
    'careers@actionmpro.com',
    'ayman@actionmpro.com',
    'dubai@actionmpro.com',
    'riyadh@actionmpro.com',
    'barcelona@actionmpro.com',
  ],
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
