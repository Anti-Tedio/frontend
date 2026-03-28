import { api } from "@/services/axios";
import type { History } from "@/types";
import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";

interface StateHistory {
    historys: History[];
    loading: boolean;
}

const useHistoryStore = defineStore('history', {
    state: (): StateHistory => ({
        historys: [],
        loading: false
    }),
    actions: {
        async getHistory() {
            const { locale } = useI18n();
            try {
                this.loading = true;
                this.historys = [];
                const { data } = await api.post<History[]>('/history', { lang: locale.value });
                this.historys = data;

            } catch (error) {
                console.error('Erro ao buscar histórico:', error);
                this.historys = [];
                throw error;
            } finally {
                this.loading = false;
            }
        },
    }
})

export default useHistoryStore;
