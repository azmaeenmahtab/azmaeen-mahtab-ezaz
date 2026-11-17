import { FollowedPerson } from '@/lib/types'

export const followedPeople: FollowedPerson[] = [
  {
    id: 'caleb-porzio',
    name: 'Caleb Porzio',
    handle: '@calebporzio',
    platform: 'X',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Creator of Livewire and Alpine.js',
    endorsement: 'Proof that simple tools win. Half my stack exists because of him.',
    tags: ['Livewire', 'Alpine.js'],
    socialLinks: [
      { platform: 'x', url: 'https://x.com/calebporzio' },
      { platform: 'github', url: 'https://github.com/calebporzio' },
    ],
    followUrl: 'https://x.com/calebporzio',
  },
  {
    id: 'mohammad-emran',
    name: 'Mohammad Emran',
    handle: '@emran_hasan',
    platform: 'X',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'Building SaaS at klasio.co',
    endorsement: 'Masterclass in bootstrapping production software with incredible discipline.',
    tags: ['SaaS', 'FullStack'],
    socialLinks: [
      { platform: 'x', url: 'https://x.com' },
      { platform: 'github', url: 'https://github.com' },
    ],
    followUrl: 'https://x.com',
  },
  {
    id: 'aaron-francis',
    name: 'Aaron Francis',
    handle: '@aarondfrancis',
    platform: 'X',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'VP of Marketing & Community',
    endorsement: 'High leverage educator. His database & content craft is second to none.',
    tags: ['Databases', 'MySQL'],
    socialLinks: [
      { platform: 'x', url: 'https://x.com/aarondfrancis' },
      { platform: 'github', url: 'https://github.com/aarondfrancis' },
    ],
    followUrl: 'https://x.com/aarondfrancis',
  },
  {
    id: 'hm-nayem',
    name: 'HM Nayem',
    handle: '@hmnayem',
    platform: 'github',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    role: 'Founder of Stack Learner',
    endorsement: 'Pioneered modern web engineering education for millions in South Asia.',
    tags: ['JavaScript', 'Architecture'],
    socialLinks: [
      { platform: 'github', url: 'https://github.com' },
      { platform: 'x', url: 'https://x.com' },
    ],
    followUrl: 'https://github.com',
  },
]

