import editorialImage from '@/assets/images/banners/featured-banner.png'
import habitsImage from '@/assets/images/banners/new-arrival-banner.png'
import cultureImage from '@/assets/images/banners/bestseller-banner.png'
import businessImage from '@/assets/images/Business Books.png'
import programmingImage from '@/assets/images/Programming Books.png'
import horrorImage from '@/assets/images/Horror Books.jpg'
import romanceImage from '@/assets/images/Romance Books.png'
import mysteryImage from '@/assets/images/Mystery Books.jpg'
import midnightLibraryImage from '@/assets/images/History1.jpg'

/* ------------------------------------------------------------------ */
/*  Blog post data                                                     */
/*                                                                     */
/*  THIS FILE IS THE SINGLE SOURCE OF TRUTH for every blog post on the */
/*  site: the Blog (/blog) listing grid, the featured banner, and the  */
/*  /blog/:slug detail pages all read from this same data.             */
/*                                                                     */
/*  Each post provides:                                                */
/*   - id:       unique identifier (used as React key)                 */
/*   - title:    display title                                         */
/*   - slug:     URL segment used for routing: `/blog/{slug}`          */
/*   - category: one of `blogCategories`                              */
/*   - excerpt:  short summary shown on cards                          */
/*   - content:  array of paragraphs rendered on the detail page       */
/*   - image:    cover image for the card / banner                     */
/*   - author / authorAvatar / date / readTime: post meta              */
/*                                                                     */
/*  To add a post later, just append another entry here — no JSX edits */
/*  needed. All sections map over this array.                          */
/*                                                                     */
/*  Kept as plain placeholder objects so this can later be swapped     */
/*  for a real CMS / API without touching the Blog UI.                 */
/* ------------------------------------------------------------------ */

export const blogCategories = [
  'All',
  'Book Reviews',
  'Author Spotlights',
  'Reading Lists',
  'Behind the Shelf',
  'Recommendations',
]

/* The single post featured at the top of the Blog page. */
export const featuredPost = {
  id: 'featured',
  title: '5 Cozy Reads for Monsoon Season',
  slug: '5-cozy-reads-for-monsoon-season',
  category: 'Reading Lists',
  excerpt:
    'Stormy evenings call for warm blankets, hot chai, and stories that wrap around you. Here are the five books we keep reaching for when the rain starts to fall.',
  image: editorialImage,
  author: 'Elena Marsh',
  authorAvatar: 'https://i.pravatar.cc/80?img=47',
  date: 'Aug 12, 2026',
  readTime: '6 min read',
  content: [
    'Stormy evenings call for warm blankets, hot chai, and stories that wrap around you. Here are the five books we keep reaching for when the rain starts to fall.',
    'From gentle romances to immersive mysteries, each title on this list rewards a slow, unhurried reading pace — the perfect companion to a long weekend of downpours.',
    'We have ordered them from coziest to most atmospheric, so you can start with the warmest blanket and work your way toward the stormy windowsill.',
  ],
}

