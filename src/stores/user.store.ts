import router from "@/router/routes";
import { api } from "@/services/axios";
import type { Login, Register, User } from "@/types";
import type { ContactForm } from "@/views/ContectView.vue";
import { defineStore } from "pinia";

interface UserLogin extends User {
  login: boolean
}

interface UserRegister extends User {
  register: boolean
}

const useUserStore = defineStore('user', {
  state: () => ({
    popUpLogin: false,
    buyCredits: false,
    name: '',
    email: '',
    credits: 0,
    avatarUrl: '',
    loading: false,
  }),
  actions: {
    toogleLogin() {
      this.popUpLogin = !this.popUpLogin
    },
    async getUser() {
      try {
        const { data } = await api.get<User>('/user');

        this.$patch(data)

      } catch (error) {
        console.error('Error User:', error);
        throw error
      }
    },
    async login(user: Login) {
      try {
        this.loading = true
        const { data } = await api.post<UserLogin>('/auth/login', user);

        if (data.login) {
          window.location.reload()
        }
      } catch (error) {
        console.error('Error Login:', error);
        throw error
      } finally {
        this.loading = false
      }
    },
    async register(user: Register) {
      const { email, name, password } = user

      try {
        const { data } = await api.post<UserRegister>('/auth/register', { email, password, name })
        this.$patch(data)
        this.popUpLogin = false
      } catch (error) {
        console.error('Error Register:', error);
        throw error
      } finally {
        localStorage.setItem('email', email)
        this.loading = false
        this.popUpLogin = false
      }
    },
    async loginProvider(provider: string) {
      provider.trim().toLowerCase();
      window.location.href = `https://api.antitedio.com.br/auth/${provider}`
    },
    async logout() {
      try {
        await api.post('/auth/logout');
        this.$reset();
        localStorage.removeItem('token')
      } catch (error) {
        console.error('Error Register:', error);
        throw error
      } finally {
        window.location.reload();
      }
    },
    async editAvatar(newImg: File) {
      try {
        const { data } = await api.patch<{ avatarUrl: string }>('/user/avatar', { avatar: newImg }, { headers: { 'Content-Type': 'multipart/form-data' } })

        if (!data.avatarUrl) throw new Error('Erro ao enviar imagem.')

        this.avatarUrl = data.avatarUrl

      } catch (e: any) {
        console.error('Erro na hora de enviar imagem', e)
        throw e
      }
    },
    async reqResetPassword(email: string) {
      try {
        await api.post('auth/reset-password/request', { email });
      } catch (e) {
        console.error('Erro ao enviar o pedido de reset password')
      }
    },
    async resetPassword(userId: string, password: string, token: string) {
      try {
        await api.post('/auth/reset-password', { password, token, userId })
      } catch (e) {
        console.error('Error ao resetar senha')
        throw e
      }
    },
    async changePassword(password: string) {
      try {
        await api.post('/auth/change-password', { newPassword: password })
      } catch (e) {
        console.error('Error ao resetar senha')
        throw e
      }
    },
    async verifyEmail(code: string, email: string) {
      try {
        await api.post('/auth/verify', { code, email })
      } catch (e) {
        console.error('Error Register:', e);
        throw e
      }
    },
    async deleteAccount() {
      try {
        await api.post('/auth/delete-account')
      } catch (e) {
        throw e
      }
    },
    async recoveryAccount(userId: string, token: string) {
      try {
        await api.post('/auth/recovery-account', { userId, token })
      } catch (e) {
        throw e
      }
    },
    async contact(form: ContactForm) {
      try {
        const res = await api.post('/contact', { ...form })
        return res;
      } catch (e) {
        throw e
      }
    }
  },
  persist: {
    storage: localStorage,
    pick: ['name', 'email', 'credits']
  }
})

export default useUserStore;
