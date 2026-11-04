import { afterAll, afterEach, beforeAll } from 'vitest'

// O window exposto pelo Vitest em Node 26 herda o `localStorage` nativo
// indefinido do Node; o window do jsdom mantém a implementação correta.
const dom = (globalThis as { jsdom?: { window: Window } }).jsdom
const win = dom?.window

if (win?.localStorage) {
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: win.localStorage,
  })
  Object.defineProperty(globalThis, 'sessionStorage', {
    configurable: true,
    value: win.sessionStorage,
  })
}

// Importado depois de configurar o localStorage: o Node 26 expõe um
// `localStorage` nativo indefinido que quebra o import de `services/axios`.
const { server } = await import('./msw/server')

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
