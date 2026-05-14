// ============================================================
// FANTASY REALM — SITE CONFIGURATION
// Data profil, link, project cards, dan audio tracks
// Edit file ini untuk mengubah konten link tree kamu
// ============================================================

import type { SiteConfig, NavItem, AudioTrack } from '@/types';
import type { ProjectCardData } from '@/components/ui/ProjectCard';

// ─────────────────────────────────────────
// PROFIL
// ─────────────────────────────────────────
export const SITE_CONFIG: SiteConfig = {
  name: 'Akhmad Najib Alfaizi',
  tagline: 'Full-Stack Developer & Digital Sorcerer',
  description: 'Welcome to my digital realm — a gateway to all my creations, projects, and adventures in code.',
  url: 'https://alfaizi-linktree.vercel.app/',
  author: 'Akhmad Najib Alfaizi',
  socials: {
    github: 'https://github.com/Najebb',
    // twitter: 'https://twitter.com/yourusername',
    // linkedin: 'https://linkedin.com/in/yourusername',
  },
};

// ─────────────────────────────────────────
// LINK TREE ITEMS
// Daftar semua link yang ditampilkan
// ─────────────────────────────────────────
export const LINK_ITEMS: NavItem[] = [
  {
    label: '🗡️ Portfolio',
    href: 'https://yourportfolio.com',
    icon: 'portfolio',
    external: true,
  },
  {
    label: '🐙 Instagram',
    href: 'https://instagram.com/alfaizie_',
    icon: 'instagram',
    external: true,
  },
  {
    label: '💬 WhatsApp',
    href: 'https://wa.me/6285275281166', // Ganti dengan nomor asli Anda
    icon: 'whatsapp',
    external: true,
  },
  {
    label: '📧 Email',
    href: 'mailto:akhmadnajibalfaizi@gmail.com',
    icon: 'email',
    external: true,
  },
  {
    label: '🎮 Discord',
    href: 'https://discord.gg/qharnkEKx',
    icon: 'discord',
    external: true,
  },
];

// ─────────────────────────────────────────
// PROJECT CARDS
// Card-card project yang ditampilkan di LinksSection
// ─────────────────────────────────────────
export const PROJECT_CARDS: ProjectCardData[] = [
  {
    id: 'portfolio',
    title: 'Fantasy Portfolio',
    description: 'Immersive portfolio website dengan efek 3D, animasi cinematic, dan tema fantasy yang interaktif.',
    icon: '🗡️',
    techStack: ['Next.js', 'Three.js', 'Framer Motion', 'TypeScript'],
    url: 'https://yourportfolio.com',
    external: true,
    featured: true,
  },
  {
    id: 'github',
    title: 'Open Source Projects',
    description: 'Koleksi project open-source, kontribusi, dan eksperimen coding di GitHub.',
    icon: '🐙',
    techStack: ['React', 'Node.js', 'Python'],
    url: 'https://github.com/Najebb',
    external: true,
    featured: true,
  },
  {
    id: 'whatsapp',
    title: 'Direct Message',
    description: 'Hubungi saya langsung via WhatsApp untuk diskusi, tawaran kerja, atau sekadar menyapa.',
    icon: '💬',
    techStack: ['Chat', 'Fast Response'],
    url: 'https://wa.me/6285275281166', // Ganti dengan nomor asli Anda
    external: true,
  },
  {
    id: 'instagram',
    title: 'Visual Journey',
    description: 'Lihat keseharian, inspirasi, dan karya visual saya di Instagram.',
    icon: '📸',
    techStack: ['Social', 'Lifestyle', 'Design'],
    url: 'https://instagram.com/alfaizie_',
    external: true,
  },
  {
    id: 'discord',
    title: 'Community Hub',
    description: 'Bergabung di server Discord untuk diskusi, kolaborasi, dan berbagi ide.',
    icon: '🎮',
    techStack: ['Community', 'Chat'],
    url: 'https://discord.gg/qharnkEKx',
    external: true,
  },
  {
    id: 'email',
    title: 'Get in Touch',
    description: 'Ada ide kolaborasi atau pertanyaan? Kirim email langsung ke saya.',
    icon: '📧',
    url: 'mailto:akhmadnajibalfaizi@gmail.com',
    external: true,
  },
];

// ─────────────────────────────────────────
// AUDIO TRACKS
// File audio ditempatkan di /public/audio/
// ─────────────────────────────────────────
export const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: 'ambient-fantasy',
    src: '/audio/ambient-fantasy.mp3',
    loop: true,
    volume: 0.3,
    label: 'Fantasy Ambience',
  },
  {
    id: 'ambient-cyber',
    src: '/audio/ambient-cyber.mp3',
    loop: true,
    volume: 0.3,
    label: 'Cyber Ambience',
  },
  {
    id: 'ambient-void',
    src: '/audio/ambient-void.mp3',
    loop: true,
    volume: 0.25,
    label: 'Void Ambience',
  },
  {
    id: 'sfx-hover',
    src: '/audio/sfx-hover.mp3',
    loop: false,
    volume: 0.2,
    label: 'Hover SFX',
  },
  {
    id: 'sfx-click',
    src: '/audio/sfx-click.mp3',
    loop: false,
    volume: 0.3,
    label: 'Click SFX',
  },
  {
    id: 'sfx-transition',
    src: '/audio/sfx-transition.mp3',
    loop: false,
    volume: 0.25,
    label: 'Transition SFX',
  },
];
