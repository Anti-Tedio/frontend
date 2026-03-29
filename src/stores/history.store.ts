import i18n from "@/i18n";
import { api } from "@/services/axios";
import type { History } from "@/types";
import { defineStore } from "pinia";

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
            const lang = i18n.global.locale.value
            try {
                this.loading = true;
                this.historys = [];
                const { data } = await api.post<History[]>('/history', { lang });
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
