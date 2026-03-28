import { api } from "@/services/axios";
import type { Person } from "@/types";
import { defineStore } from "pinia";

interface PersonState {
  persons: Person[]
  loading: boolean
}
const usePersonsStore = defineStore('persons', {
  state: (): PersonState => ({
    persons: [],
    loading: false
  }),
  getters: {
    selected: (state) => {
      const selectPerson = state.persons.filter(p => p.isActive === true);
      return selectPerson;
    }
  },
  actions: {
    async getPersons() {
      try {
        this.loading = true
        
        const { data } = await api.get<Person[]>('/person');

        try {
          await this.getUserPerson();
          
          if (this.persons.length > 0) {
            const idsExistentes = new Set(this.persons.map(p => p.id));
            
            const newPersons = data.filter(p => !idsExistentes.has(p.id));
            
            this.persons = [...this.persons, ...newPersons]
          }
        } catch {
          console.error('User Persons not find, loading all')
          this.persons = data
        }
      } catch (error) {
        console.error('Error Persons:', error)
        throw error
      } finally {
        this.loading = false
      }
    },
    async getUserPerson() {
      const { data } = await api.get<Person[]>('/user-person')
      this.persons = data;
    },
    selectPerson(person: Person) {
      if (person.isActive) person.isActive = false;
      else {
        if (this.selected.length >= 8) console.warn('Você não pode selecionar mais que 8 personalidades')
        else person.isActive = true;
      }
    },
    async savePersons() {
      const personsId = this.selected.map(({ id }) => ({ id }))

      try {
        this.loading = true;

        await api.post('/user-person', { persons: personsId })

      } catch (error) {

        console.error('Error Save Person:', error)
        throw error

      } finally {
        this.loading = false
      }
    }
  }
})

export default usePersonsStore;
