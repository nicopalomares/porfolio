import { getProjects } from '@/api/api'
import { defineStore } from 'pinia'

const apiUrl = import.meta.env.VITE_API_URL

export const useDataStore = defineStore('data', {
  state: () => ({
    projects: [],
  }),
  persist: true,

  actions: {
    async fetchProjects() {
      const { data } = await getProjects()
      this.projects = data
    },
    fetchProjectById(id) {
      return this.projects.find((p) => p.id === parseInt(id))
    },
  },

  getters: {},
})
