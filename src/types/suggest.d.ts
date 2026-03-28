import type { Suggestion } from "."

export interface SuggestMidia extends Suggestion {
    platforms: string[]
}

export interface SuggestVideoGame extends Suggestion{
    price: {
        store: string,
        price: number,
        idSteam: number,
    },
}

export {}