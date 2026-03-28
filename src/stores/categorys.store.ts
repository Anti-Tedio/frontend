import { api } from "@/services/axios";
import type { Category } from "@/types";
import { defineStore } from "pinia";

interface StateCategory {
  categorys: Category[]
}
const useCategorysStore = defineStore('categorys', {
  state: (): StateCategory => ({
    categorys: []
  }),
  getters: {
    selected: (state) => {
      const selectCategorys = state.categorys.find(c => c.select == true);
      return selectCategorys;
    }
  },
  actions: {
    async getCategory() {
      const { data } = await api.get<Category[]>('/category')
      this.categorys = data
    },
    selectCategory(category: Category) {
      this.categorys.forEach(at => at.select = false);
      if (category.select) category.select = false;
      else category.select = true;
    }
  }
})

export default useCategorysStore;
