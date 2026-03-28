import { ref } from "vue";
import { defineStore } from "pinia";
import { api } from "@/services/axios";
import type { AxiosProgressEvent } from "axios";
import type { SuggestMidia, SuggestVideoGame } from "@/types/suggest";
import useCategorysStore from "./categorys.store";
import type { Suggestion } from "@/types";
import i18n from "@/i18n";


const useSuggestStore = defineStore('suggest', () => {
    const categoryStore = useCategorysStore();

    const locale = i18n.global.locale;
    
    const lang = typeof locale === 'string' ? locale : locale.value;

    const suggestMidia = ref<SuggestMidia | null>(null);
    const suggestVideoGame = ref<SuggestVideoGame | null>(null);
    const suggestBook = ref<Suggestion | null>(null);
    const price = ref(0);
    const progress = ref(0);
    const loading = ref(false)

    const executeRequest = async <T>(url: string, payload: object = {}, transform?: (data: any) => T): Promise<T> => {
        progress.value = 0;
        const { data } = await api.post(url, payload, {
            onDownloadProgress: (p: AxiosProgressEvent) => {
                if (p.total) progress.value = Math.round((p.loaded * 30) / p.total);
            },
            onUploadProgress: (p: AxiosProgressEvent) => {
                if (p.total) progress.value = Math.round((p.loaded * 70) / p.total);
            }
        });
        return transform ? transform(data) : data;
    };

    async function fetchMidia(categoryId: number) {
        const data = await executeRequest<SuggestMidia>('/ai/midia', { categoryId, lang });
        suggestMidia.value = data;
    }

    async function fetchVideoGame() {
        const data = await executeRequest<SuggestVideoGame>(
            '/ai/video-game',
            { maxPrice: price.value, lang },
        );
        suggestVideoGame.value = data;
    }

    async function fetchBook() {
        const data = await executeRequest<Suggestion>('/ai/book', { lang });
        suggestBook.value = data;
    }

    async function getRecommendation() {
        const selected = categoryStore.selected;

        if (!selected) return;

        suggestBook.value = null;
        suggestMidia.value = null;
        suggestVideoGame.value = null;

        const actions: Record<string, () => Promise<void>> = {
            movie: () => fetchMidia(selected.id),
            series: () => fetchMidia(selected.id),
            anime: () => fetchMidia(selected.id),
            cartoon: () => fetchMidia(selected.id),
            book: () => fetchBook(),
            'video game': () => fetchVideoGame(),
        };

        const execute = actions[selected.title['en']!.toLowerCase()];

        if (execute) {
            await execute();
        }
    }

    return {
        suggestMidia,
        suggestVideoGame,
        suggestBook,
        progress,
        price,
        fetchMidia,
        fetchVideoGame,
        fetchBook,
        getRecommendation,
        loading
    };
});
export default useSuggestStore;