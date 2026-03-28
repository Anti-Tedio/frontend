import { api } from "@/services/axios";
import { ref } from "vue";

export const token = ref<string | null>(localStorage.getItem('token'));

export async function refreshToken() {
    const { data } = await api.post<{ accessToken: string }>('/refresh');
    token.value = data.accessToken
    localStorage.setItem('token', token.value);
    return data.accessToken;
}