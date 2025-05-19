const apiUrl = import.meta.env.VITE_API_URL

export const getProjects = async () => {
  try {
    const response = await fetch(`${apiUrl}projects`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