/* The full archive of posts shown in the grid below the featured banner. */
export const blogPosts = [
  {
    id: 1,
    title: 'Author Spotlight: Meet Our Featured Writer',
    slug: 'author-spotlight-meet-our-featured-writer',
    category: 'Author Spotlights',
    excerpt:
      'We sat down with one of our most-requested local novelists to talk about inspiration, rituals, and the story behind their latest release.',
    image: habitsImage,
    author: 'Priya Nair',
    authorAvatar: 'https://i.pravatar.cc/80?img=32',
    date: 'Aug 10, 2026',
    content: [
      'We sat down with one of our most-requested local novelists to talk about inspiration, rituals, and the story behind their latest release.',
      'Across the conversation, what came through again and again was a deep respect for the reader — the belief that a book is a pact between writer and reader, and that the story should honour both.',
    ],
  },
  {
    id: 2,
    title: 'How to Build a Reading Habit That Sticks',
    slug: 'how-to-build-a-reading-habit-that-sticks',
    category: 'Recommendations',
    excerpt:
      'Forget ambitious goals. Building a habit that lasts is about small, repeatable rituals — and giving yourself permission to stop.',
    image: businessImage,
    author: 'Daniel Osei',
    authorAvatar: 'https://i.pravatar.cc/80?img=12',
    date: 'Aug 07, 2026',
    content: [
      'Forget ambitious goals. Building a habit that lasts is about small, repeatable rituals — and giving yourself permission to stop.',
      'Five pages a day beats fifty pages once a month. Consistency, not intensity, is what turns reading from a chore into a reflex.',
    ],
  },
  {
    id: 3,
    title: 'The Books Every Aspiring Developer Should Read',
    slug: 'the-books-every-aspiring-developer-should-read',
    category: 'Book Reviews',
    excerpt:
      'From foundational theory to practical craft, these titles have earned a permanent place on our programming shelf.',
    image: programmingImage,
    author: 'Tom Alvarez',
    authorAvatar: 'https://i.pravatar.cc/80?img=56',
    date: 'Aug 04, 2026',
    content: [
      'From foundational theory to practical craft, these titles have earned a permanent place on our programming shelf.',
      'Whether you are just starting out or returning to the fundamentals, each of these books pays for itself the first time it saves you a week of trial and error.',
    ],
  },
  {
    id: 4,
    title: 'A Shelf Tour: Behind the Mystery Section',
    slug: 'a-shelf-tour-behind-the-mystery-section',
    category: 'Behind the Shelf',
    excerpt:
      'Come behind the counter as we reorganise our mystery corner and share the underrated gems we keep in stock.',
    image: mysteryImage,
    author: 'Elena Marsh',
    authorAvatar: 'https://i.pravatar.cc/80?img=47',
    date: 'Aug 01, 2026',
    content: [
      'Come behind the counter as we reorganise our mystery corner and share the underrated gems we keep in stock.',
      'The best part of stocktaking always surfaces the forgotten favourites — the ones we sell out of quietly, then remember to recommend out loud.',
    ],
  },
  {
    id: 5,
    title: 'Why We Keep Returning to Bookstores',
    slug: 'why-we-keep-returning-to-bookstores',
    category: 'Behind the Shelf',
    excerpt:
      'The ritual of browsing shelves still shapes how we discover our next favorite story — and why that matters more than ever.',
    image: cultureImage,
    author: 'Daniel Osei',
    authorAvatar: 'https://i.pravatar.cc/80?img=12',
    date: 'Jul 28, 2026',
    content: [
      'The ritual of browsing shelves still shapes how we discover our next favorite story — and why that matters more than ever.',
      'An algorithm predicts; a shelf surprises. That small, unpredictable joy of stumbling onto a cover you had never considered is the whole reason we keep the lights on.',
    ],
  },
  {
    id: 6,
    title: 'Five Page-Turners for a Rainy Weekend',
    slug: 'five-page-turners-for-a-rainy-weekend',
    category: 'Reading Lists',
    excerpt:
      'A quick-fire list of fast, propulsive reads that will carry you through a long weekend without ever feeling like a chore.',
    image: horrorImage,
    author: 'Priya Nair',
    authorAvatar: 'https://i.pravatar.cc/80?img=32',
    date: 'Jul 25, 2026',
    content: [
      'A quick-fire list of fast, propulsive reads that will carry you through a long weekend without ever feeling like a chore.',
      'Short chapters, rising stakes and a last-page payoff — these are the books that disappear into your bag on Friday and come back finished on Monday.',
    ],
  },
  {
    id: 7,
    title: 'What Makes a Book Feel Unforgettable?',
    slug: 'what-makes-a-book-feel-unforgettable',
    category: 'Book Reviews',
    excerpt:
      'A closer look at atmosphere, voice, and emotional pacing in modern fiction — and the craft that makes a story stick.',
    image: editorialImage,
    author: 'Tom Alvarez',
    authorAvatar: 'https://i.pravatar.cc/80?img=56',
    date: 'Jul 21, 2026',
    content: [
      'A closer look at atmosphere, voice, and emotional pacing in modern fiction — and the craft that makes a story stick.',
      'The books that linger are rarely the loudest. They are the quiet ones that earn a place in your daydreams long after the final page.',
    ],
  },
  {
    id: 8,
    title: 'Romance Reads That Balance Heart and Humour',
    slug: 'romance-reads-that-balance-heart-and-humour',
    category: 'Recommendations',
    excerpt:
      'The best love stories make you laugh as often as they make you swoon. Here are the ones doing it best right now.',
    image: romanceImage,
    author: 'Elena Marsh',
    authorAvatar: 'https://i.pravatar.cc/80?img=47',
    date: 'Jul 18, 2026',
    content: [
      'The best love stories make you laugh as often as they make you swoon. Here are the ones doing it best right now.',
      'Wit is the secret ingredient of the great romance — the quick back-and-forth that makes two people feel alive on the page together.',
    ],
  },
  {
    id: 9,
    title: '5 Slow-Reading Rituals for Busy Weeknights',
    slug: '5-slow-reading-rituals-for-busy-weeknights',
    category: 'Reading Lists',
    excerpt:
      'Simple ways to build a more grounded, intentional reading routine — even when your calendar is already full.',
    image: habitsImage,
    author: 'Priya Nair',
    authorAvatar: 'https://i.pravatar.cc/80?img=32',
    date: 'Jul 15, 2026',
    content: [
      'Simple ways to build a more grounded, intentional reading routine — even when your calendar is already full.',
      'Make a ritual of it: a fixed chair, a cup of tea, a phone in another room. Fifteen unhurried minutes beats an hour of distracted page-turning.',
    ],
  },
  {
    id: 10,
    title: 'The Midnight Library: A Review',
    slug: 'the-midnight-library',
    category: 'Book Reviews',
    excerpt:
      'Between life and death there is a library, and within that library the shelves go on forever. This month we are enchanted by Matt Haig’s tender fable about second chances.',
    image: midnightLibraryImage,
    author: 'Elena Marsh',
    authorAvatar: 'https://i.pravatar.cc/80?img=47',
    date: 'Aug 14, 2026',
    readTime: '5 min read',
    content: [
      'Between life and death there is a library, and within that library the shelves go on forever. This month we are enchanted by Matt Haig’s tender fable about second chances.',
      'Nora Seed finds herself in the Midnight Library, a liminal place where every book on the shelf contains a life she could have lived. As she slips from one possibility to the next, she is forced to confront the quiet question at the heart of the story: is regret the same thing as a life gone wrong?',
      'Haig writes with a lightness that never flattens the emotional weight. The chapters are short, the ideas generous, and the central metaphor — that every life contains multitudes — lands with real warmth.',
      'For readers who loved the philosophical tenderness of The Alchemist or the quiet hope of A Man Called Ove, The Midnight Library is a book that asks you to sit with your own choices and, gently, to forgive them. It earns its place on the shelf and in the heart.',
    ],
  },
]

/* Backward-compatible export used by the ReadingJournal home section. */
export const readingJournal = blogPosts
