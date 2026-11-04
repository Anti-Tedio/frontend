import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { http, HttpResponse } from 'msw'
import useHistoryStore from '@/stores/history.store'
import { server } from '@/tests/msw/server'
import { API_URL } from '@/tests/msw/handlers'
import { historyFixture, ratingFixture } from '@/tests/fixtures/history'

describe('history.store com MSW', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('carrega o histórico recente pela API mockada', async () => {
    let requestBody: { lang?: string } | undefined

    server.use(
      http.post(`${API_URL}/history`, async ({ request }) => {
        requestBody = (await request.json()) as { lang?: string }

        return HttpResponse.json({
          history: historyFixture,
          nextCursor: 'next-page',
          rating: ratingFixture,
        })
      }),
    )

    const store = useHistoryStore()
    await store.getRecentHistory()

    expect(requestBody?.lang).toBeTruthy()
    expect(store.history).toEqual(historyFixture)
    expect(store.rating).toEqual(ratingFixture)
    expect(store.cursor).toBe('next-page')
    expect(store.loading).toBe(false)
  })
})
