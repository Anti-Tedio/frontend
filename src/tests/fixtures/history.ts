import type { History, Rating } from '@/types'

export const historyFixture: History[] = [
  {
    recommended: {
      id: '1',
      title: 'Test Recommendation',
      img: '',
      plot: 'Test plot',
      year: '2024',
      creator: 'Test Creator',
      rating: '8.0',
      categoryId: 1,
    },
    createdAt: '2026-01-01T00:00:00.000Z',
  },
]

export const ratingFixture: Rating[] = [{ value: 5, recommendedId: '1' }]
