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
