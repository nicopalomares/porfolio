import { getProjects } from '@/api/api'
import { defineStore } from 'pinia'
const apiUrl = import.meta.env.VITE_API_URL

export const useDataStore = defineStore('data', {
  state: () => ({
    projects: [],
    isLoading: false,
  }),
  persist: true,
  actions: {
    async fetchProjects(language) {
      this.startLoading()
      try {
        const res = await getProjects(language)
        if (res) {
          this.projects = res.data
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        this.stopLoading()
      }
    },
    fetchProjectById(id) {
      return this.projects.find((p) => p.id === parseInt(id))
    },
    startLoading() {
      this.isLoading = true
    },
    stopLoading() {
      this.isLoading = false
    },
    async sendEmail(email, message, name) {
      this.startLoading()
      try {
        await this.sendEmail(email, message, name)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        this.stopLoading()
      }
    },
    async sendEmail(email, message, name) {
      try {
        const response = await fetch(`${apiUrl}contact/send`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            email: email,
            message: message,
          }),
        })
        if (response.ok) {
          return await response.json()
        }
      } catch (error) {
        console.error('Error al enviar el correo:', error)
      }
    },
  },
  getters: {},
})
