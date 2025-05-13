import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
  state: () => ({
    projects: [],
  }),

  actions: {
    async getProjects() {
      try {
        const response = await fetch(`${apiUrl}projects`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
        if (response.ok) {
          this.projects = response.data
          return await response.json()
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
  },

  getters: {},
})
