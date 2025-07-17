
import type { User } from '@/contexts/auth-context';

export const allUsers: User[] = [
  {
    uid: 'admin-001',
    displayName: 'Kenji Tanaka',
    email: 'kenji.tanaka@example.com',
    photoURL: 'https://placehold.co/100x100/E2D0B8/443322?text=KT',
    role: 'admin',
  },
  {
    uid: 'learner-001',
    displayName: 'Yuki Sato',
    email: 'yuki.sato@example.com',
    photoURL: 'https://placehold.co/100x100/B8E2D0/224433?text=YS',
    role: 'learner',
  },
  {
    uid: 'learner-002',
    displayName: 'Haru Ito',
    email: 'haru.ito@example.com',
    photoURL: 'https://placehold.co/100x100/D0B8E2/332244?text=HI',
    role: 'learner',
  },
  {
    uid: 'learner-003',
    displayName: 'Mei Watanabe',
    email: 'mei.watanabe@example.com',
    photoURL: 'https://placehold.co/100x100/E2B8B8/442222?text=MW',
    role: 'learner',
  },
  {
    uid: 'learner-004',
    displayName: 'Ren Yamamoto',
    email: 'ren.yamamoto@example.com',
    photoURL: 'https://placehold.co/100x100/B8D0E2/223344?text=RY',
    role: 'learner',
  },
  {
    uid: 'learner-005',
    displayName: 'Sora Takahashi',
    email: 'sora.takahashi@example.com',
    photoURL: 'https://placehold.co/100x100/E2E2B8/444422?text=ST',
    role: 'learner',
  },
];
