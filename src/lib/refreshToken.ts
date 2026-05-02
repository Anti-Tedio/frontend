import { api } from "@/services/axios";
import { ref } from "vue";

// Singleton token reference that stays in sync with localStorage
export const token = ref<string | null>(localStorage.getItem('token'));

// Update token reference whenever localStorage changes
window.addEventListener('storage', (event) => {
  if (event.key === 'token') {
    token.value = event.newValue;
  }
});

export async function refreshToken() {
    try {
        const { data } = await api.post<{ accessToken: string }>('/refresh');
        if (!data.accessToken) {
            throw new Error('Invalid token response');
        }
        token.value = data.accessToken;
        localStorage.setItem('token', token.value);
        return data.accessToken;
    } catch (error) {
        console.error('Token refresh failed:', error);
        // Clear invalid token
        token.value = null;
        localStorage.removeItem('token');
        throw error;
    }
}