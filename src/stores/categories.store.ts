import { api } from "@/services/axios";
import type { Category } from "@/types";
import { defineStore } from "pinia";

interface StateCategory {
  categories: Category[]
}
const useCategoriesStore = defineStore('categories', {
  state: (): StateCategory => ({
    categories: []
  }),
  getters: {
    selected: (state) => {
      const selectcategories = state.categories.find(c => c.select == true);
      return selectcategories;
    }
  },
  actions: {
    async getCategory() {
      const { data } = await api.get<Category[]>('/category')
      this.categories = data
    },
    selectCategory(category: Category) {
      this.categories.forEach(at => at.select = false);
      if (category.select) category.select = false;
      else category.select = true;
    }
  }
})

export default useCategoriesStore;
