import axios from 'axios'

const API_ENDPOINT = 'https://fedskillstest.coalitiontechnologies.workers.dev'
const API_USERNAME = import.meta.env.VITE_API_USERNAME ?? 'coalition'
const API_PASSWORD = import.meta.env.VITE_API_PASSWORD ?? 'skills-test'
const TARGET_PATIENT_NAME = 'Jessica Taylor'

const apiClient = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    Authorization: `Basic ${btoa(`${API_USERNAME}:${API_PASSWORD}`)}`,
  },
})

export async function fetchAllPatients() {
  const response = await apiClient.get('/')
  return response.data
}

export function pickJessicaTaylor(patients) {
  const patient = patients.find((item) => item.name === TARGET_PATIENT_NAME)

  if (!patient) {
    throw new Error('Jessica Taylor was not found in API response')
  }

  return patient
}

export async function fetchJessicaTaylor() {
  const patients = await fetchAllPatients()
  return pickJessicaTaylor(patients)
}
