import { getProjects } from '@/api/api'
import { defineStore } from 'pinia'
// const { t } = useI18n()
const apiUrl = import.meta.env.VITE_API_URL

export const useDataStore = defineStore('data', {
  state: () => ({
    projects: [],
  }),
  persist: true,
  actions: {
    async fetchProjects(language) {
      // let language = t('language')

      const { data } = await getProjects(language)
      this.projects = data
    },
    fetchProjectById(id) {
      return this.projects.find((p) => p.id === parseInt(id))
    },
  },

  getters: {},
})
