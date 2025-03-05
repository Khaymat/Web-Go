// API service for connecting to Go backend
// No static data fallbacks - will throw errors if connection fails

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

// Generic fetch function with error handling
async function fetchFromAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error)
    throw error // Re-throw to be handled by components
  }
}

// API functions that match your Go backend endpoints
export async function fetchProjects() {
  return fetchFromAPI("/api/projects")
}

export async function fetchProjectById(id: string) {
  return fetchFromAPI(`/api/projects/${id}`)
}

export async function fetchProfile() {
  return fetchFromAPI("/api/profile")
}

export async function fetchServices() {
  return fetchFromAPI("/api/services")
}

export async function submitContactForm(data: any) {
  return fetchFromAPI("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

