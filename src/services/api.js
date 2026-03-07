import axios from "axios";

const API_ENDPOINT = "https://fedskillstest.coalitiontechnologies.workers.dev";
const API_USERNAME = import.meta.env.VITE_API_USERNAME ?? "coalition";
const API_PASSWORD = import.meta.env.VITE_API_PASSWORD ?? "skills-test";

const apiClient = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    Authorization: `Basic ${btoa(`${API_USERNAME}:${API_PASSWORD}`)}`,
  },
});

export async function fetchAllPatients() {
  const response = await apiClient.get("/");
  console.log("Patients data:", response.data);
  return response.data;
}

export const getLatestDiagnosis = (patient) => {
  if (!patient?.diagnosis_history?.length) return null;
  return patient.diagnosis_history[3]; // latest record is first
};

export const getBloodPressure = (patient) => {
  const latest = getLatestDiagnosis(patient);
  if (!latest) return null;

  return {
    systolic: latest.blood_pressure.systolic.value,
    diastolic: latest.blood_pressure.diastolic.value,
    systolicLevel: latest.blood_pressure.systolic.levels,
    diastolicLevel: latest.blood_pressure.diastolic.levels,
  };
};

export const getVitals = (patient) => {
  const latest = getLatestDiagnosis(patient);
  if (!latest) return null;

  return {
    heartRate: latest.heart_rate.value,
    heartRateLevel: latest.heart_rate.levels,
    respiratoryRate: latest.respiratory_rate.value,
    respiratoryRateLevel: latest.respiratory_rate.levels,
    temperature: latest.temperature.value,
    temperatureLevel: latest.temperature.levels,
  };
};

export const getPatientInfo = (patient) => {
  return {
    name: patient.name,
    age: patient.age,
    gender: patient.gender,
    dateOfBirth: patient.date_of_birth,
    phone: patient.phone_number,
    emergencyContact: patient.emergency_contact,
    insurance: patient.insurance_type,
    profilePicture: patient.profile_picture,
  };
};

export const getChartData = (patient) => {
  if (!patient?.diagnosis_history) return [];

  return patient.diagnosis_history.map((record) => ({
    month: `${record.month} ${record.year}`,
    systolic: record.blood_pressure.systolic.value,
    diastolic: record.blood_pressure.diastolic.value,
    heartRate: record.heart_rate.value,
    respiratoryRate: record.respiratory_rate.value,
    temperature: record.temperature.value,
  }));
};

export const getDiagnostics = (patient) => {
  return patient.diagnostic_list || [];
};

export const getLabResults = (patient) => {
  return patient.lab_results || [];
};
