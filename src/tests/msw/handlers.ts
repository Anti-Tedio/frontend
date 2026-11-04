import { http, HttpResponse } from 'msw'
import type { Category, History, Person, Product, Rating, Suggestion, User } from '@/types'
import type { SuggestMidia, SuggestVideoGame } from '@/types/suggest'

// Keep in sync with the baseURL in src/services/axios.ts
export const API_URL = 'https://api.antitedio.com.br'

const userFixture: User = {
  name: 'Test User',
  email: 'test@example.com',
  credits: 10,
  avatarUrl: '',
}

const emptyHistory = {
  history: [] as History[],
  nextCursor: null as string | null,
  rating: null as Rating[] | null,
}

const midiaFixture: SuggestMidia = {
  id: 'media-1',
  title: 'Test Movie',
  img: '',
  plot: 'Test plot',
  year: '2024',
  creator: 'Test Creator',
  rating: '8.0',
  categoryId: 1,
  genres: ['Drama'],
  platforms: ['Test Platform'],
}

const bookFixture: Suggestion = {
  id: 'book-1',
  title: 'Test Book',
  img: '',
  plot: 'Test plot',
  year: '2024',
  creator: 'Test Author',
  rating: '8.5',
  categoryId: 5,
  genres: ['Fiction'],
  link: 'https://example.com/book',
}

const videoGameFixture: SuggestVideoGame = {
  id: 'game-1',
  title: 'Test Game',
  img: '',
  plot: 'Test plot',
  year: '2024',
  creator: 'Test Studio',
  rating: '9.0',
  categoryId: 6,
  genres: ['Action'],
  price: {
    store: 'Steam',
    price: 99.9,
    idSteam: 123,
  },
}

export const handlers = [
  // Catalog
  http.get(`${API_URL}/category`, () => HttpResponse.json([] as Category[])),
  http.get(`${API_URL}/product`, () => HttpResponse.json([] as Product[])),
  http.get(`${API_URL}/person`, () => HttpResponse.json([] as Person[])),
  http.get(`${API_URL}/user-person`, () => HttpResponse.json([] as Person[])),
  http.post(`${API_URL}/user-person`, () => HttpResponse.json({})),

  // User
  http.get(`${API_URL}/user`, () => HttpResponse.json(userFixture)),
  http.patch(`${API_URL}/user/avatar`, () =>
    HttpResponse.json({ avatarUrl: 'https://example.com/avatar.png' }),
  ),

  // Auth
  http.post(`${API_URL}/refresh`, () => HttpResponse.json({ accessToken: 'test-access-token' })),
  http.post(`${API_URL}/auth/login`, () => HttpResponse.json({ ...userFixture, login: true })),
  http.post(`${API_URL}/auth/register`, () =>
    HttpResponse.json({ ...userFixture, register: true }),
  ),
  http.post(`${API_URL}/auth/logout`, () => HttpResponse.json({})),
  http.post(`${API_URL}/auth/reset-password/request`, () => HttpResponse.json({})),
  http.post(`${API_URL}/auth/reset-password`, () => HttpResponse.json({})),
  http.post(`${API_URL}/auth/change-password`, () => HttpResponse.json({})),
  http.post(`${API_URL}/auth/verify`, () => HttpResponse.json({})),
  http.post(`${API_URL}/auth/delete-account`, () => HttpResponse.json({})),
  http.post(`${API_URL}/auth/recovery-account`, () => HttpResponse.json({})),

  // History and rating
  http.post(`${API_URL}/history`, () => HttpResponse.json(emptyHistory)),
  http.post(`${API_URL}/history/continue`, () => HttpResponse.json(emptyHistory)),
  http.post(`${API_URL}/history/continue/category`, () => HttpResponse.json(emptyHistory)),
  http.post(`${API_URL}/rating`, () => HttpResponse.json({})),

  // Suggestions
  http.post(`${API_URL}/ai/midia`, () => HttpResponse.json(midiaFixture)),
  http.post(`${API_URL}/ai/book`, () => HttpResponse.json(bookFixture)),
  http.post(`${API_URL}/ai/video-game`, () => HttpResponse.json(videoGameFixture)),

  // Contact and payment
  http.post(`${API_URL}/contact`, () => HttpResponse.json({ ok: true })),
  http.post(`${API_URL}/payment/checkout`, () =>
    HttpResponse.json({ init_point: 'https://example.com/checkout' }),
  ),
]
