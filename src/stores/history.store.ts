import i18n from "@/i18n";
import { api } from "@/services/axios";
import type { History, Rating } from "@/types";
import { ref } from "vue";
import { defineStore } from "pinia";

const useHistoryStore = defineStore('history', () => {
    const locale = i18n.global.locale;
    const lang = typeof locale === 'string' ? locale : locale.value;

    const history = ref<History[]>([]);
    const rating = ref<Rating[]>([]);
    const loading = ref(false);
    const cursor = ref<string | null>(null);
    const cursorCategory = ref<string | null>(null);

    function processRating(incoming: Rating[] | null) {
        if (!incoming) return;
        if (!rating.value.length) rating.value = incoming
        rating.value.push(...incoming)
    }

    function addHistoryNoRepeat(newHistoryItems: History[]) {
        const existingIds = new Set(history.value.map(h => h.recommended.id));
        const uniqueNewItems = newHistoryItems.filter(h => !existingIds.has(h.recommended.id));
        history.value.push(...uniqueNewItems);
    }

    async function getRecentHistory() {
        try {
            loading.value = true;

            const { data } = await api.post<{
                history: History[];
                nextCursor: string;
                rating: Rating[] | null;
            }>('/history', { lang });

            history.value = data.history ?? [];
            rating.value = data.rating ?? [];
            cursor.value = data.nextCursor ?? null;
        } catch (error) {
            history.value = [];
            console.error('Erro ao buscar histórico:', error);
            throw error;
        } finally {
            loading.value = false;
        }
    }

    async function getMoreHistory() {
        if (!cursor.value) return;

        try {
            loading.value = true;

            const { data } = await api.post<{
                history: History[];
                nextCursor: string | null;
                rating: Rating[] | null;
            }>('/history/continue', { lang, cursor: cursor.value });

            cursor.value = data.nextCursor ?? null;
            addHistoryNoRepeat(data.history)
            processRating(data.rating);
        } catch (error) {
            cursor.value = null;
            console.error('Erro ao buscar mais histórico:', error);
            throw error;
        } finally {
            loading.value = false;
        }
    }

    async function getMoreHistoryByCategory(categoryId: number) {
        try {
            loading.value = true;

            const { data } = await api.post<{
                history: History[];
                nextCursor: string | null;
                rating: Rating[] | null;
            }>('/history/continue/category', {
                cursor: cursorCategory.value,
                lang,
                categoryId,
            });

            cursorCategory.value = data.nextCursor ?? null;

            if (!data.history.length) return;

            if (!history.value.length) history.value = data.history;

            addHistoryNoRepeat(data.history);
            processRating(data.rating);
        } catch (error) {
            cursorCategory.value = null;
            console.error('Erro ao buscar histórico por categoria:', error);
            throw error;
        } finally {
            loading.value = false;
        }
    }

    const saveRating = async (rating: Rating) => {
        try {
            await api.post('/rating', rating);
        } catch (error) {
            console.error('Erro ao avaliar:', error);
            throw error;
        }
    }

    return {
        history,
        rating,
        loading,
        cursor,
        cursorCategory,
        getRecentHistory,
        getMoreHistory,
        getMoreHistoryByCategory,
        saveRating,
    };
});

export default useHistoryStore;