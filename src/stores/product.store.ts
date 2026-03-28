import { api } from "@/services/axios";
import type { Product } from "@/types";
import { defineStore } from "pinia";

interface StateProduct {
  products: Product[]
}
const useProductStore = defineStore('product', {
  state: (): StateProduct => ({
    products: []
  }),
  actions: {
    async getProduct() {
      const { data } = await api.get<Product[]>('/product')
      this.products = data
    },
    async buyProduct(prod: Product) {
      try {
        const { data } = await api.post<{ init_point: string, url: string }>('/payment/checkout', { productId: prod.id })
        const { init_point, url } = data
        return (init_point ?? url)
      } catch (error) {
        console.error('Erro ao gerar pagamento', error)
      }
    },
    selectById(id:string){
      return this.products.find((p) => p.id === id)
    }
  }
})

export default useProductStore;
